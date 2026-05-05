# Taqyro — UX Flow / Screen Specification

### 1. Purpose

This document describes the main UX flows and screens for **Taqyro** MVP.

Taqyro is a mobile app where users answer sharp questions, see how their circle narrows, and eventually move toward people, small groups, or offline actions.

The MVP UX must support the core loop:

```text
Open app
→ See question
→ Answer
→ See circle change
→ Continue
→ Circle found
→ Save result
→ Choose next step
```

The product should feel immediate, lightweight, and focused.

---

## 2. Core UX Principles

### 2.1 Start With a Question

The first screen must be a question.

Do not show first:

* registration;
* onboarding slideshow;
* profile setup;
* location permission;
* long explanation;
* settings.

The user should interact with the core mechanic within seconds.

---

### 2.2 One Main Action Per Screen

Each screen should have one obvious primary action.

Examples:

* answer the question;
* continue to next question;
* save result;
* choose next step.

Avoid clutter.

---

### 2.3 Immediate Feedback

After every answer, the app must show what changed.

The key feedback is:

```text
Your circle: N people
```

If the user answers `Not important`, the app must explain:

```text
This question did not affect your circle.
```

---

### 2.4 No Personality Labels

The app must not explain the user with personality types, archetypes, or ideological labels.

Correct:

```text
126 people match your important answers.
```

Incorrect:

```text
You are a freedom-oriented individualist.
```

---

### 2.5 Circle, Not Feed

After the circle is found, the app should not immediately become a profile feed.

The next step should be framed around:

* people nearby;
* small group;
* action;
* narrowing further.

---

## 3. App Navigation Structure

For MVP, the app can use a simple linear flow before showing any tab navigation.

### Pre-save Flow

```text
Question Screen
→ Answer Result State
→ Next Question
→ Circle Found Screen
→ Save Result Screen
→ Next Step Screen
```

### Post-save Flow

Later MVP versions can add tabs:

```text
Questions
Circle
People
Groups
Actions
Settings
```

For the first MVP, tabs are not required.

---

## 4. Main User Flow

```text
1. User opens app
2. Anonymous session starts
3. First question appears
4. User taps Yes / No / Not important
5. App saves answer
6. App recalculates circle
7. App shows result
8. User continues to next question
9. Repeat until circle is found, rare, or questions run out
10. App offers save
11. User saves or continues
12. App shows next step options
```

---

## 5. Screen List

MVP screens:

```text
01. Question Screen
02. Answer Result State
03. Circle Found Screen
04. Rare Path Screen
05. No Matches Screen
06. Save Result Screen
07. Next Step Screen
08. Continue Narrowing Screen
09. Basic Error / Offline State
```

Optional early screens:

```text
10. Invite / Share Screen
11. Approximate Location Permission Screen
12. People Preview Screen
```

Later screens:

```text
13. People Nearby Screen
14. Person Card Detail
15. Contact Request Screen
16. Small Group Formation Screen
17. Action List Screen
18. Create Action Screen
```

---

## 6. Screen 01 — Question Screen

### Purpose

Show one question and allow the user to answer quickly.

This is the main screen of the product.

---

### When It Appears

* On first app launch.
* After user taps “Next question”.
* After user continues narrowing.

---

### Layout

```text
[Top area]
Optional small logo or app name

[Main area]
Question text

[Answer buttons]
Yes
No
Not important

[Bottom area]
Circle count / state
Circle focus indicator
```

---

### Example

```text
Would you accept total surveillance
if it made society much safer?

[Yes]
[No]
[Not important]

Your circle: 12,480 people
Still broad
```

---

### Required Elements

#### Question Text

* Large and readable.
* Center or upper-middle of screen.
* Should fit on screen without scrolling for normal-length questions.

#### Answer Buttons

Fixed options:

```text
Yes
No
Not important
```

Button order should remain consistent across the app.

Recommended order:

```text
Yes
No
Not important
```

#### Circle Count

If available:

```text
Your circle: 12,480 people
```

If not yet available:

```text
Start with your first answer.
```

#### Circle State

Examples:

```text
Still broad
Getting closer
Circle found
Rare path
```

#### Circle Focus Indicator

Optional visual indicator.

Example:

```text
Broad ━━━━━●━━━━ Focused
```

or simple progress bar:

```text
Focus: 42%
```

The indicator should not imply personality or moral score.

---

### Primary Action

