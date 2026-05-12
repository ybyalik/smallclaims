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

let inflight: Promise<typeof google.maps> | null = null;

export class GoogleMapsNotConfigured extends Error {
  constructor() {
    super("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY not set");
    this.name = "GoogleMapsNotConfigured";
  }
}

export function loadGoogleMaps(): Promise<typeof google.maps> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("loadGoogleMaps called on the server"));
  }
  // Already loaded (script tag landed in a previous mount).
  if (window.google?.maps?.places) return Promise.resolve(window.google.maps);
  if (inflight) return inflight;

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key) return Promise.reject(new GoogleMapsNotConfigured());

  inflight = new Promise<typeof google.maps>((resolve, reject) => {
    // If a script tag is already in the DOM (e.g., from a prior mount that
    // didn't finish loading), reuse it instead of injecting a new one.
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-civilcase-gmaps]',
    );
    const script =
      existing ??
      Object.assign(document.createElement("script"), {
        src: `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=places&loading=async&v=weekly`,
        async: true,
        defer: true,
      });
    if (!existing) {
      script.setAttribute("data-civilcase-gmaps", "");
      document.head.appendChild(script);
    }
    script.addEventListener("load", () => {
      if (window.google?.maps?.places) resolve(window.google.maps);
      else reject(new Error("Google Maps loaded but places library missing"));
    });
    script.addEventListener("error", () => {
      inflight = null; // allow retry on next call
      reject(new Error("Failed to load Google Maps script"));
    });
  });
  return inflight;
}
