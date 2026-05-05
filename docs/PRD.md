# Taqyro — MVP Product Requirements Document

### 1. Purpose

This document defines the MVP requirements for **Taqyro**.

Taqyro is a mobile app where users answer sharp questions, narrow a broad audience into a smaller circle of people with matching important answers, and then move toward connection or offline action.

The MVP must prove the core product loop:

```text
Question → Answer → Circle narrows → Continue → Circle found → Next step
```

The MVP should not try to build a full social network, dating app, community platform, or event platform.

---

### 2. Product Goal

The goal of the MVP is to validate one core hypothesis:

> Users will keep answering meaningful questions if they immediately see how each answer changes the size of their circle.

The MVP must answer these questions:

1. Do users answer the first question?
2. Do users continue answering multiple questions?
3. Do users understand the circle-narrowing mechanic?
4. Do users reach a “circle found” state?
5. Do users want to save their result?
6. Do users want to take a next step after the circle is found?

---

### 3. Target User Experience

The product should feel:

* immediate;
* simple;
* slightly game-like;
* emotionally engaging;
* transparent;
* not like a survey;
* not like a personality test;
* not like a dating profile setup.

The first user experience should not require:

* registration;
* profile creation;
* photo upload;
* long onboarding;
* permission prompts;
* location access;
* settings.

The first screen should be a question.

---

### 4. Core MVP Flow

```text
Open app
→ Anonymous session starts
→ First question appears
→ User answers Yes / No / Not important
→ App shows current circle size
→ App shows circle state
→ User continues answering
→ Circle becomes focused
→ App shows “Circle found”
→ App asks user to save result
→ User chooses next step
```

---

### 5. Key Product Concepts

#### 5.1 Question

A question is a short, meaningful dilemma or boundary check.

Each question has exactly three answer options:

```text
Yes
No
Not important
```

Questions should be understandable without explanation.

---

#### 5.2 Important Answer

An answer is important if the user chooses:

```text
Yes
No
```

Important answers become part of the matching filter.

---

#### 5.3 Not Important

`Not important` means:

> This question does not matter to me as a criterion for my circle.

It does not filter the circle.

It is not treated as a third matching answer.

It is ignored completely for matching.

Rule:

```text
Yes = filter by Yes
No = filter by No
Not important = no filter
```

---

#### 5.4 Circle

A circle is the group of people who match the user’s important answers.

The circle is not based on personality labels, profile data, hobbies, or interpretations.

It is based only on matching answers to questions that the user made important.

---

#### 5.5 Circle Count

Circle count is the number of users who match the current user’s important answer path.

Example:

```text
Q1 = Yes
Q2 = Not important
Q3 = No
Q4 = Yes
```

Matching filter:

```text
Q1 = Yes
Q3 = No
Q4 = Yes
```

Question Q2 is ignored.

The circle count is the number of users matching Q1, Q3, and Q4.

---

#### 5.6 Circle State

Circle state describes whether the current circle is useful yet.

Initial suggested states:

```text
too_broad
getting_closer
circle_found
rare_path
no_matches
```

Suggested thresholds:

```text
circleCount > 1000      → too_broad
151–1000                → getting_closer
50–150                  → circle_found
1–49                    → rare_path
0                       → no_matches
```

These thresholds must be configurable.

---

### 6. MVP Scope

### 6.1 Must Have

The MVP must include:

1. Mobile app built with Expo React Native.
2. Anonymous user session.
3. First screen is a question.
4. No registration before answering.
5. Question flow with Yes / No / Not important.
6. Saving answers.
7. Matching path generation.
8. Circle count calculation.
9. Circle state display.
10. Result feedback after every answer.
11. Ability to continue to next question.
12. Circle found screen.
13. Save result prompt.
14. Account linking after value is created.
15. Basic next step screen after circle is found.
16. Basic analytics events.

---

### 6.2 Should Have

The MVP should include if time allows:

1. Remote Config for first question and thresholds.
2. Question order controlled remotely.
3. Basic local persistence for offline/session continuity.
4. Basic share/invite mechanic.
5. Basic admin ability to manage questions through Firebase Console.
6. Simple visual indicator of circle focus.

---

### 6.3 Not in MVP

The MVP should not include:

* detailed user profiles;
* profile photos;
* public bios;
* follower system;
* likes;
* swiping;
* full chat;
* maps;
* exact location;
* complex groups;
* full event platform;
* payments;
* recommendation engine;
* personality types;
* ideological labels;
* AI-based interpretation;
* AI moderation;
* complex trust scores;
* public feed.

These may be considered later only after the core loop is validated.

---

### 7. Functional Requirements

## 7.1 App Launch

### Requirement

When the user opens the app for the first time, the app must show a question immediately.

### Behavior

* App starts anonymous session in background.
* First question is loaded.
* User sees question and three answer buttons.
* No account prompt appears before first answer.
* No location prompt appears before first answer.