User selects one answer.

---

### State Before First Answer

Before the first answer, no circle has been narrowed yet.

Suggested copy:

```text
Make your first choice.
We will show how many people remain in your circle.
```

---

### Acceptance Criteria

* User can answer in one tap.
* No registration required.
* No profile required.
* No location required.
* Question is loaded quickly.
* Answer buttons are clearly visible.
* The app does not show any psychological interpretation.

---

## 7. Screen 02 — Answer Result State

### Purpose

Show the effect of the user’s answer.

This can be a separate screen or an animated state on the Question Screen.

Recommended MVP approach:

```text
Same screen changes into result state after answer.
```

This keeps the flow fast.

---

### When It Appears

Immediately after the user answers a question.

---

### Result After Yes / No

If the user answered `Yes` or `No`, the question becomes a filter.

#### Example

```text
Your circle: 3,420 people

Still broad.
One more question can make it more focused.

[Next question]
```

Alternative:

```text
This answer narrowed your circle.

Your circle: 3,420 people

[Next question]
```

---

### Result After Not Important

If the user answered `Not important`, the question does not filter the circle.

#### Required Copy Principle

Do not say:

```text
People who answered Not important...
```

Do not count only people who answered this question.

Correct message:

```text
This question did not affect your circle.

We will not filter people by this answer.

Your circle: 12,480 people

[Next question]
```

---

### Required Elements

* Updated circle count.
* Short explanation.
* Circle state.
* Primary CTA: `Next question`.
* Optional secondary CTA if circle is already useful: `See circle`.

---

### Primary CTA

```text
Next question
```

If circle is found:

```text
See circle
```

or:

```text
Continue narrowing
```

---

### Acceptance Criteria

* Feedback appears after each answer.
* `Not important` is explained correctly.
* Yes/No feedback mentions that circle narrowed only if count changed.
* Copy is neutral and non-judgmental.
* User can continue quickly.

---

## 8. Circle Count Display Rules

### If Circle Is Too Broad

```text
Your circle: 4,820 people
Still broad
```

Suggested supporting text:

```text
Answer more questions to make it more focused.
```

---

### If Circle Is Getting Closer

```text
Your circle: 420 people
Getting closer
```

Suggested supporting text:

```text
A few more answers can make this circle useful.
```

---

### If Circle Is Found

```text
Your circle: 126 people
Circle found
```

Suggested supporting text:

```text
These people match your important answers.
```

---

### If Circle Is Rare

```text
Your circle: 9 people
Rare path
```

Suggested supporting text:

```text
Only a few people in the current network match your important answers.
```

---

### If No Matches

```text
Your circle: 0 people
No matches yet
```

Suggested supporting text:

```text
No one in the current network matches this exact set of important answers yet.
```

---

## 9. Screen 03 — Circle Found Screen

### Purpose

Show that the user has reached a useful circle.

This is a major milestone screen.

---

### When It Appears

When `circleState = circle_found`.

Suggested threshold:

```text
50–150 people
```

Thresholds must be configurable.

---

### Layout

```text
[Header]
Your circle is found

[Main number]
126 people

[Explanation]
They match your important answers.

[Stats]
Important answers: 12
Ignored questions: 4

[Actions]
Save circle
Continue narrowing
```

---

### Example

```text
Your circle is found

126 people match your important answers.

You answered 16 questions.
12 of them shaped your circle.

[Save circle]
[Continue narrowing]
```

---

### Required Elements

* Circle count.
* Explanation of what the count means.
* Number of filtering answers.
* Save CTA.
* Continue narrowing option.

---

### Primary CTA

```text
Save circle
```

---

### Secondary CTA

```text
Continue narrowing
```

---

### Acceptance Criteria

* User understands why this is a milestone.
* The app does not say these people are “exactly like you”.
* The app does not expose identities yet.
* User can save or continue.

---

## 10. Screen 04 — Rare Path Screen

### Purpose

Show that the user’s current important answer combination is rare.

This should feel interesting, not negative.

---

### When It Appears

When `circleState = rare_path`.

Suggested threshold:

```text
1–49 people
```

---

### Example

```text
Your path is rare

9 people match your important answers
in the current network.

You can keep this circle,
continue answering,
or invite people to compare answers.

[Save this circle]
[Continue answering]
[Invite someone]
```

---

### Required Elements

* Circle count.
* Neutral explanation.
* Save option.
* Continue option.
* Optional invite option.

