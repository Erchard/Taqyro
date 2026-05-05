# Taqyro — Final MVP Definition

### 1. Purpose

This document defines the final scope of the first MVP for **Taqyro**.

The MVP must validate the core product idea:

> A user answers meaningful questions and sees how each important answer narrows a broad audience into a focused circle of people who answered the same way on what matters.

The MVP is not a full social network, dating app, event platform, or community tool.

The MVP is a focused prototype of the core loop:

```text
Question → Answer → Circle narrows → Continue → Circle found → Save → Next step
```

---

### 2. MVP Goal

The MVP must answer one primary question:

> Will users continue answering sharp questions because they want to see their circle narrow?

Secondary questions:

1. Do users understand the difference between **Yes / No / Not important**?
2. Do users understand that **Not important** does not filter the circle?
3. Do users reach a meaningful circle state?
4. Do users want to save their result after receiving value?
5. Do users want to continue toward people, groups, or action after the circle is found?

---

### 3. Target MVP Experience

A new user opens the app and immediately sees a question.

No registration.
No profile setup.
No photo upload.
No onboarding slideshow.
No location request.

The user answers:

```text
Yes
No
Not important
```

After each answer, the app shows the current circle size and state.

The user continues until the circle becomes focused, rare, or no matches are found.

Only after the user receives value does the app ask them to save the result.

---

### 4. Core Rule

This rule must be implemented exactly:

```text
Yes = filter by Yes
No = filter by No
Not important = no filter
```

Meaning:

* If the user answers **Yes**, people in their circle must also have answered **Yes** to that question.
* If the user answers **No**, people in their circle must also have answered **No** to that question.
* If the user answers **Not important**, the question is ignored completely for matching.

`Not important` is not a third matching answer.

It does not matter whether other users answered Yes, No, Not important, or did not answer that question.

For this user, that question does not exist in the matching filter.

---

### 5. What the MVP Must Include

### 5.1 Mobile App

The MVP must be a mobile app built with:

```text
Expo React Native
TypeScript
Firebase
```

Required Firebase services:

```text
Firebase Authentication
Cloud Firestore
Cloud Functions
Firebase Analytics
Firebase Remote Config
Firebase Crashlytics
```

---

### 5.2 Anonymous Start

The user must be able to start without manual registration.

Required behavior:

```text
App opens
→ anonymous Firebase user is created
→ user answers questions
→ answers are saved
→ user can later link account
```

Acceptance criteria:

* No manual signup before first question.
* Anonymous answers are stored.
* Anonymous session persists if app is reopened.
* Account linking later preserves all answers.

---

### 5.3 First Screen Is a Question

The first screen must show a meaningful question.

Required screen elements:

* question text;
* **Yes** button;
* **No** button;
* **Not important** button;
* minimal supporting text if needed.

The first screen must not show:

* registration form;
* profile setup;
* permission request;
* location request;
* long explanation;
* tutorial.

---

### 5.4 Question Flow

The MVP must support a sequence of questions.

Requirements:

* one question at a time;
* fixed answer options;
* fast transition after answer;
* no category selection in the first flow;
* no long form UI;
* no user profile dependency.

The user must be able to answer at least:

```text
20 questions
```

in the test build.

---

### 5.5 Answer Storage

Every answer must be stored.

For each answer, store:

```text
questionId
answer
isFilter
answeredAt
```

Rules:

```text
answer = yes             → isFilter = true
answer = no              → isFilter = true
answer = not_important   → isFilter = false
```

---

### 5.6 Matching Path

The MVP must generate a matching path for the user.

The matching path includes only:

```text
yes
no
```

It excludes:

```text
not_important
unanswered questions
```

Example:

```text
Q1 = yes
Q2 = not_important
Q3 = no
Q4 = not_important
Q5 = yes
```

Matching path:

```text
Q1:yes | Q3:no | Q5:yes
```

---

### 5.7 Circle Count

After each answer, the app must show the current circle count.

Circle count means:

> Number of active users who match all of the current user’s filtering answers.

For MVP, this is directional matching:

```text
Candidate is in my circle if candidate satisfies my filters.
```

The candidate may have additional filtering answers of their own.

That does not exclude them from my circle.

---

### 5.8 Circle States

The MVP must classify the circle count into states.

Required states:

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

Thresholds must be configurable through Remote Config or server-side config.

---

### 5.9 Feedback After Each Answer

After each answer, the app must show a result.

If the user answered **Yes** or **No**:

```text
Your circle: 420 people
Still broad.
```

If the user answered **Not important**:

```text
This question did not affect your circle.
We will not filter people by this answer.
```