### Acceptance Criteria

* User can answer the first question within one tap.
* First screen does not require signup.
* First screen does not require profile setup.
* First screen does not require permissions.
* First screen shows only essential UI.

---

## 7.2 Anonymous Session

### Requirement

Every user must have a session before answering.

### Behavior

* If no authenticated user exists, create Firebase Anonymous Auth user.
* Store answers under that anonymous user ID.
* Preserve anonymous answers if user later links Apple / Google / email.

### Acceptance Criteria

* User can answer questions without manual registration.
* Answers persist during the session.
* Account linking does not delete previous answers.
* If app is restarted, anonymous session should continue if possible.

---

## 7.3 Question Display

### Requirement

The app must display one question at a time.

### Question UI

Each question screen must include:

* question text;
* Yes button;
* No button;
* Not important button;
* current circle count if available;
* circle focus/state indicator if available.

### Acceptance Criteria

* Only one question is shown at a time.
* Answer options are always the same.
* The user can answer quickly.
* The UI should not feel like a long form.

---

## 7.4 Answer Handling

### Requirement

The app must process each answer according to the core rule.

### Rule

```text
Yes = add question to matching filter with Yes
No = add question to matching filter with No
Not important = save answer, but do not add to matching filter
```

### Acceptance Criteria

* Yes creates `isFilter = true`.
* No creates `isFilter = true`.
* Not important creates `isFilter = false`.
* Not important does not change matching path.
* Not important does not exclude users who did not answer the question.
* Answer is saved to the user answer history.

---

## 7.5 Matching Path

### Requirement

The app must maintain a matching path for each user.

The matching path includes only questions answered Yes or No.

### Example

User answers:

```text
Q1 = Yes
Q2 = Not important
Q3 = No
Q4 = Not important
Q5 = Yes
```

Matching path:

```text
Q1:Yes | Q3:No | Q5:Yes
```

### Acceptance Criteria

* Matching path excludes all Not important answers.
* Matching path excludes unanswered questions.
* Matching path has deterministic ordering.
* Same meaningful answer set always creates the same path key.
* Path key can be used to count matching users.

---

## 7.6 Circle Count Calculation

### Requirement

After every answer, the app must show the updated circle count.

### Behavior

* If answer is Yes or No, circle may narrow.
* If answer is Not important, circle should not narrow because of that question.
* Circle count is based on current matching path.

### Acceptance Criteria

* Circle count updates after every answer.
* Circle count is never based on ignored questions.
* If user chooses Not important, the app explains that this question did not affect the circle.
* Count must not be fake.
* If exact count is not available immediately, UI may show loading or previous count briefly.

---

## 7.7 Circle State

### Requirement

The app must classify current circle count into a state.

### States

```text
too_broad
getting_closer
circle_found
rare_path
no_matches
```

### Acceptance Criteria

* State is recalculated after circle count changes.
* Thresholds are configurable.
* State is shown in simple language.
* State guides the next UI action.

### Example Texts

#### Too Broad

```text
Your circle is still broad.
Answer more questions to make it more focused.
```

#### Getting Closer

```text
Your circle is getting closer.
A few more answers can make it useful.
```

#### Circle Found

```text
Your circle is found.
These people match your important answers.
```

#### Rare Path

```text
Your path is rare.
Only a few people match your important answers.
```

#### No Matches

```text
No one in the current network matches this exact path yet.
```

---

## 7.8 Result Feedback After Answer

### Requirement

After each answer, the app must show immediate feedback.

### Behavior

If answer is Yes or No:

```text
Your circle: 420 people
```

If answer is Not important:

```text
This question did not affect your circle.
```

### Acceptance Criteria

* Feedback appears quickly.
* Feedback is factual.
* Feedback does not assign personality labels.
* Feedback does not judge the answer.
* User can move to next question.

---

## 7.9 Continue Question Flow

### Requirement

User must be able to continue answering questions until circle is found or questions end.

### Behavior

* After feedback, user can continue.
* App shows next question.
* The flow should feel continuous and fast.

### Acceptance Criteria

* No unnecessary screens between questions.
* User can answer multiple questions quickly.
* App tracks number of answered questions.
* App tracks number of filtering answers.

---

## 7.10 Circle Found Screen

### Requirement

When circle state becomes `circle_found`, the app must show a result screen.

### Screen Content

The screen should show:

* circle count;
* number of important answers used;
* explanation that these people match important answers;
* next step options.

### Example

```text
Your circle is found.

124 people match your important answers.

You can now:
- Save your circle
- See next steps
- Answer more questions
```

### Acceptance Criteria

* Screen appears when circle count enters target range.
* User can save result.
* User can continue narrowing if desired.
* User can move to next step.

---

## 7.11 Rare Path Screen

