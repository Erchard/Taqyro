# Taqyro — Technology Stack

### Purpose of This Document

This document describes the recommended technology stack for building the first version of **Taqyro**.

The goal is to build a mobile-first MVP with minimal budget, fast development speed, and low operational complexity.

The product should start as a simple, immediate experience:

```text
Open app → See question → Answer → Circle narrows → Continue → Circle found → Next action
```

The stack should support this flow without requiring a custom backend, DevOps team, or complex infrastructure.

---

## 1. Core Stack

### Mobile App

```text
Expo React Native + TypeScript
```

### Initial Development Target

The first implementation should run on Windows through Expo Web.

This means the app can be opened in a desktop browser during early development, without requiring a physical smartphone or Android/iOS emulator.

Initial development target:

```text
Windows → Expo Web → Browser preview
```

Later testing targets:

```text
Expo Go on a physical phone
Android build
iOS build
```

The first prototype should keep Firebase optional until the local question loop works.

Recommended first technical milestone:

```text
Expo app starts
→ first question appears
→ user answers Yes / No / Not important
→ local circle state updates
→ user can continue to next question
```

#### Why

Expo React Native allows building iOS and Android apps from one codebase.

Expo Web also allows the same early app to run in a browser, which is useful for fast iteration on Windows.

TypeScript makes the code safer and easier to maintain, especially when working with structured data such as questions, answers, users, circles, and actions.

#### Main responsibilities

The mobile app handles:

* first question experience;
* anonymous user session;
* answering questions;
* showing circle size;
* showing circle state;
* saving progress;
* account linking;
* nearby people later;
* groups and actions later.

---

## 2. Backend Platform

### Firebase

```text
Firebase Authentication
Cloud Firestore
Cloud Functions
Firebase Analytics
Firebase Remote Config
Firebase Cloud Messaging
Firebase Crashlytics
```

Firebase is the main backend platform for the MVP.

The reason for using Firebase is speed. It allows building the first working version without creating and maintaining a custom backend server.

---

## 3. Authentication

### Firebase Authentication

#### Required auth methods

```text
Anonymous Auth
Apple Sign-In
Google Sign-In
Email login
```

#### Product logic

The app should not require registration before the user answers questions.

The user starts anonymously.

```text
App opens
→ anonymous user is created in the background
→ user answers questions
→ answers are saved
→ later user can link account to Apple / Google / email
```

This allows the user to experience the product before committing.

#### Important rule

Manual registration should appear only after the user has received value.

Example:

```text
Your circle is almost formed.
Save it so you do not lose your result.
```

---

## 4. Database

### Cloud Firestore

Firestore stores the main app data.

It should be used for:

* users;
* questions;
* answers;
* answer paths;
* circle counts;
* contact requests;
* small groups;
* actions;
* reports;
* basic moderation data.

Firestore is a good fit for the MVP because the product is event-based and document-based:

```text
User answers question
→ answer is saved
→ circle state is recalculated
→ result is shown
```

---

## 5. Cloud Functions

### Firebase Cloud Functions

Cloud Functions should handle logic that must not live only on the client.

Use Cloud Functions for:

* recalculating circle counts;
* updating answer path counters;
* validating custom questions;
* creating contact requests;
* creating small groups;
* creating actions;
* handling reports;
* moderation workflows;
* scheduled cleanup tasks;
* push notification triggers.

The client should stay simple. Sensitive or shared logic should run in Cloud Functions.

---

## 6. Remote Config

### Firebase Remote Config

Remote Config is important for Taqyro because the first user experience depends heavily on questions.

Remote Config can control:

* first question;
* question order;
* minimum number of answers before save prompt;
* circle size thresholds;
* texts on result screens;
* whether a feature is enabled;
* experimental flows;
* A/B test variants.

This allows changing the product experience without releasing a new app version.

Example configurable values:

```json
{
  "targetCircleMin": 50,
  "targetCircleMax": 150,
  "savePromptAfterAnswers": 7,
  "firstQuestionId": "q_privacy_security_001"
}
```

---

## 7. Analytics

### Firebase Analytics

Analytics is essential for validating the core loop.

