# Website inquiry tracking

GA4 property: `workathomecc.com` (557556743), account 410847189.
Web stream: Work At Home Website (16052708474).
Measurement ID: `G-1BZFDFMX30` (public identifier, not a secret).

The tag runs only on `workathomecc.com` and `www.workathomecc.com`, after the
visitor allows optional analytics. Local and Vercel preview visits are excluded.
Preferences are stored under `wah-analytics-choice`; Cookie settings lets visitors
change them. Forms and contact links work regardless of analytics choice.

Events:

- `page_view`: one per initial visit or Next.js pathname change after consent.
- `generate_lead`: only after Formspree accepts a consultation POST.
- `contact_click`: WhatsApp/email intent, not a confirmed inquiry or conversation.

Inquiry parameters are restricted to `contact_method`, `inquiry_type: client`,
`page_path`, and `transport_type`. No form values are sent to Analytics. Contact
clicks on `/opportunities` are excluded from the client inquiry events. Automatic
form events are disabled in the stream to keep recruitment and confirmed leads
separate. Job application delivery remains independent through Web3Forms.

Required stream settings (configured October 6, 2026):

- Enhanced measurement enabled.
- Page views > Advanced settings > browser-history page changes **disabled**.
  The site sends its own route page views; enabling both duplicates counts.
- Form interactions **disabled**.

Page locations keep only known UTM parameters for marketing attribution. Other
query parameters and hashes are omitted. Advertising storage, user data, and
personalization consent remain denied; Google Signals is disabled in the tag.

Verification: production build, TypeScript, and
`node --test --test-isolation=none tests/inquiry-tracking.test.cjs`.
Submission tests stub the provider; they do not send test inquiries or prove email
delivery. Realtime verifies live visits after consent. Analytics represents
consenting visitors and is not a complete submission ledger.