The app must not say:

```text
People who also answered Not important...
```

because that is not the logic.

---

### 5.10 Circle Found Screen

When the circle enters the target range, the app must show a milestone screen.

Example:

```text
Your circle is found.

126 people match your important answers.

You answered 16 questions.
12 of them shaped your circle.
```

Required actions:

```text
Save circle
Continue narrowing
```

---

### 5.11 Rare Path / No Matches Handling

If the circle becomes very small, the app must show this neutrally.

Rare path example:

```text
Your path is rare.

Only 9 people in the current network match your important answers.
```

No matches example:

```text
No matches yet.

No one in the current network matches this exact set of important answers yet.
```

The app must not frame this as failure.

The app must not fake matches.

---

### 5.12 Save Result

The MVP must allow the user to save their result after value is created.

Save options:

```text
Apple
Google
Email
```

Required behavior:

* save prompt appears after meaningful progress;
* save prompt does not appear before the first question;
* anonymous answers are preserved;
* user is not required to create a profile;
* no photo or bio is required.

---

### 5.13 Next Step Screen

After the user reaches a circle milestone and/or saves the result, the app must show what can happen next.

MVP next step options:

```text
Continue narrowing
Invite someone
See people from my circle
```

If people functionality is not implemented yet, it can be shown as:

```text
Coming soon
```

The purpose is to communicate product direction without overbuilding.

---

### 5.14 Analytics