The MVP should track whether users actually engage with the question flow.

#### Key events

```text
app_opened
first_question_viewed
question_answered
not_important_selected
circle_size_updated
circle_state_broad
circle_state_found
circle_state_rare
save_prompt_viewed
account_saved
next_step_selected
nearby_people_viewed
small_group_started
action_created
action_join_requested
```

#### Most important metrics

```text
% of users who answer the first question
average number of answers per user
% of users who reach circle found
% of users who save their result
% of users who move to people / group / action
```

The first MVP should focus on one core question:

```text
Do users continue answering questions because they want to see their circle narrow?
```

---

## 8. Crash Reporting

### Firebase Crashlytics

Crashlytics should be used to track app crashes and stability issues.

This is important even for MVP because a broken first session will destroy the product experience.

Crashlytics should be added early.

---

## 9. Push Notifications

### Firebase Cloud Messaging

Push notifications can be added after the core loop works.

Use push notifications for:

* contact requests;
* accepted requests;
* small group updates;
* action updates;
* reminders before offline actions;
* new people in the user’s circle.

Push notifications should not be part of the first core prototype unless needed.

---

## 10. Storage

### Firebase Storage

Firebase Storage is optional for MVP.

The early product should avoid heavy media features.

Storage may be needed later for:

* avatars;
* action images;
* moderation evidence;
* optional profile media.

For the first version, photos should not be required.

---

## 11. Frontend Libraries

### Recommended mobile libraries

```text
Expo Router
Zustand
React Hook Form
Zod
TanStack Query
React Native Reanimated
React Native Gesture Handler
```

#### Expo Router

Used for navigation and app structure.

#### Zustand

Used for simple local state:

* current question;
* local answer flow;
* current circle count;
* temporary session state;
* UI state.

#### React Hook Form + Zod

Useful for forms later:

* custom question creation;
* action creation;
* contact request;
* report form.

The first question flow may not need forms.

#### TanStack Query

Useful for async data fetching and caching.

Can be used for:

* questions;
* current user state;
* circle data;
* people from circle;
* actions;
* groups.

#### Reanimated / Gesture Handler

Useful for making the question flow feel fast, fluid, and game-like.

Example interactions:

* swipe to next question;
* animated circle narrowing;
* progress indicator;
* card transitions.

---

## 12. Suggested Project Structure

```text
src/
  app/
    index.tsx
    question/
    circle/
    save/
    people/
    groups/
    actions/
    settings/

  components/
    QuestionCard.tsx
    AnswerButton.tsx
    CircleCounter.tsx
    CircleProgress.tsx
    ResultCard.tsx

  features/
    questions/
      api.ts
      types.ts
      hooks.ts
      logic.ts

    answers/
      api.ts
      types.ts
      logic.ts

    circle/
      api.ts
      types.ts
      logic.ts

    auth/
      api.ts
      hooks.ts

    actions/
      api.ts
      types.ts

  lib/
    firebase.ts
    analytics.ts
    remoteConfig.ts

  store/
    useSessionStore.ts
    useQuestionFlowStore.ts

  utils/
    pathKey.ts
    circleState.ts
```

---

## 13. Firestore Data Model

### users

```text
users/{userId}
```

Example:

```json
{
  "uid": "abc123",
  "authType": "anonymous",
  "createdAt": "...",
  "lastActiveAt": "...",
  "answerCount": 8,
  "filterAnswerCount": 5,
  "currentCircleCount": 420,
  "circleState": "broad",
  "saved": false,
  "approxLocation": null
}
```

---

### questions

```text
questions/{questionId}
```

Example:

```json
{
  "id": "q001",
  "text": "You can make society safer, but everyone loses privacy. Do you agree?",
  "status": "active",
  "type": "universal",
  "order": 1,
  "createdAt": "..."
}
```

All questions use the same answer options:

```text
yes
no
not_important
```

---

### user answers

```text
users/{userId}/answers/{questionId}
```

Example:

```json
{
  "questionId": "q001",
  "answer": "yes",
  "isFilter": true,
  "answeredAt": "..."
}
```

If answer is `not_important`:

```json
{
  "questionId": "q001",
  "answer": "not_important",
  "isFilter": false,
  "answeredAt": "..."
}
```

