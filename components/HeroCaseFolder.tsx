// Hero right-side case file folder with a manila tab + peeking papers.

interface Props {
  caseNumber: string;
  plaintiff: string;
  defendant: string;
  causeLabel: string;
  causeValue: string;
  demand: string;
  filed: string;
  hearing: string;
}

export default function HeroCaseFolder({
  caseNumber,
  plaintiff,
  defendant,
  causeLabel,
  causeValue,
  demand,
  filed,
  hearing,
}: Props) {
  return (
    <div className="hero-folder">
      <div className="hero-folder-tab">CASE No. {caseNumber}</div>
      <div className="hero-folder-body">
        <div className="hero-folder-peek1" aria-hidden />
        <div className="hero-folder-peek2" aria-hidden />
        <div className="hero-folder-card">
          <div className="hero-folder-head">
            <div>
              <div className="hero-folder-eyebrow">Plaintiff</div>
              <div className="hero-folder-name">{plaintiff}</div>
            </div>
            <div className="hero-folder-filed">Filed {filed}</div>
          </div>
          <div className="hero-folder-vs">v. {defendant}</div>
          <div className="hero-folder-rows">
            <div className="hero-folder-row">
              <span>{causeLabel}</span>
              <strong>{causeValue}</strong>
            </div>
            <div className="hero-folder-row">
              <span>Demand</span>
              <strong className="hero-folder-amount">{demand}</strong>
            </div>
            <div className="hero-folder-row">
              <span>Hearing</span>
              <strong>{hearing}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