The MVP must track the core loop.

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
no_matches_reached
save_prompt_viewed
account_link_started
account_link_completed
next_step_viewed
next_step_selected
```

Important event properties:

```text
questionId
answer
isFilter
answerCount
filterAnswerCount
circleCount
circleState
```

---

### 6. What the MVP Must Not Include

The first MVP must not include:

* detailed user profiles;
* required names;
* required photos;
* bios;
* professions;
* hobbies;
* swiping;
* likes;
* followers;
* endless feed;
* public comments;
* full chat;
* maps;
* exact location;
* complex groups;
* full offline event platform;
* payments;
* AI personality analysis;
* psychological labels;
* political labels;
* compatibility percentages;
* hidden scoring;
* fake users;
* fake counts.

These features may be considered later only if they strengthen the core path.

---

### 7. MVP Screens

The MVP must include these screens or equivalent states.

### 7.1 Question Screen

Purpose:

> Show one question and allow the user to answer.

Required elements:

* question text;
* Yes;
* No;
* Not important;
* current circle count if available;
* circle state if available.

---

### 7.2 Answer Result State

Purpose:

> Show what happened after the answer.

Required elements:

* updated circle count;
* short explanation;
* circle state;
* next question CTA.

---

### 7.3 Circle Found Screen

Purpose:

> Show that the user has reached a useful circle.

Required elements:

* circle count;
* number of important answers;
* short explanation;
* save CTA;
* continue narrowing option.

---

### 7.4 Rare Path Screen

Purpose:

> Show that the current answer path is rare.

Required elements:

* low circle count;
* neutral explanation;
* save option;
* continue option.

---

### 7.5 No Matches Screen

Purpose:

> Handle zero matches without a dead end.

Required elements:

* zero count;
* honest explanation;
* continue option;
* save/invite option if available.

---

### 7.6 Save Result Screen

Purpose:

> Convert anonymous user into saved user after value is created.

Required elements:

* reason to save;
* Apple login;
* Google login;
* email option;
* optional “not now”.

---

### 7.7 Next Step Screen

Purpose:

> Show what the user can do after finding a circle.

Required elements:

* current circle count;
* continue narrowing;
* invite someone;
* see people from circle or coming soon.

---

### 8. Data Requirements

Minimum required Firestore collections:

```text
users
users/{userId}/answers
questions
userFilterAnswers
answerIndexes
```

Optional for development/debugging:

```text
circleCalculations
questionStats
answerPathCounters
```

Required user fields:

```text
uid
authType
createdAt
lastActiveAt
answerCount
filterAnswerCount
currentPathKey
currentPathHash
currentCircleCount
circleState
saved
isBanned
isDeleted
```

Required question fields:

```text
id
text
status
order
locale
type
createdAt
updatedAt
```

Required answer fields:

```text
questionId
answer
isFilter
answeredAt
questionOrder
```

---

### 9. Question Content Requirements

The MVP should include:

```text
30–50 strong universal questions
```

At minimum, the test build must include:

```text
20 active questions
```

Questions must be:

* clear;
* short;
* meaningful;
* globally understandable;
* answerable with Yes / No / Not important;
* not purely factual;
* not purely preference-based;
* not obviously one-sided;
* not hateful;
* not dehumanizing;
* not a call for violence.

The first question must be universal and emotionally engaging.

Example candidate:

```text
Would you accept constant government surveillance if it made society much safer?
```

---

### 10. Privacy Requirements

The MVP must protect user privacy.

Required:

* no public answer history;
* no exact location;
* no required real name;
* no required photo;
* no public profile;
* only aggregate circle counts in the first flow;
* users cannot read other users’ private answers.

The MVP should show counts, not identities.

---

### 11. Technical Requirements

### 11.1 Stack

```text
Expo React Native
TypeScript
Firebase
```

### 11.2 Firebase Services

```text
Firebase Authentication
Cloud Firestore
Cloud Functions
Firebase Analytics
Firebase Remote Config
Firebase Crashlytics
```

### 11.3 Cloud Functions Responsibilities

Cloud Functions should handle:

* answer validation;
* updating indexes;
* rebuilding user filter path;
* calculating circle count;
* updating circle state;
* updating question stats;
* preventing client-side manipulation of counters.

The client should not directly update shared counters or derived matching data.

---

### 12. Security Requirements

Minimum security rules:

* users can read active questions;
* users can read/write only their own answers;
* users can read/write only allowed fields in their own user document;
* users cannot write global indexes;
* users cannot write circle counters directly;
* users cannot read other users’ private answers;
* admin-only writes for question management.

---

### 13. Performance Requirements

The MVP should feel fast.

Targets:

* first question appears quickly after app open;
* answer tap gives visible feedback quickly;
* circle count updates without long blocking;
* cached questions are used when possible;
* network errors do not destroy the session.

If circle count is delayed, show:

```text
Updating your circle...
```

If calculation fails, show:

```text
Your answer was saved.
We could not update your circle yet.
```

---

### 14. Edge Cases

### 14.1 User Answers Only Not Important

Expected behavior:

* circle does not narrow;
* app explains this neutrally.

Copy:

```text
Your circle is still broad.
So far, no question has become a filter.
```

---

### 14.2 Circle Count Becomes Zero

Expected behavior:

* show `no_matches`;
* do not fake results;
* allow continuing or saving.

---

### 14.3 User Runs Out of Questions

Expected behavior:

* show current circle state;
* allow save;
* allow invite/share if available;
* communicate that more questions will come later.

---

### 14.4 Network Failure

Expected behavior:

* save locally if possible;
* retry answer upload;
* do not lose the answer;
* show non-blocking error.

---

### 14.5 Returning User

Expected behavior:

* restore anonymous or saved session;
* show current circle state;
* allow continuing.

Copy:

```text
Welcome back.
Your current circle: 420 people.
Continue narrowing?
```

---

### 15. MVP Release Criteria

The MVP is ready for internal testing when all of the following are true:

1. App opens directly to a question.
2. Anonymous auth works.
3. User can answer at least 20 questions.
4. Yes/No/Not important logic works correctly.
5. Not important never filters.
6. Matching path is generated correctly.
7. Circle count updates after answers.
8. Circle state updates correctly.
9. Circle found state can be reached.
10. Rare path/no matches states work.
11. Save prompt works.
12. Account linking preserves answers.
13. Analytics events are emitted.
14. Basic Firebase security rules are in place.
15. No critical crashes in the core flow.

---

### 16. MVP Success Metrics

Primary metric:

```text
% of users who answer at least 7 questions in the first session
```

Secondary metrics:

```text
first question answer rate
average answers per first session
average filtering answers per first session
percentage of Not important answers
percentage reaching circle_found
percentage reaching rare_path
save prompt conversion
next step selection rate
```

The MVP is promising if users voluntarily continue answering questions without being forced by onboarding or profile completion.

---

### 17. Definition of Done

The MVP is done when a new user can:

1. Install/open the app.
2. Immediately answer a meaningful question.
3. See how their answer affects their circle.
4. Continue answering questions.
5. Reach a focused, rare, or no-match circle state.
6. Save the result after receiving value.
7. See at least one next step after the circle is formed.

The MVP is not done if it requires the user to:

* register before answering;
* create a profile before seeing value;
* upload a photo;
* understand hidden scoring;
* browse profiles as the main experience.

---

### 18. Final MVP Statement

The first MVP of Taqyro is a mobile app that proves the core loop:

```text
A user answers meaningful questions.
Yes and No narrow the circle.
Not important does not filter.
The user sees the circle change.
The user continues because the loop is engaging.
The user eventually reaches a meaningful circle.
```

Everything else is secondary.