---

### answer paths

The matching path includes only answers where the user selected `yes` or `no`.

Questions answered as `not_important` are not included.

```text
answerPaths/{pathHash}
```

Example:

```json
{
  "pathKey": "q001:yes|q003:no|q007:yes",
  "count": 126,
  "updatedAt": "..."
}
```

---

## 14. Matching Logic

### Core rule

```text
Yes = filter by Yes
No = filter by No
Not important = no filter
```

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
Q1:Yes
Q3:No
Q5:Yes
```

Questions Q2 and Q4 are ignored completely for matching.

Other users can have any answer or no answer at all for Q2 and Q4.

---

## 15. Circle State Logic

The app should classify the current circle size into simple states.

Example:

```text
too_broad
getting_closer
circle_found
rare_path
```

Suggested thresholds:

```text
circleCount > 1000     → too_broad
151–1000               → getting_closer
50–150                 → circle_found
1–49                   → rare_path
0                      → no_matches
```

These values should be configurable through Remote Config.

---

## 16. Admin and Content Management

For MVP, admin can be simple.

### Option 1: Firebase Console only

Use Firebase Console to manage:

* questions;
* status;
* ordering;
* test data.

This is enough for the earliest prototype.

### Option 2: Simple Web Admin Later

Later, create a lightweight web admin.

Recommended stack:

```text
Next.js
TypeScript
Firebase Admin SDK
Vercel
```

Admin features later:

* create questions;
* edit questions;
* activate/deactivate questions;
* review custom questions;
* review reports;
* view basic metrics.

---

## 17. Development Tools

### IDE

```text
Codex or Cursor
```

The project should be structured clearly so AI coding tools can work effectively.

Good documentation should exist for:

* project overview;
* user stories;
* technology stack;
* data model;
* matching rules;
* UI flow;
* Firebase rules;
* Cloud Functions.

---

## 18. Testing

### Recommended testing tools

```text
Jest
React Native Testing Library
Firebase Emulator Suite
```

#### What to test first

* answer selection;
* `not_important` does not affect matching path;
* path key generation;
* circle state calculation;
* anonymous user flow;
* account linking;
* question ordering;
* result screen behavior.

The most important tests are around the matching rule.

---

## 19. Firebase Security Rules

Security rules are critical.

Basic principles:

* users can read public active questions;
* users can read and write only their own answers;
* users can read their own user document;
* users cannot directly modify global counters;
* global counter updates should happen through Cloud Functions;
* users cannot edit other users’ answers;
* moderation/admin writes require admin privileges.

Cloud Functions should handle sensitive updates.

---

## 20. MVP Scope

### Version 0.1 — Core Loop

Must include:

* Expo React Native app;
* Firebase anonymous auth;
* first screen is a question;
* answer options: Yes / No / Not important;
* saving answers;
* matching path generation;
* circle count update;
* circle state display;
* Remote Config for question order and thresholds;
* Analytics events;
* save prompt after value is created.

No need yet for:

* detailed profiles;
* photos;
* chat;
* maps;
* groups;
* offline actions;
* complex moderation.

---

### Version 0.2 — Circle Interaction

Add:

* account linking;
* approximate location;
* people from circle nearby;
* anonymous circle cards;
* contact requests;
* basic chat after mutual consent.

---

### Version 0.3 — Action Layer

Add:

* small groups;
* offline actions;
* join requests;
* action coordination;
* basic trust signals;
* reporting and moderation.

---

## 21. Why This Stack Fits Taqyro

The product needs:

* instant start;
* anonymous usage;
* fast iteration;
* remote question changes;
* simple backend;
* analytics from day one;
* low cost;
* no DevOps;
* easy mobile deployment.

The recommended stack supports this well:

```text
Expo React Native + TypeScript + Firebase
```

This stack allows building the first MVP quickly while keeping enough flexibility to expand into people, groups, and offline actions later.

---

## 22. Core Technical Principle

The first version should not overbuild infrastructure.

The goal is to prove the main product loop:

```text
Question → Answer → Circle narrows → User continues
```

Everything else should be added only after this loop works.