---

### Copy Rules

Avoid:

```text
You are alone.
Nobody is like you.
Your answers are too unusual.
```

Use:

```text
Your path is rare.
Only a few people match your important answers.
```

---

### Acceptance Criteria

* Rare path is not framed as failure.
* User has a next step.
* No fake matches are shown.
* User can continue the product.

---

## 11. Screen 05 — No Matches Screen

### Purpose

Handle the state where no users currently match the important answer path.

---

### When It Appears

When `circleCount = 0`.

---

### Example

```text
No matches yet

No one in the current network matches
this exact set of important answers yet.

This may change as more people join.

[Continue answering]
[Save this path]
[Invite someone]
```

---

### Required Elements

* Clear zero-match message.
* Honest wording.
* No shame.
* Next action.

---

### Acceptance Criteria

* App does not dead-end.
* App does not fake users.
* App explains “current network”.
* User can continue.

---

## 12. Screen 06 — Save Result Screen

### Purpose

Convert anonymous user into saved user after value has been created.

---

### When It Appears

Possible triggers:

* user taps `Save circle`;
* user reaches circle_found;
* user reaches rare_path and wants to keep it;
* user tries to access next step requiring persistence.

---

### Layout

```text
[Header]
Save your circle

[Explanation]
Your answers and circle are currently stored only in this session.

[Auth buttons]
Continue with Apple
Continue with Google
Continue with Email

[Secondary]
Not now
```

---

### Example

```text
Save your circle

Your answers shaped a circle of 126 people.
Save it so you do not lose your result.

[Continue with Apple]
[Continue with Google]
[Continue with Email]

[Not now]
```

---

### Required Elements

* Reason to save.
* Apple login.
* Google login.
* Email option.
* Optional “Not now”.

---

### Acceptance Criteria

* Save prompt appears only after user has experienced value.
* Anonymous answers are preserved after account linking.
* User is not forced to create profile.
* No photo/bio required.
* User can return to question flow if they decline.

---

## 13. Screen 07 — Next Step Screen

### Purpose

Show what the user can do after the circle is found or saved.

This screen connects the question loop to the long-term goal of the product.

---

### When It Appears

* After circle is saved.
* After user chooses to proceed from Circle Found screen.
* After rare path save.

---

### Layout

```text
[Header]
What do you want to do with your circle?

[Options]
See people nearby
Form a small group
Join an action
Create an action
Continue narrowing
Invite people
```

---

### MVP Version

Some features may be placeholders.

Recommended MVP options:

```text
Continue narrowing
Invite someone
See people from my circle
```

If people/groups/actions are not implemented yet, use:

```text
Coming soon
```

But avoid making the screen feel empty.

---

### Example

```text
What next?

Your circle: 126 people

[Continue narrowing]
[Invite someone]
[See people from my circle]
```

Later:

```text
[Find people nearby]
[Form a small group]
[Join an action]
[Create an action]
```

---

### Acceptance Criteria

* User sees that the circle is a beginning, not the end.
* User can continue answering.
* User can invite/share.
* If a feature is not implemented, the UI clearly indicates that.
* The app does not turn into an endless profile feed.

---

## 14. Screen 08 — Continue Narrowing Screen

### Purpose

Allow user to continue answering after circle is found.

---

### When It Appears

When user taps:

```text
Continue narrowing
```

---

### Example

```text
Narrow further?

Your circle is currently 126 people.

More important answers may make it smaller.
You can stop anytime.

[Next question]
[Back to circle]
```

---

### Acceptance Criteria

* User understands that additional Yes/No answers can reduce the circle further.
* User understands Not important will not affect the circle.
* User can go back to circle result.

---

## 15. Screen 09 — Basic Error / Offline State

### Purpose

Handle network or data errors without breaking the flow.

---

### Cases

* question failed to load;
* answer failed to save;
* circle count failed to update;
* auth failed;
* offline mode.

---

### Example: Circle Count Loading Error

```text
Your answer was saved.

We could not update your circle count yet.
We will try again automatically.

[Next question]
[Retry]
```

---

### Example: Question Load Error

```text
Could not load the next question.

[Retry]
```

---

### Acceptance Criteria

* User does not lose answer.
* App communicates what happened.
* App retries when possible.
* User can recover.

---

## 16. Optional Screen 10 — Invite / Share Screen

### Purpose

