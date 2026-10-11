# Page brief: appointments and commission (/appointments, /commission)

Purpose: section briefs for the two pages that turn interest into a conversation. Appointments ≤40 visible words.
Last updated: 2026-10-11
Sources: REMAKE-BLUEPRINT §4 (Resend), §6; research/01 (appointments convention); research/08 (appointments ≤40 words); research/04 (consent, deposit terms); storefront/app/routes/appointments.tsx and commission.tsx; storefront policies draft.

```
SECTION: Appointments, form
JOB: Two clicks to a human
ONE SUBJECT: the form    NEXT ACTION: "Request the appointment" TODO label
SKETCH: TODO
LAYOUT: centered quiet opener (allowed here), then one form: store (Brentwood, Mt. Juliet, video), purpose (bridal, private viewing, commission, fitting, care and repair), date and time (same-day allowed), contact
CONTENT: "Come and see it in your hand." + "An hour with a member of the house, in the salon, at the bench, or by video. Whatever you asked about is already on the table." (built; trim to ≤40 words; "salon" C36). Carries the piece or design code the visitor came from. Phones for same-day
TYPE: .h-display; .lede; .label for field labels
SPACING: TODO
CONTROLS: .opt 52px for store and purpose, .field 48px, .btn 48px; unchecked consent boxes for email and SMS
MOTION: none
STATES: sending; sent ("A person from the house will confirm by [channel]" TODO); error inline; unconfigured = honest "not connected yet" (today the form sends nowhere)
TAKE: TODO    LEAVE: off-site booking widgets; chat bubble
DON'T: pre-checked consent; invented confirmation times
DONE WHEN: a test booking reaches a named person (Resend + Cal.com or Sesami, family picks)
```

```
SECTION: Commission, process
JOB: Explain how something new is made, with time and money stated
ONE SUBJECT: the five steps    NEXT ACTION: "Book a conversation" TODO label
SKETCH: TODO
LAYOUT: centered opener, one wide photo, then steps as rows (name 12rem, text)
CONTENT: "Commission a piece" + "Something that exists nowhere yet, made here. About four to six weeks from the first conversation. A deposit of a third begins the drawings, refundable until you approve the render." Steps: Conversation, Drawing, Model, Casting and setting, Delivery (built). TODO: deposit terms pending counsel (Tennessee forfeiture); "made here" must stay within the provenance line
TYPE: .h-display; step names Caslon Display 24px; Caslon Text
SPACING: TODO
CONTROLS: .btn
MOTION: .settle on the photo
STATES: n/a
TAKE: TODO    LEAVE: "Dream it, Design it, Make it" (research/01 "bespoke path")
DON'T: bespoke; promise a timeline without a basis
DONE WHEN: counsel approves deposit wording
```
