import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FaqItem[];
  /** Section heading. Wrap the emphasized word in <em></em> if you want
   *  it rendered in the italic accent style. */
  title?: React.ReactNode;
  /** Lede / sub copy under the heading. */
  sub?: React.ReactNode;
  /** Eyebrow tag above the title (defaults to "FAQ"). */
  eyebrow?: string;
  /** Heading for the left illustration card. */
  sideTitle?: React.ReactNode;
  /** Body for the left illustration card. */
  sideBody?: React.ReactNode;
  /** CTA label on the side card (defaults to "View Our Resources"). */
  sideCtaLabel?: string;
  /** CTA href (defaults to /blog). */
  sideCtaHref?: string;
  /** Override the illustration shown in the side card. Defaults to
   *  the cream cartoon at /assets/faq-illustration.webp. */
  sideImg?: string;
}

/**
 * Two-column FAQ block used across the site:
 *
 *   - Centered eyebrow / title / sub at the top
 *   - Left: cream illustration card with secondary CTA
 *   - Right: accordion stack (first item open by default)
 *
 * The illustration is the shared /assets/faq-illustration.webp so every
 * FAQ on the site reads as the same product family.
 */
export default function FaqSection({
  faqs,
  title = (
    <>
      Frequently asked <em>questions</em>.
    </>
  ),
  sub,
  eyebrow = "FAQ",
  sideTitle = (
    <>
      We make it simple,
      <br />
      <em>so you can focus on what matters.</em>
    </>
  ),
  sideBody = "From creating your demand letter to guiding you through court if needed, CivilCase is here for you every step of the way.",
  sideCtaLabel = "View Our Resources",
  sideCtaHref = "/blog",
  sideImg = "/assets/faq-illustration.webp",
}: Props) {
  if (!faqs.length) return null;

  return (
    <section className="dl-section-cream dl-faqv2">
      <div className="wrap">
        <header className="dl-faqv2-head">
          <span className="dl-faqv2-eyebrow">{eyebrow}</span>
          <h2 className="dl-faqv2-title">{title}</h2>
          {sub ? <p className="dl-faqv2-sub">{sub}</p> : null}
        </header>

        <div className="dl-faqv2-grid">
          <aside className="dl-faqv2-side">
            <Image
              src={sideImg}
              alt=""
              width={320}
              height={240}
              className="dl-faqv2-img"
              aria-hidden
            />
            <h3 className="dl-faqv2-side-title">{sideTitle}</h3>
            <p className="dl-faqv2-side-body">{sideBody}</p>
            <Link href={sideCtaHref} className="dl-faqv2-side-cta">
              <BookOpen size={16} strokeWidth={1.8} aria-hidden />
              {sideCtaLabel}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden />
            </Link>
          </aside>

          <div className="dl-faqv2-list">
            {faqs.map((f, i) => (
              <details key={i} className="dl-faqv2-item" open={i === 0}>
                <summary>
                  <span>{f.q}</span>
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="dl-faqv2-chev"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