Allow user to invite others without exposing sensitive answers.

This is useful for cold start.

---

### When It Appears

* From Next Step screen.
* From Rare Path screen.
* From No Matches screen.

---

### Example

```text
Invite someone to compare answers

They will not see your answers unless you choose to share later.

[Share invite]
```

---

### Share Text Example

```text
I’m using Taqyro to find people who answer the same way on questions that matter.
Try it and see where your circle leads.
```

---

### Acceptance Criteria

* Shared text does not expose answers.
* Shared link opens app or store page.
* User can share through native share sheet.

---

## 17. Optional Screen 11 — Approximate Location Permission Screen

### Purpose

Ask for approximate location only when needed for people nearby.

Not required in the first core loop.

---

### When It Appears

Only after user chooses:

```text
See people nearby
```

---

### Example

```text
Find people from your circle nearby

We only use approximate location.
Your exact location is never shown.

[Use approximate location]
[Not now]
```

---

### Acceptance Criteria

* Location is not requested on first launch.
* User understands why location is needed.
* Exact location is not shown to others.
* User can decline.

---

## 18. Optional Screen 12 — People Preview Screen

### Purpose

Show a preview of people from the user’s circle without becoming a profile feed.

---

### When It Appears

After user saves result and chooses:

```text
See people from my circle
```

---

### Layout

```text
[Header]
People from your circle

[Summary]
126 people match your important answers
18 are nearby, if location enabled

[Cards]
Person #42
Matches your important answers: 12/12
Open to: small group
```

---

### Example Card

```text
Person #42

Matches your important answers: 12/12
Nearby: same city
Open to: small group

[Request contact]
```

---

### Acceptance Criteria

* Cards do not require photos.
* Cards focus on matching facts.
* Full answer histories are not exposed.
* Contact requires consent.
* If contact is not implemented, show as coming soon.

---

## 19. Later Screen — Contact Request

### Purpose

Allow intentional contact between two users.

---

### When It Appears

After user taps:

```text
Request contact
```

---

### Example

```text
Request contact

This person matches your important answers.

You can send a short request.
Contact opens only if they accept.

[Send request]
[Cancel]
```

---

### Acceptance Criteria

* No instant unsolicited chat.
* Contact requires acceptance.
* Optional message is limited.
* User can cancel.

---

## 20. Later Screen — Small Group Formation

### Purpose

Help user form a small group from people in the circle.

---

### Example

```text
Form a small group

We will look for 5–7 people from your circle
who are open to real-world interaction.

[Start forming group]
[Cancel]
```

---

### Acceptance Criteria

* Users opt in.
* No one is added automatically without consent.
* Group formation is based on circle membership.
* Exact identity exposure is delayed until appropriate.

---

## 21. Later Screen — Action List

### Purpose

Show offline actions connected to the user’s circle.

---

### Example

```text
Actions from your circle

Small group discussion
Saturday, 18:00
Same city
3/7 joined

[Request to join]
```

---

### Acceptance Criteria

* Exact location can be hidden until approval.
* Actions are not shown as a generic event feed.
* Actions are connected to circle/group logic.

---

## 22. Later Screen — Create Action

### Purpose

Allow user to create a simple offline action.

---

### Fields

```text
Title
Short description
Approximate location
Time
Capacity
```

---

### Example

```text
Create an action

Title:
First circle meeting

Description:
A 60-minute conversation for people from the same circle.

Location:
Approximate area only

Time:
Saturday, 18:00

Capacity:
7
```

---

### Acceptance Criteria

* Minimal form.
* No complex event management in early version.
* Organizer can approve participants later.
* Action can be visible only to relevant circle/group.

---

## 23. Component Specification

### 23.1 QuestionCard

#### Purpose

Displays question text.

#### Props

```ts
type QuestionCardProps = {
  questionText: string;
  questionNumber?: number;
};
```

---

### 23.2 AnswerButton

#### Purpose

Displays one answer option.

#### Props

```ts
type AnswerButtonProps = {
  label: "Yes" | "No" | "Not important";
  value: "yes" | "no" | "not_important";
  onPress: () => void;
  disabled?: boolean;
};
```

---

### 23.3 CircleCounter

#### Purpose

Displays current circle count.

#### Props

```ts
type CircleCounterProps = {
  count: number | null;
  state: CircleState;
};
```

#### Example Copy

```text
Your circle: 420 people
```

