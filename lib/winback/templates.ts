// Winback email sequence: types, code-default templates, and merge-field
// rendering.
//
// The admin edits these at /admin/winback (TipTap WYSIWYG). Saved copies live
// in the winback_templates table; the defaults below are what the admin UI
// shows before a step has ever been saved. A step only SENDS when a DB row
// exists AND enabled = true — so nothing goes out until the owner explicitly
// enables it.
//
// Merge fields available in subject + body:
//   {{first_name}}       plaintiff's first name, or "there"
//   {{defendant_name}}   who they're pursuing, or "the other party"
//   {{amount}}           formatted claim amount, e.g. $5,000.00
//   {{state_name}}       full state name, e.g. New York
//   {{resume_url}}       link back to their case
//   {{unsubscribe_url}}  one-click opt-out link (required in every body)

export interface WinbackTemplate {
  step: number;
  delay_days: number;
  subject: string;
  body_html: string;
  enabled: boolean;
}

export interface WinbackMergeData {
  first_name: string;
  defendant_name: string;
  amount: string;
  state_name: string;
  resume_url: string;
  unsubscribe_url: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Replace {{field}} tokens. HTML-escapes the data values (except URLs, which
// are attribute-safe already and must not be entity-mangled).
export function renderWinback(
  template: string,
  data: WinbackMergeData,
  opts: { escape: boolean },
): string {
  let out = template;
  for (const [key, raw] of Object.entries(data)) {
    const isUrl = key.endsWith("_url");
    const value = opts.escape && !isUrl ? escapeHtml(raw) : raw;
    out = out.split(`{{${key}}}`).join(value);
  }
  return out;
}

// Shared shell so every email in the sequence looks consistent. Body content
// is dropped into a 560px column with the CivilCase wordmark up top and the
// legally-required unsubscribe footer at the bottom.
function shell(inner: string): string {
  return `<div style="font-family: system-ui, -apple-system, sans-serif; max-width: 560px; margin: 0 auto; color: #0e0e0e; line-height: 1.55; font-size: 15px;">
<p style="font-weight: 700; letter-spacing: 0.16em; font-size: 13px; color: #b8331f;">CIVILCASE</p>
${inner}
<p style="margin-top: 28px;">— The CivilCase team</p>
<hr style="border: none; border-top: 1px solid #e2e0d8; margin: 28px 0 12px;" />
<p style="font-size: 12px; color: #777;">CivilCase is a self-help legal-information website and document automation tool. It is not a law firm and does not provide legal advice.<br />
You're receiving this because you started a case at civilcase.com. <a href="{{unsubscribe_url}}" style="color: #777;">Unsubscribe from these reminders</a>.</p>
</div>`;
}

const CTA = (label: string) =>
  `<p style="margin: 24px 0;"><a href="{{resume_url}}" style="background: #0e0e0e; color: #ffffff; text-decoration: none; padding: 13px 22px; border-radius: 8px; font-size: 14px; display: inline-block;">${label}</a></p>`;

export const DEFAULT_WINBACK_TEMPLATES: WinbackTemplate[] = [
  {
    step: 1,
    delay_days: 1,
    enabled: false,
    subject: "Your demand letter to {{defendant_name}} is waiting",
    body_html: shell(`<p>Hi {{first_name}},</p>
<p>You started a case against <strong>{{defendant_name}}</strong> for <strong>{{amount}}</strong> — and then life happened. No problem: everything you entered is saved exactly where you left it.</p>
<p>The hard part (telling your story) is mostly done. Finishing takes just a few minutes, and nothing is sent to anyone until you approve it.</p>
${CTA("Pick up where I left off")}
<p>If you hit a snag or something was confusing, just reply to this email. A real person reads these.</p>`),
  },
  {
    step: 2,
    delay_days: 3,
    enabled: false,
    subject: "What happens when {{defendant_name}} gets a demand letter",
    body_html: shell(`<p>Hi {{first_name}},</p>
<p>A quick reality check that surprises most people: <strong>the majority of small disputes get resolved before anyone sees a courtroom.</strong> A firm, professional demand letter, delivered by certified mail with a real deadline, changes the conversation. It shows you're serious and creates a paper trail.</p>
<p>Hiring a lawyer to write that letter typically costs hundreds of dollars. CivilCase drafts it from the facts you already entered, cites your state's rules where they help, and mails it certified for a fraction of that.</p>
<p>Your case against <strong>{{defendant_name}}</strong> ({{amount}}) is still saved and ready.</p>
${CTA("Finish my letter")}`),
  },
  {
    step: 3,
    delay_days: 7,
    enabled: false,
    subject: "Deadlines matter in {{state_name}} claims",
    body_html: shell(`<p>Hi {{first_name}},</p>
<p>One thing worth knowing: claims like yours are subject to time limits. Every state, including {{state_name}}, sets deadlines for bringing a claim, and evidence gets harder to gather the longer things sit. Memories fade, messages get deleted, people move.</p>
<p>Waiting rarely makes a dispute easier to resolve. Acting while everything is fresh usually does.</p>
<p>Your case against <strong>{{defendant_name}}</strong> for <strong>{{amount}}</strong> is still saved.</p>
${CTA("Resume my case")}`),
  },
  {
    step: 4,
    delay_days: 14,
    enabled: false,
    subject: "Should we close your case against {{defendant_name}}?",
    body_html: shell(`<p>Hi {{first_name}},</p>
<p>This is the last reminder we'll send about your unfinished case against <strong>{{defendant_name}}</strong> ({{amount}}).</p>
<p>If you've resolved things another way, congratulations, and you can ignore this. If you still want your money and something stopped you (price, a confusing step, second thoughts), <strong>hit reply and tell us</strong>. We read every response and we'll help if we can.</p>
${CTA("Finish my case")}
<p>Either way, we're rooting for you.</p>`),
  },
];

export function defaultTemplate(step: number): WinbackTemplate | undefined {
  return DEFAULT_WINBACK_TEMPLATES.find((t) => t.step === step);
}
