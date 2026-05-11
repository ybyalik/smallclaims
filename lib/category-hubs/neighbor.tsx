import { Home, TreeDeciduous, TreePine, Volume2, AlertOctagon, Droplets, Fence, ParkingSquare, Construction, Wind, Camera, FileText, MessageSquare, Shield, FileSearch, MapPin, Users } from "lucide-react";
import type { CategoryHubData } from "./types";

export const NEIGHBOR_HUB: CategoryHubData = {
  categorySlug: "neighbor",
  breadcrumbLabel: "Neighbor Disputes",
  urlPrefix: "sue-neighbor-",
  meta: {
    title: "How to Sue Your Neighbor in Small Claims Court",
    description:
      "Plain-English guide to suing your neighbor. Property damage, fallen trees, noise, harassment, water runoff, fences, and 4 more disputes. What you can recover and how to file in your state.",
    ogTitle: "How to Sue Your Neighbor in Small Claims Court | CivilCase",
    ogDescription: "Neighbor disputes you can take to small claims, what you can recover, and how to file.",
  },
  schemaArticle: {
    headline: "How to Sue Your Neighbor in Small Claims Court",
    description:
      "Practical guide to suing a neighbor for property damage, noise, harassment, water runoff, fence disputes, and other neighbor-versus-neighbor disputes.",
  },

  hero: {
    h1: { pre: "How to ", em: "sue your neighbor", post: " in small claims court." },
    lede: "If your neighbor damaged your property, made constant noise, harassed you, regraded their land to flood your yard, blocked your driveway, or damaged a shared fence, small claims is often the right court. Most cases also pay through the neighbor’s homeowners insurance, which is faster than court. Document the pattern, send a demand letter, and file the small-claims case if needed.",
  },

  issuePhotos: ["1568605114967-8130f3a36994", "1560518883-ce09059eeffa", "1502672260266-1c1ef2d93688", "1493809842364-78817add7ffb", "1556909114-f6e7ad7d3136"],

  issuesIntro: {
    h2: { pre: "What can you sue your neighbor ", em: "for", post: "?" },
    paragraph: "Pick the one that fits your situation. Each guide covers what you can recover, what evidence to bring, and how to file in your state.",
  },

  somethingElseCard: { title: "Something else?", blurb: "Tell us about your situation in 90 seconds and get a strength read on your case." },

  issues: [
    { slug: "property-damage", title: "Property damage", blurb: "Negligence + trespass. Their homeowners insurance covers most cases. Small claims for when insurance fails.", icon: <Home size={24} strokeWidth={1.7} />, ready: true },
    { slug: "dead-tree-fell", title: "Dead tree fell on house", blurb: "Known-dangerous-condition rule. If they knew the tree was dead, they’re liable. Arborist’s report is decisive.", icon: <TreeDeciduous size={24} strokeWidth={1.7} />, ready: true },
    { slug: "tree-encroachment", title: "Tree damage and encroachment", blurb: "Branches and roots damaging your property. Self-help trimming up to property line; recovery for actual damage.", icon: <TreePine size={24} strokeWidth={1.7} />, ready: true },
    { slug: "noise", title: "Noise nuisance", blurb: "Late-night music, parties, dog barking. Decibel logs + city ordinances + police calls + soundproofing recovery.", icon: <Volume2 size={24} strokeWidth={1.7} />, ready: true },
    { slug: "harassment", title: "Harassment", blurb: "Threats, stalking, repeated trespass. Civil restraining order plus damages. Documented pattern is the case.", icon: <AlertOctagon size={24} strokeWidth={1.7} />, ready: true },
    { slug: "water-runoff", title: "Water runoff flooding", blurb: "State drainage rules. Engineer’s report on water source. Drainage repair + mold remediation recovery.", icon: <Droplets size={24} strokeWidth={1.7} />, ready: true },
    { slug: "fence-dispute", title: "Fence dispute", blurb: "State partition fence statutes (CA § 841). Equal cost-sharing for routine maintenance. Damage from negligence is full recovery.", icon: <Fence size={24} strokeWidth={1.7} />, ready: true },
    { slug: "blocking-driveway", title: "Blocking driveway", blurb: "Trespass + interference with easement. Tow first; sue second. Lost wages and towing costs are recoverable.", icon: <ParkingSquare size={24} strokeWidth={1.7} />, ready: true },
    { slug: "construction-damage", title: "Construction damage", blurb: "Contractor’s GL insurance is the primary recovery. Both contractor and neighbor liable. Strict liability for ultrahazardous activity.", icon: <Construction size={24} strokeWidth={1.7} />, ready: true },
    { slug: "smoke-and-odors", title: "Smoke and odors", blurb: "Cigar smoke, marijuana, BBQ, chemical odors. Private nuisance + city ordinances. Mitigation costs and medical bills.", icon: <Wind size={24} strokeWidth={1.7} />, ready: true },
  ],

  belongs: {
    h2Em: "neighbor disputes",
    intro: "Small claims is built for the everyday property and quality-of-life disputes neighbors run into. Most state caps fall between $5,000 and $20,000. Hearings take 10 to 15 minutes. Many cases also pay through the neighbor’s homeowners insurance before they ever see a courtroom.",
    inItems: [
      { titleBold: "Property damage from negligence.", rest: "Their tree fell, their pipe burst, their kid threw a rock. Standard homeowners liability." },
      { titleBold: "Repair of a shared fence.", rest: "Most states require equal cost-sharing for the boundary fence under partition-fence statutes." },
      { titleBold: "Water runoff and drainage damage.", rest: "Regraded land that floods your yard. Mitigation cost plus repairs." },
      { titleBold: "Noise nuisance with documented pattern.", rest: "Decibel logs, police-call records, city-ordinance citations all support recovery for soundproofing." },
      { titleBold: "Towed-car and lost-wages damages.", rest: "Driveway blocked or shared lot misused. Tow cost plus the time you missed at work." },
    ],
    outItems: [
      { titleBold: "Boundary-line corrections.", rest: "Quiet-title actions go to the regular civil court, not small claims." },
      { titleBold: "Easement enforcement.", rest: "Equitable relief (injunctions) is outside small-claims authority in most states." },
      { titleBold: "Personal injury claims.", rest: "Medical-bill cases against a neighbor usually need a personal-injury attorney and a higher court." },
      { titleBold: "HOA bylaw disputes.", rest: "Internal HOA processes and arbitration come first. Some states require it before any lawsuit." },
    ],
  },

  damages: {
    intro: "The math judges use. A typical neighbor case stacks repair cost, the cost of mitigating the harm (soundproofing, drainage), and any lost wages or medical from health impacts.",
    rows: [
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12v17l-3-2-3 2-3-2-3 2z" /><path d="M12 8v6M10 9.5c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-1c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5" /></svg>, tag: "Direct damages", body: "Repair cost, replaced belongings, mitigation (soundproofing, drainage).", amount: "$3,200", barWidthPct: 55, barLabel: "Base amount" },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v17M5 21h14" /><path d="M5 8h14" /><path d="M5 8l-2 5h4z M19 8l-2 5h4z" /><path d="M12 4l-7 4M12 4l7 4" /></svg>, tag: "Consequential damages", body: "Lost wages, alternative housing, medical from health impacts.", amount: "+$1,400", barWidthPct: 30, barLabel: "Multiplier", accent: true },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></svg>, tag: "Filing fee + interest", body: "Filing fee, service-of-process cost, pre-judgment interest at the state legal rate.", amount: "+$200", barWidthPct: 5, barLabel: "Typical recovery" },
    ],
    totalNote: "typical small-claims recovery",
    totalAmount: "$4,800",
    totalCaption: "Sample math on a fence damage case. Your numbers will differ.",
  },

  evidence: {
    h2Em: "sue your neighbor",
    intro: "Neighbor cases are won on a documented pattern: photos of the damage, a log of incidents, ordinance citations, and (when relevant) the homeowners insurance policy info. The judge wants to see effort to resolve before suit.",
    items: [
      { iconSvg: <Camera size={16} strokeWidth={1.8} />, title: "Photos and video", desc: "Date-stamped photos and video of the damage, the noise source, the encroachment, or the water flow. The more the better." },
      { iconSvg: <FileText size={16} strokeWidth={1.8} />, title: "Incident log", desc: "Running list of dates, times, and what happened. Contemporaneous notes are far stronger than after-the-fact recall." },
      { iconSvg: <MessageSquare size={16} strokeWidth={1.8} />, title: "Communications", desc: "Texts, emails, certified-mail demand letter, voicemails. Show you tried to resolve it before filing." },
      { iconSvg: <Shield size={16} strokeWidth={1.8} />, title: "Police or city reports", desc: "Non-emergency police reports for harassment or noise. City code-enforcement citations. Establishes a third-party record." },
      { iconSvg: <FileSearch size={16} strokeWidth={1.8} />, title: "Repair estimates and receipts", desc: "Two written estimates from independent contractors plus any receipts you already paid. Sets the dollar amount." },
      { iconSvg: <MapPin size={16} strokeWidth={1.8} />, title: "Property records and survey", desc: "Plot map or survey for boundary, easement, and fence cases. County recorder’s office has it for a small fee." },
      { iconSvg: <Users size={16} strokeWidth={1.8} />, title: "Witness contact info", desc: "Other neighbors, mail carriers, or service workers who saw or heard what happened. A short signed statement helps." },
    ],
  },

  stateRulesIntro: "Tree law, drainage rules, partition fence statutes, and noise ordinances vary widely. California has the strongest spite-fence statute. Massachusetts has strict tree-encroachment rules. Pick yours for the exact statutes.",

  featuredStateSlugs: ["california", "texas", "florida", "new-york", "illinois", "pennsylvania", "ohio", "georgia", "michigan", "north-carolina", "minnesota", "delaware"],

  testimonial: {
    quote: "Won $2,800 for fence repairs after his tree came down. Their homeowners insurance paid out.",
    name: "Renee P.",
    role: "Homeowner · New York",
  },

  audienceLabel: "homeowners",

  faqs: [
    { q: "Can you sue your neighbor in small claims court?", a: "Yes, when the dispute involves money damages within your state’s cap (usually $5,000 to $20,000). Common cases: property damage from negligence, fallen trees, noise nuisance, harassment, water runoff, fence cost-sharing, and blocking driveways. Most cases also pay through the neighbor’s homeowners insurance, which is faster than court." },
    { q: "Should I file with the homeowners insurance carrier first?", a: "Yes, almost always. Every standard homeowners policy covers liability for damage the homeowner causes to others’ property. File a third-party claim with the carrier using policy info from your HOA or real-estate records. Most carriers settle within 30 to 60 days." },
    { q: "Can I get a restraining order against my neighbor?", a: "Yes. Civil harassment restraining orders (CHROs) are available in every state. Most states grant temporary orders within days; full hearings within 21 days. Often free or low-cost. Use alongside the small-claims action: restraining order for ongoing protection, small-claims for damages." },
    { q: "What if my neighbor doesn’t have insurance?", a: "Recovery is limited to the neighbor’s personal assets. Most homeowners do have insurance because mortgages require it. If they don’t, file directly in small claims and pursue judgment liens against their property. Liens against neighbors with mortgages often lead to fast settlement." },
    { q: "How long do I have to sue?", a: "Property damage and negligence claims usually run 2 to 4 years. Nuisance claims (noise, smoke, harassment) often have shorter windows (1 to 3 years). Continuing-tort cases (ongoing flooding, ongoing harassment) reset the clock with each new instance." },
  ],

  schemaFaqIndices: [0, 1, 2],

  disclaimerNote: "Tree law, drainage rules, partition fence statutes, and noise ordinances vary widely by state. Verify deadlines and statute citations against your state’s official source before filing.",
};