---

### 23.4 CircleStateLabel

#### Purpose

Displays circle state in human language.

#### States

```ts
type CircleState =
  | "unknown"
  | "too_broad"
  | "getting_closer"
  | "circle_found"
  | "rare_path"
  | "no_matches";
```

#### Copy

```ts
const CIRCLE_STATE_LABELS = {
  unknown: "Start with your first answer",
  too_broad: "Still broad",
  getting_closer: "Getting closer",
  circle_found: "Circle found",
  rare_path: "Rare path",
  no_matches: "No matches yet"
};
```

---

### 23.5 CircleFocusIndicator

#### Purpose

Visualizes how focused the circle is.

This is not a personality score.

#### Props

```ts
type CircleFocusIndicatorProps = {
  circleCount: number | null;
  state: CircleState;
};
```

---

### 23.6 ResultMessage

#### Purpose

Explains what happened after answer.

#### Inputs

```ts
type ResultMessageProps = {
  answer: "yes" | "no" | "not_important";
  circleCount: number | null;
  circleState: CircleState;
};
```

#### Logic

If answer is `yes` or `no`:

```text
Your circle: N people
```

If answer is `not_important`:

```text
This question did not affect your circle.
```

---

## 24. Copy Guidelines

### 24.1 Use

```text
circle
important answers
question did not affect your circle
people who match your important answers
current network
```

### 24.2 Avoid

```text
perfect match
soulmate
tribe
enemy
wrong people
personality type
ideology
compatibility score
```

---

## 25. Exact Copy Examples

### First Question Intro

```text
Make your first choice.
We will show how many people remain in your circle.
```

### Result After Yes/No

```text
Your circle: 3,420 people

Still broad.
One more question can make it more focused.
```

### Result After Not Important

```text
This question did not affect your circle.

We will not filter people by this answer.
```

### Circle Found

```text
Your circle is found.

126 people match your important answers.
```

### Rare Path

```text
Your path is rare.

Only 9 people in the current network match your important answers.
```

### Save Prompt

```text
Save your circle

Your answers shaped this result.
Save it so you do not lose it.
```

### Next Step

```text
What do you want to do with your circle?
```

---

## 26. UX Edge Cases

### 26.1 Circle Count Loading

If count is loading:

```text
Updating your circle...
```

Avoid blocking the user too long.

---

### 26.2 Circle Count Failed

```text
Your answer was saved.
We could not update your circle yet.
```

Actions:

```text
Retry
Next question
```

---

### 26.3 No More Questions

```text
No more questions for now.

Your current circle: 420 people.
More questions are coming soon.
```

Actions:

```text
Save circle
Invite someone
```

---

### 26.4 User Answers Only Not Important

```text
Your circle is still broad.

So far, you have not used any question as a filter.
Continue until something matters.
```

This should not sound judgmental.

---

### 26.5 User Returns Later

If user has existing progress:

```text
Welcome back.

Your current circle: 420 people.
Continue narrowing?
```

Actions:

```text
Continue
See circle
```

---

## 27. Animation Guidelines

Animations should support the feeling that the circle changes.

Recommended:

* number count transition;
* smooth card transition to next question;
* subtle progress/focus indicator movement;
* lightweight success animation when circle found.

Avoid:

* heavy gamification;
* confetti for serious questions;
* cartoonish reactions;
* judgmental visual cues.

---

## 28. Accessibility Requirements

* All text must be readable on small screens.
* Buttons must be large enough for thumb tapping.
* Color must not be the only state indicator.
* Screen reader labels must describe answer buttons.
* Motion should be reducible if user has reduced motion enabled.
* Questions should not rely on visual-only context.

---

## 29. MVP UX Success Criteria

The UX is successful if:

1. User understands what to do on first screen.
2. User can answer the first question without explanation.
3. User understands that Yes/No affect the circle.
4. User understands that Not important does not affect the circle.
5. User wants to answer more questions.
6. User understands when the circle is found.
7. User understands that the next step is connection/action, not just scrolling.
8. User is not forced to create a profile before receiving value.

---

## 30. Final UX Summary

The UX should make the user feel:

```text
I answer.
The circle changes.
I continue.
The circle becomes meaningful.
Now I can do something with it.
```

The interface should stay simple enough that the core idea is obvious without explanation.

The most important screen is the question screen.

The most important moment is the first answer.

The most important feedback is the circle count.