### Requirement

When circle state becomes `rare_path`, the app must communicate this clearly.

### Behavior

The app should not present rare path as failure.

### Example

```text
Your path is rare.

Only 9 people match your important answers.
You can still continue, save this result, or answer more questions.
```

### Acceptance Criteria

* Rare path message is neutral.
* User can continue.
* User can save result.
* User can later broaden by changing answers, if edit feature exists.

---

## 7.12 No Matches Screen

### Requirement

If circle count becomes zero, the app must handle this gracefully.

### Behavior

The app should explain that no one in the current network matches this exact path yet.

### Possible Actions

* Continue answering.
* Save rare path.
* Invite people.
* Review important answers later.

### Acceptance Criteria

* No dead end.
* No shame or negative framing.
* App does not fake matches.
* User can continue using app.

---

## 7.13 Save Result Prompt

### Requirement

The app must ask the user to save only after value has been created.

### Trigger Options

Save prompt may appear when:

* user reaches circle_found;
* user answers a configured number of questions;
* user has at least a configured number of important answers;
* user tries to access next step.

### Example

```text
Save your circle so you do not lose your answers.
```

### Acceptance Criteria

* Save prompt does not appear before first answer.
* Save prompt does not block the initial experience.
* User can link account to Apple / Google / email.
* Anonymous data is preserved.

---

## 7.14 Next Step Screen

### Requirement

After circle is found and/or saved, the user should see next step options.

### MVP Options

For MVP, options may be placeholders or simple flows:

```text
See people from my circle
Form a small group
Answer more questions
Invite people
```

### Acceptance Criteria

* User sees that circle is not the final destination.
* User can continue answering.
* User can save/share/invite.
* Full people/group/action functionality may be deferred.

---

## 7.15 Basic Invite / Share

### Requirement

The MVP should support simple sharing if feasible.

### Behavior

User can share app or invite others to answer questions.

### Acceptance Criteria

* Share text explains the concept briefly.
* No sensitive answer history is shared.
* User can invite friends without exposing their answers.

---

### 8. Non-Functional Requirements

## 8.1 Performance

* First question should load quickly.
* Answer feedback should appear within a short delay.
* App should feel instant even if circle count calculation is remote.
* Cached questions should be used when possible.

---

## 8.2 Reliability

* Answers should not be lost.
* Anonymous session should persist.
* Network failures should be handled gracefully.
* If Firestore write fails, app should retry or store locally until retry.

---

## 8.3 Privacy

* No exact location in MVP.
* No profile required in MVP.
* No public answer history in MVP.
* User answers should not be exposed to other users by default.
* Only aggregate circle counts are shown in core loop.

---

## 8.4 Transparency

* Matching logic must be explainable.
* No hidden personality scoring.
* No hidden ideological labels.
* No fake counts.
* No fake users.

---

## 8.5 Safety

* User-created questions, if included, must be limited or moderated.
* Reporting/blocking may be deferred until people/contact features exist.
* No direct contact without mutual consent in later versions.

---

## 8.6 Scalability

The MVP should not over-optimize prematurely, but data structures should allow:

* many users;
* many questions;
* fast circle count lookup;
* future location-based matching;
* future people/group/action layers.

---

### 9. Data Requirements

## 9.1 User

MVP user document should store:

```text
uid
authType
createdAt
lastActiveAt
answerCount
filterAnswerCount
currentPathKey
currentCircleCount
circleState
saved
```

---

## 9.2 Question

Question document should store:

```text
id
text
status
order
type
locale
createdAt
```

All questions use fixed answer options:

```text
yes
no
not_important
```

---

## 9.3 Answer

Answer document should store:

```text
questionId
answer
isFilter
answeredAt
```

---

## 9.4 Answer Path

Answer path document should store:

```text
pathKey
count
updatedAt
```

The path key includes only filtering answers.

---

### 10. Analytics Requirements

The MVP must track events for the core loop.

Required events:

```text
app_opened
anonymous_session_created
question_viewed
question_answered
answer_yes
answer_no
answer_not_important
circle_count_updated
circle_state_changed
circle_found
rare_path_reached
save_prompt_viewed
account_link_started
account_link_completed
next_step_viewed
next_step_selected
```

Important properties:

```text
questionId
answer
isFilter
answerIndex
filterAnswerCount
circleCount
circleState
sessionId
userId
```

Main metrics:

1. First question answer rate.
2. Average answers per user.
3. Average important answers per user.
4. Percentage selecting Not important.
5. Percentage reaching circle_found.
6. Percentage reaching rare_path.
7. Save prompt conversion.
8. Next step selection rate.

---

### 11. UX Requirements

## 11.1 Tone

Tone should be:

* clear;
* direct;
* neutral;
* not judgmental;
* not overly playful;
* not academic;
* not ideological.

---

## 11.2 UI Style

