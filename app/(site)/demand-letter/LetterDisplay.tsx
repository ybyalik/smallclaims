import Image from "next/image";

/**
 * Demand-letter hero visual: cover page in front, demand letter fanned out
 * behind it like a hand of cards. Pure layout, no animation.
 */

function LetterPage({ variant }: { variant: "demand" | "cover" }) {
  return (
    <div className="ll-page">
      <header className="ll-page-head">
        <Image
          src="/civilcase-logo.webp"
          alt="CivilCase"
          width={160}
          height={32}
          className="ll-page-logo"
          priority={false}
        />
      </header>

      <div className="ll-page-from">
        32 N Gould St<br />
        Sheridan, WY 82801
      </div>

      <div className="ll-page-date">May 16, 2026</div>

      <div className="ll-page-to">
        Cypress Solutions LLC<br />
        357 Maple Avenue<br />
        Miami, CA 94612
      </div>

      {variant === "demand" ? (
        <>
          <p className="ll-page-re">
            <strong>
              Re: Demand for Return of Security Deposit &mdash; $4,050.00 Plus Interest
              and Costs
            </strong>
          </p>
          <p>Dear Cypress Solutions LLC:</p>
          <p>
            I am writing to demand the immediate return of my security deposit in the
            amount of <strong>$2,025.00</strong>, which you have wrongfully withheld
            following my move-out on March 26, 2026. Under California Civil Code
            &sect;1950.5, you were required to return my security deposit within 21
            days. That deadline passed on April 16, 2026.
          </p>
          <p>
            Because you have willfully and in bad faith retained my deposit, I am
            entitled to recover twice the amount wrongfully withheld. My demand is{" "}
            <strong>$4,050.00</strong> plus prejudgment interest.
          </p>
          <p>
            You have thirty (30) days to pay the full amount owed. If I do not receive
            payment by <strong>June 15, 2026</strong>, I will file a small claims action
            in the Superior Court of California.
          </p>
        </>
      ) : (
        <>
          <p className="ll-page-re">
            <strong>Re: Enclosed demand letter from Olivia Park</strong>
          </p>
          <p>Dear Cypress Solutions LLC:</p>
          <p>
            Enclosed is a formal demand letter from Olivia Park regarding the matter
            described in the attached letter. This demand is being sent and facilitated
            by CivilCase.com, a platform that helps individuals pursue resolution of
            small claims disputes.
          </p>
          <p>
            The plaintiff has taken the first steps toward filing a small claims action
            and intends to proceed if the matter is not resolved within the stated
            deadline.
          </p>
          <p>
            Please review the enclosed letter carefully and respond by the deadline
            stated within.
          </p>
          <p>Sincerely,</p>
          <p>CivilCase</p>
        </>
      )}
    </div>
  );
}

export default function LetterDisplay() {
  return (
    <div className="ll-fan">
      <div className="ll-fan-back">
        <LetterPage variant="demand" />
      </div>
      <div className="ll-fan-front">
        <LetterPage variant="cover" />
      </div>
    </div>
  );
}
