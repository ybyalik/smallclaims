import { Globe, Package, Gavel, ShoppingBag, Store, Smartphone, Bike, Truck, Camera, Receipt, MessageSquare, Banknote, BadgeCheck, Image as ImageIcon } from "lucide-react";
import type { CategoryHubData } from "./types";

export const ONLINE_SELLER_HUB: CategoryHubData = {
  categorySlug: "online-seller",
  breadcrumbLabel: "Online Seller Disputes",
  urlPrefix: "sue-seller-",
  meta: {
    title: "How to Sue an Online Seller in Small Claims Court",
    description:
      "Plain-English guide to suing online sellers. Amazon, eBay, Etsy, Facebook Marketplace, Venmo/Cash App scams, gig services, and FedEx. What you can recover and how to file.",
    ogTitle: "How to Sue an Online Seller | CivilCase",
    ogDescription: "Buyer disputes you can take to small claims, what you can recover, and how to file.",
  },
  schemaArticle: {
    headline: "How to Sue an Online Seller in Small Claims Court",
    description:
      "Practical guide to recovering from Amazon, eBay, Etsy, Facebook Marketplace, P2P scams, gig services, and FedEx.",
  },

  hero: {
    h1: { pre: "How to ", em: "sue an online seller", post: " in small claims court." },
    lede: "Amazon, eBay, Etsy, Facebook Marketplace, Venmo/Cash App scams, gig services, FedEx. Each has its own recovery path. Most platform disputes get solved through their own buyer-protection programs — so try those first. For peer-to-peer payment scams and Marketplace fraud, small claims under your state's consumer-protection laws is usually the move.",
  },

  issuePhotos: ["1607082348824-0a96f2a4b9da", "1556742044-3c52d6e88c62", "1556761175-5973dc0f32e7", "1567521464027-f127ff144326", "1556909114-f6e7ad7d3136"],

  issuesIntro: {
    h2: { pre: "What kind of online-seller dispute are you ", em: "having", post: "?" },
    paragraph: "Each platform has different recovery paths. Pick yours for state-specific advice.",
  },

  somethingElseCard: { title: "Something else?", blurb: "Tell us about your situation in 90 seconds and get a strength read on your case." },

  issues: [
    { slug: "online-seller-general", title: "Online seller (general)", blurb: "Try the platform's buyer-protection program first (Amazon A-to-z, eBay Money Back Guarantee, Etsy case system). If that fails, sue under your state's consumer-protection law in small claims.", icon: <Globe size={24} strokeWidth={1.7} />, ready: true },
    { slug: "amazon-seller", title: "Amazon seller", blurb: "Amazon's A-to-z Guarantee covers you for up to $2,500 per claim and usually resolves within 30 days. Small claims is your backup if Amazon denies the claim.", icon: <Package size={24} strokeWidth={1.7} />, ready: true },
    { slug: "ebay-seller", title: "eBay seller", blurb: "eBay's Money Back Guarantee covers items that never arrived or weren't as described. Small claims is your backup if eBay denies the claim.", icon: <Gavel size={24} strokeWidth={1.7} />, ready: true },
    { slug: "etsy-seller", title: "Etsy seller", blurb: "Etsy's case system handles most disputes and tends to favor buyers. Custom orders get some flexibility, but the seller still can't misrepresent the item.", icon: <ShoppingBag size={24} strokeWidth={1.7} />, ready: true },
    { slug: "facebook-marketplace", title: "Facebook Marketplace seller", blurb: "Marketplace has no buyer protection. File a police report if it was outright theft. Small claims under your state's consumer-protection law is the path to your money back.", icon: <Store size={24} strokeWidth={1.7} />, ready: true },
    { slug: "venmo-cashapp-scam", title: "Venmo / Cash App scam", blurb: "Peer-to-peer payment apps won't reverse a payment you authorized — even if it turned out to be a scam. Federal law only protects you when your account was hacked. Small claims is your path for the rest.", icon: <Smartphone size={24} strokeWidth={1.7} />, ready: true },
    { slug: "doordash-uber", title: "DoorDash / Uber / Uber Eats", blurb: "Their terms of service force most disputes into private arbitration — but they almost always carve out small claims. If your dollar amount is within your state's cap, you can sue.", icon: <Bike size={24} strokeWidth={1.7} />, ready: true },
    { slug: "fedex-package", title: "FedEx package", blurb: "Federal law (the Carmack Amendment) governs interstate shipments. The default coverage is just $100 per package — you can pay more for 'declared value' coverage. Small claims is your path when FedEx denies a claim.", icon: <Truck size={24} strokeWidth={1.7} />, ready: true },
  ],

  belongs: {
    h2Em: "online-seller disputes",
    intro: "Online-seller cases have layered options. Platform programs (Amazon A-to-z, eBay MBG, Etsy cases) settle most disputes for free. Credit-card chargebacks cover almost everything else. Small claims is the right court when those fail and the loss is within your state’s cap, especially with state UDAP multipliers.",
    inItems: [
      { titleBold: "Refunds the platform refused.", rest: "When Amazon, eBay, or Etsy denied your case but the seller is clearly at fault. Bring the case decision with you." },
      { titleBold: "Facebook Marketplace and Craigslist fraud.", rest: "No platform protection. Your state's consumer-protection law steps in — many states let you ask for 2x or 3x damages." },
      { titleBold: "Peer-to-peer payment scams (Venmo, Zelle, Cash App).", rest: "These apps won't reverse a payment you authorized, even if you got scammed. Small claims is the way back." },
      { titleBold: "Gig-service damages.", rest: "DoorDash, Instacart, Uber Eats, ride-share. Their terms of service force most disputes into arbitration, but small claims is almost always carved out." },
      { titleBold: "Lost or damaged shipments.", rest: "FedEx, UPS, USPS. Federal law (Carmack Amendment) covers interstate shipments; state law for in-state." },
    ],
    outItems: [
      { titleBold: "Disputes still in platform review.", rest: "Wait for the case to close. Filing in small claims while a platform case is open often gets dismissed." },
      { titleBold: "Class-action-type claims.", rest: "Identical complaints by many buyers usually get rolled into class-action settlements." },
      { titleBold: "International seller disputes.", rest: "Service of process and judgment enforcement abroad usually make small claims impractical." },
      { titleBold: "Damages above the cap.", rest: "Big-ticket items (vehicles, electronics over the limit) need higher courts." },
    ],
  },

  damages: {
    intro: "The math judges use. A typical online-seller case stacks the price you paid, the cost of mitigation (return shipping, replacement at higher price), and any UDAP multiplier your state allows.",
    rows: [
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12v17l-3-2-3 2-3-2-3 2z" /><path d="M12 8v6M10 9.5c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-1c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5" /></svg>, tag: "Refund of purchase price", body: "What you paid for the item or service that did not arrive or was not as described.", amount: "$1,200", barWidthPct: 50, barLabel: "Base amount" },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v17M5 21h14" /><path d="M5 8h14" /><path d="M5 8l-2 5h4z M19 8l-2 5h4z" /><path d="M12 4l-7 4M12 4l7 4" /></svg>, tag: "Consumer-protection penalty", body: "Many state consumer-protection laws add 2x or 3x damages plus attorney fees when the seller engaged in fraud or deceptive practices.", amount: "+$1,200", barWidthPct: 50, barLabel: "Multiplier", accent: true },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></svg>, tag: "Mitigation costs", body: "Return shipping, replacement at higher price, lost time, restocking fee. Keep the receipts.", amount: "+$300", barWidthPct: 12, barLabel: "Typical recovery" },
      { iconSvg: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 5L5 19" /><circle cx="7.5" cy="7.5" r="2.5" /><circle cx="16.5" cy="16.5" r="2.5" /></svg>, tag: "Filing fee + interest", body: "Filing fee, service-of-process cost, pre-judgment interest at the state legal rate.", amount: "+$200", barWidthPct: 5, barLabel: "Accruing" },
    ],
    totalNote: "with UDAP multiplier",
    totalAmount: "$2,900",
    totalCaption: "Sample math on a $1,200 misrepresented Amazon order in a 2x-multiplier state. Your numbers will differ.",
  },

  evidence: {
    h2Em: "sue an online seller",
    intro: "Online-seller cases live in screenshots. The listing, the order confirmation, the messages with the seller, and the platform case decision are the spine of the case. Pull everything before the listing or message thread disappears.",
    items: [
      { iconSvg: <Camera size={16} strokeWidth={1.8} />, title: "Original listing screenshot", desc: "What was promised. Listings change or disappear after disputes; capture it the moment something feels off." },
      { iconSvg: <Receipt size={16} strokeWidth={1.8} />, title: "Order confirmation and receipt", desc: "Confirmation email, invoice, or platform receipt with order number, date, and amount." },
      { iconSvg: <MessageSquare size={16} strokeWidth={1.8} />, title: "Messages with the seller", desc: "Platform messages, emails, texts. Especially anything where the seller acknowledges the problem or refuses to fix it." },
      { iconSvg: <Banknote size={16} strokeWidth={1.8} />, title: "Payment record", desc: "Bank statement, credit-card line item, or payment-app screenshot showing the dollar amount and date." },
      { iconSvg: <BadgeCheck size={16} strokeWidth={1.8} />, title: "Platform case decision", desc: "Amazon A-to-z, eBay MBG, Etsy case outcome. If they ruled against you, print the decision; it shows you exhausted the platform." },
      { iconSvg: <ImageIcon size={16} strokeWidth={1.8} />, title: "Photos of what arrived", desc: "Side-by-side with the listing photos. Damage, wrong item, counterfeit, or empty box. Include packaging if relevant." },
    ],
  },

  stateRulesIntro: "UDAP multipliers (2x or 3x in many states), pre-judgment interest, and consumer-protection statutes vary by state. Pick yours for the exact rules.",

  featuredStateSlugs: ["california", "texas", "florida", "new-york", "illinois", "pennsylvania", "ohio", "georgia", "michigan", "north-carolina", "minnesota", "delaware"],

  testimonial: {
    quote: "Amazon seller shipped a counterfeit. A-to-z denied it. Court ordered the $1,400 refund.",
    name: "Tom K.",
    role: "Buyer · Ohio",
  },

  audienceLabel: "buyers",

  faqs: [
    { q: "Can I sue an online seller in small claims court?", a: "Yes. Most platforms have their own buyer-protection programs (Amazon's A-to-z, eBay's Money Back Guarantee, Etsy's case system). Try those first — they're free and resolve in 30-60 days. If the platform denies your case, state consumer-protection laws apply (many states let you ask for 2x or 3x damages). Small claims is right when the dollar amount is within your state's cap." },
    { q: "What's the difference between Amazon and Facebook Marketplace?", a: "Amazon, eBay, and Etsy have buyer-protection programs that resolve disputes within their platform. Facebook Marketplace has no platform protection — you're on your own. For Marketplace, your two paths are: dispute the charge with your credit-card company, or file a small-claims case under your state's consumer-protection law." },
    { q: "Can I sue Venmo or Cash App scams?", a: "Yes, but the peer-to-peer apps themselves won't reverse a payment you authorized. Federal law (Regulation E) only protects you when someone hacked your account. For authorized payments that turned out to be scams, your path is small claims under your state's consumer-protection law. For clear theft, also file a police report." },
    { q: "Can I sue DoorDash or Uber?", a: "Yes, in small claims. Their terms of service force most disputes into private arbitration, but small claims is almost always carved out as an option. Read the relevant section of their terms before filing." },
    { q: "How do I sue FedEx?", a: "Federal law (the Carmack Amendment) governs interstate shipments. The default coverage is only $100 per package — pay for 'declared value' coverage if you ship something more expensive. File a claim with FedEx directly first; small claims is your backup if they deny it." },
  ],

  schemaFaqIndices: [0, 1, 2],

  disclaimerNote: "Platform protection programs and state UDAP statutes vary widely. Verify deadlines and citations against your state’s official source before filing.",
};
