// Singleton loader for Google Maps JS API + Places library.
//
// Why a singleton: Google's script tag is global — multiple injections
// would warn and double-bill (the Places sessions API counts each load).
// Calling loadGoogleMaps() from any number of components returns the same
// in-flight promise; once resolved, subsequent calls return immediately.
//
// Requires NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in env. The key is restricted
// by HTTP referrer in the Google Cloud console so it can't be abused even
// though it ships to the browser.
//
// Hot-reload behavior: in dev, Fast Refresh re-evaluates this module on
// edits, which resets the `inflight` variable. We tag the loader state on
// the window object so it survives module re-evaluation; that way repeat
// loads after Fast Refresh resolve immediately from window.google instead
// of trying to inject a duplicate (and stale-listener) script tag.

const STATE_KEY = "__civilcaseGmaps";

interface WindowState {
  promise?: Promise<typeof google.maps>;
}

export class GoogleMapsNotConfigured extends Error {
  constructor() {
    super("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY not set");
    this.name = "GoogleMapsNotConfigured";
  }
}

function getState(): WindowState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (!w[STATE_KEY]) w[STATE_KEY] = {};
  return w[STATE_KEY] as WindowState;
}

export function loadGoogleMaps(): Promise<typeof google.maps> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("loadGoogleMaps called on the server"));
  }
  // Fast path: script already loaded successfully — return synchronously.
  if (window.google?.maps?.places) return Promise.resolve(window.google.maps);

  const state = getState();
  if (state.promise) return state.promise;

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key) return Promise.reject(new GoogleMapsNotConfigured());

  state.promise = new Promise<typeof google.maps>((resolve, reject) => {
    // Remove any stale script tag from a previous failed load so we don't
    // attach listeners to an already-failed element (whose load/error
    // events have already fired and will never fire again).
    const stale = document.querySelector<HTMLScriptElement>(
      'script[data-civilcase-gmaps]',
    );
    if (stale && !window.google?.maps?.places) stale.remove();

    const script = document.createElement("script");
    script.setAttribute("data-civilcase-gmaps", "");
    script.async = true;
    script.defer = true;
    // No loading=async here: that mode pairs with importLibrary() and the
    // load event fires BEFORE libraries finish. We use the legacy
    // libraries=places parameter and rely on the load event firing only
    // after window.google.maps.places is fully populated.
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=places&v=weekly`;

    script.addEventListener("load", () => {
      if (window.google?.maps?.places) resolve(window.google.maps);
      else {
        // Clear so a manual retry can re-attempt.
        getState().promise = undefined;
        reject(new Error("Google Maps loaded but places library missing"));
      }
    });
    script.addEventListener("error", () => {
      getState().promise = undefined;
      reject(new Error("Failed to load Google Maps script"));
    });

    document.head.appendChild(script);
  });
  return state.promise;
}