The UI should be:

* minimal;
* fast;
* focused on one question;
* readable;
* mobile-first;
* low-friction.

Avoid clutter.

---

## 11.3 Feedback Style

Good feedback:

```text
Your circle: 420 people
Still broad.
```

Bad feedback:

```text
You are a rare independent thinker.
```

Good feedback:

```text
This question did not affect your circle.
```

Bad feedback:

```text
You avoided taking a position.
```

---

### 12. Edge Cases

## 12.1 User Answers Not Important Many Times

Behavior:

* Circle may remain broad.
* App should not punish user.
* App may say:

```text
Your circle is still broad because few questions became filters.
Continue with more questions or add one that matters to you.
```

---

## 12.2 User Reaches No Matches

Behavior:

* Show no_matches state.
* Do not fake results.
* Offer to continue or save rare path.

---

## 12.3 User Runs Out of Questions

Behavior:

* Show current circle state.
* If still broad, suggest more questions are coming later.
* If useful, show next steps.
* Allow invite/share.

---

## 12.4 Network Error During Answer

Behavior:

* Save locally if possible.
* Show temporary state.
* Retry upload.
* Do not lose answer.

---

## 12.5 Duplicate Answer

Behavior:

* User should not accidentally answer same question twice in normal flow.
* If answer is changed later, path and counts must update correctly.
* Editing answers may be deferred from MVP.

---

## 12.6 Small User Base

Behavior:

* Counts may be low.
* App must be honest.
* Wording should say “in the current network” if needed.
* Do not generate fake users.

---

### 13. MVP Screens

## 13.1 Question Screen

Purpose:

* Show question.
* Let user answer.

Elements:

* question text;
* Yes button;
* No button;
* Not important button;
* current circle count/state if available;
* subtle progress/focus indicator.

---

## 13.2 Answer Result Screen

Purpose:

* Show effect of answer.

Elements:

* updated circle count;
* circle state;
* short explanation;
* next question button.

This may be a separate screen or an animated state on the same screen.

---

## 13.3 Circle Found Screen

Purpose:

* Show that circle is useful.

Elements:

* circle count;
* number of important answers;
* short explanation;
* save result CTA;
* continue narrowing option.

---

## 13.4 Save Result Screen

Purpose:

* Convert anonymous user into saved account.

Elements:

* short reason to save;
* Apple login;
* Google login;
* email option;
* maybe continue without saving.

---

## 13.5 Next Step Screen

Purpose:

* Show what can happen after circle.

Elements:

* see people from circle;
* form small group;
* answer more questions;
* invite people.

For MVP, some options may be disabled or marked as coming soon.

---

### 14. Release Criteria

The MVP is ready for internal testing when:

* app opens to first question;
* anonymous auth works;
* user can answer at least 20 questions;
* Yes/No/Not important logic works;
* matching path is generated correctly;
* circle count updates;
* circle state updates;
* circle found state can be reached;
* save prompt works;
* account linking preserves answers;
* analytics events fire;
* no critical crashes in core flow.

---

### 15. Success Criteria

MVP success should be measured by behavior, not opinions.

Primary success metric:

```text
Percentage of users who answer at least 7 questions in first session
```

Secondary metrics:

```text
Percentage of users who answer first question
Average answers per first session
Percentage of users reaching circle_found
Percentage of users saving result
Percentage of users selecting next step
```

Early target benchmarks may be adjusted after testing, but initial desired signals:

```text
First question answer rate: high
7-question completion: meaningful
Save prompt conversion: non-trivial
Users understand Not important logic
Users understand circle narrowing
```

---

### 16. Open Questions

These decisions may be finalized during development/testing:

1. Exact first question.
2. Exact threshold for circle_found.
3. Whether result feedback is separate screen or inline animation.
4. Whether save prompt appears at circle_found or earlier.
5. Whether user can edit previous answers in MVP.
6. Whether invite/share is included in first build.
7. Whether next step options are real or partially placeholder.
8. How to handle circle counts during very small user base.
9. Whether questions are global fixed order or remotely varied.
10. Whether custom questions are included in MVP or later.

---

### 17. Product Constraints

The MVP must protect the core simplicity.

Do not add features that weaken the first loop.

Avoid building:

* profile-first onboarding;
* profile browsing as the main experience;
* complex settings;
* personality summaries;
* AI interpretations;
* feed mechanics;
* broad social networking features.

Everything should support the path:

```text
Question → Answer → Circle → Action
```

---

### 18. Final MVP Definition

The MVP is successful if a new user can:

1. Open the app.
2. Immediately answer a meaningful question.
3. See their circle count change.
4. Continue answering because the loop is interesting.
5. Reach a focused or rare circle state.
6. Save the result after receiving value.
7. Understand that the next step is connection or action, not endless scrolling.

This is the minimum product that can validate Taqyro.
