# Taqyro — Data Model / Firestore Schema

### 1. Purpose

This document describes the Firestore data model for **Taqyro**.

Taqyro is a mobile app where users answer meaningful questions, build a circle of people who match their important answers, and later move toward connection, small groups, or offline actions.

The data model must support the core MVP loop:

```text
Open app
→ Anonymous user created
→ Question shown
→ User answers Yes / No / Not important
→ Matching path updated
→ Circle count calculated
→ Circle state shown
→ User continues or saves result
```

The most important rule in the data model:

```text
Yes = filter by Yes
No = filter by No
Not important = no filter
```

---

## 2. Core Firestore Collections

Recommended top-level collections:

```text
users
questions
answerIndexes
circleCalculations
remoteConfigMirror
reports
adminUsers
```

Later versions may add:

```text
contactRequests
chats
groups
actions
actionParticipants
customQuestions
```

For MVP, the most important collections are:

```text
users
questions
answerIndexes
circleCalculations
```

---

## 3. users

### Path

```text
users/{userId}
```

### Purpose

Stores the main user state.

A user can start anonymously and later link the account to Apple, Google, or email.

### Example Document

```json
{
  "uid": "user_abc123",
  "authType": "anonymous",
  "createdAt": "2026-01-01T12:00:00Z",
  "updatedAt": "2026-01-01T12:20:00Z",
  "lastActiveAt": "2026-01-01T12:20:00Z",

  "saved": false,
  "isBanned": false,
  "isDeleted": false,

  "answerCount": 8,
  "filterAnswerCount": 5,

  "currentPathKey": "q001:yes|q003:no|q004:yes|q007:no|q008:yes",
  "currentPathHash": "sha256_hash_here",

  "currentCircleCount": 126,
  "circleState": "circle_found",

  "onboardingStage": "circle_found",

  "locale": "en",
  "country": null,

  "approxLocation": null
}
```

---

### Fields

| Field                |        Type | Required | Description                                                              |
| -------------------- | ----------: | -------: | ------------------------------------------------------------------------ |
| `uid`                |      string |      yes | Firebase Auth UID                                                        |
| `authType`           |      string |      yes | `anonymous`, `google`, `apple`, `email`                                  |
| `createdAt`          |   timestamp |      yes | User document creation time                                              |
| `updatedAt`          |   timestamp |      yes | Last update time                                                         |
| `lastActiveAt`       |   timestamp |      yes | Last app activity                                                        |
| `saved`              |     boolean |      yes | Whether anonymous result was saved/linked                                |
| `isBanned`           |     boolean |      yes | Whether user is banned                                                   |
| `isDeleted`          |     boolean |      yes | Soft delete flag                                                         |
| `answerCount`        |      number |      yes | Total answered questions including `not_important`                       |
| `filterAnswerCount`  |      number |      yes | Count of answers that are `yes` or `no`                                  |
| `currentPathKey`     |      string |       no | Human-readable matching path                                             |
| `currentPathHash`    |      string |       no | Hash of matching path                                                    |
| `currentCircleCount` |      number |       no | Current directional circle count                                         |
| `circleState`        |      string |       no | `too_broad`, `getting_closer`, `circle_found`, `rare_path`, `no_matches` |
| `onboardingStage`    |      string |      yes | Current product stage                                                    |
| `locale`             |      string |       no | User language                                                            |
| `country`            | string/null |       no | Optional country code                                                    |
| `approxLocation`     | object/null |       no | Optional approximate location later                                      |

---

### Allowed `authType` Values

```text
anonymous
google
apple
email
```

---

### Allowed `circleState` Values

```text
too_broad
getting_closer
circle_found
rare_path
no_matches
unknown
```

---

### Allowed `onboardingStage` Values

```text
new
answering
circle_broad
circle_found
save_prompt_seen
saved
next_step_seen
```

---

## 4. User Answers Subcollection

### Path

```text
users/{userId}/answers/{questionId}
```

### Purpose

Stores each user’s answer to each question.

Every answer is saved, including `not_important`.

However, only `yes` and `no` answers participate in matching.

### Example: Yes Answer

```json
{
  "questionId": "q001",
  "answer": "yes",
  "isFilter": true,
  "answeredAt": "2026-01-01T12:01:00Z",
  "questionOrder": 1
}
```

### Example: No Answer

```json
{
  "questionId": "q003",
  "answer": "no",
  "isFilter": true,
  "answeredAt": "2026-01-01T12:05:00Z",
  "questionOrder": 3
}
```

### Example: Not Important Answer

```json
{
  "questionId": "q002",
  "answer": "not_important",
  "isFilter": false,
  "answeredAt": "2026-01-01T12:03:00Z",
  "questionOrder": 2
}
```

---

### Fields

| Field           |      Type | Required | Description                                      |
| --------------- | --------: | -------: | ------------------------------------------------ |
| `questionId`    |    string |      yes | Question ID                                      |
| `answer`        |    string |      yes | `yes`, `no`, `not_important`                     |
| `isFilter`      |   boolean |      yes | `true` for `yes/no`, `false` for `not_important` |
| `answeredAt`    | timestamp |      yes | Time of answer                                   |
| `questionOrder` |    number |       no | Order in question flow                           |

---

### Important Rule

```text
answer = yes             → isFilter = true
answer = no              → isFilter = true
answer = not_important   → isFilter = false
```

`not_important` must never be added to the user’s matching path.

---

## 5. questions

### Path

```text
questions/{questionId}
```

### Purpose

Stores all standard questions shown in the app.

All MVP questions use the same answer options:

```text
yes
no
not_important
```

The options do not need to be stored per question unless custom labels are needed later.

---

### Example Document

```json
{
  "id": "q001",
  "text": "You can make society safer, but everyone loses privacy. Do you agree?",
  "shortText": "Safety at the cost of privacy?",
  "status": "active",

  "type": "universal",
  "locale": "en",
  "country": null,

  "order": 1,
  "version": 1,

  "createdAt": "2026-01-01T10:00:00Z",
  "updatedAt": "2026-01-01T10:00:00Z",

  "createdBy": "admin_user_id",

  "stats": {
    "totalAnswers": 13000,
    "yesCount": 4200,
    "noCount": 8100,
    "notImportantCount": 700
  }
}
```

---

### Fields

| Field       |        Type | Required | Description                               |
| ----------- | ----------: | -------: | ----------------------------------------- |
| `id`        |      string |      yes | Question ID                               |
| `text`      |      string |      yes | Full question text                        |
| `shortText` |      string |       no | Optional shortened version                |
| `status`    |      string |      yes | `active`, `draft`, `disabled`, `archived` |
| `type`      |      string |      yes | `universal`, `social`, `local`, `custom`  |
| `locale`    |      string |      yes | Language code                             |
| `country`   | string/null |       no | Optional country code for local questions |
| `order`     |      number |      yes | Default order in question flow            |
| `version`   |      number |      yes | Question version                          |
| `createdAt` |   timestamp |      yes | Creation time                             |
| `updatedAt` |   timestamp |      yes | Last update                               |
| `createdBy` |      string |       no | Admin or user ID                          |
| `stats`     |      object |       no | Aggregate answer stats                    |

---

### Allowed `status` Values

```text
draft
active
disabled
archived
moderation
rejected
```

---

### Allowed `type` Values

```text
universal
social
local
custom
```

---

## 6. questionStats

### Path

```text
questionStats/{questionId}
```

### Purpose

Stores aggregate answer counts for each question.

This can be separated from `questions` to avoid frequent writes to the question document itself.

Recommended for MVP if question answer counts update often.

---

### Example Document

```json
{
  "questionId": "q001",
  "totalAnswers": 13000,
  "yesCount": 4200,
  "noCount": 8100,
  "notImportantCount": 700,
  "updatedAt": "2026-01-01T12:20:00Z"
}
```

---

### Fields

| Field               |      Type | Required | Description                       |
| ------------------- | --------: | -------: | --------------------------------- |
| `questionId`        |    string |      yes | Question ID                       |
| `totalAnswers`      |    number |      yes | All answers                       |
| `yesCount`          |    number |      yes | Number of `yes` answers           |
| `noCount`           |    number |      yes | Number of `no` answers            |
| `notImportantCount` |    number |      yes | Number of `not_important` answers |
| `updatedAt`         | timestamp |      yes | Last update time                  |

---

## 7. answerIndexes

### Path

```text
answerIndexes/{questionId_answer}/users/{userId}
```

Examples:

```text
answerIndexes/q001_yes/users/user_abc123
answerIndexes/q003_no/users/user_abc123
```

### Purpose

Supports circle count calculation.

Each filtering answer creates an index entry.

Only `yes` and `no` answers are indexed.

`not_important` answers must not be added to `answerIndexes`.

---

### Example Document

```json
{
  "userId": "user_abc123",
  "questionId": "q001",
  "answer": "yes",
  "createdAt": "2026-01-01T12:01:00Z"
}
```

---

### Fields

| Field        |      Type | Required | Description         |
| ------------ | --------: | -------: | ------------------- |
| `userId`     |    string |      yes | User ID             |
| `questionId` |    string |      yes | Question ID         |
| `answer`     |    string |      yes | Only `yes` or `no`  |
| `createdAt`  | timestamp |      yes | Index creation time |

---

### Index ID Format

```text
{questionId}_{answer}
```

Examples:

```text
q001_yes
q001_no
q003_yes
q003_no
```

Do not create:

```text
q001_not_important
```

---

### Important Rule

If user answers:

```text
q001 = not_important
```

Then no document should exist at:

```text
answerIndexes/q001_not_important/users/{userId}
```

and no document should be created under:

```text
answerIndexes/q001_yes/users/{userId}
answerIndexes/q001_no/users/{userId}
```

---

## 8. userFilterAnswers

### Path

```text
userFilterAnswers/{userId}
```

### Purpose

Stores compact filtering answers for fast matching.

This is a denormalized summary of the user’s `yes/no` answers only.

It excludes `not_important`.

---

### Example Document

```json
{
  "userId": "user_abc123",
  "filters": {
    "q001": "yes",
    "q003": "no",
    "q004": "yes",
    "q007": "no"
  },
  "filterCount": 4,
  "pathKey": "q001:yes|q003:no|q004:yes|q007:no",
  "pathHash": "sha256_hash_here",
  "updatedAt": "2026-01-01T12:20:00Z"
}
```

---

### Fields

| Field         |      Type | Required | Description                                |
| ------------- | --------: | -------: | ------------------------------------------ |
| `userId`      |    string |      yes | User ID                                    |
| `filters`     |       map |      yes | `{ questionId: answer }` for `yes/no` only |
| `filterCount` |    number |      yes | Number of filters                          |
| `pathKey`     |    string |      yes | Deterministic path key                     |
| `pathHash`    |    string |      yes | Hash of path key                           |
| `updatedAt`   | timestamp |      yes | Last update                                |

---

### Why This Exists

Reading all answers from:

```text
users/{userId}/answers
```

can become inefficient.

`userFilterAnswers/{userId}` provides a compact matching representation.

---

## 9. circleCalculations

### Path

```text
circleCalculations/{calculationId}
```

### Purpose

Stores circle calculation results for debugging, analytics, and possibly async UI updates.

This is optional for MVP but useful during development.

---

### Example Document

```json
{
  "calculationId": "calc_abc123",
  "userId": "user_abc123",

  "pathKey": "q001:yes|q003:no|q004:yes",
  "pathHash": "sha256_hash_here",
  "filterCount": 3,

  "circleCount": 420,
  "circleState": "getting_closer",

  "status": "completed",
  "startedAt": "2026-01-01T12:20:01Z",
  "completedAt": "2026-01-01T12:20:02Z",

  "durationMs": 850,
  "strategy": "simple_scan"
}
```

---

### Fields

| Field           |      Type | Required | Description                      |
| --------------- | --------: | -------: | -------------------------------- |
| `calculationId` |    string |      yes | Unique calculation ID            |
| `userId`        |    string |      yes | User ID                          |
| `pathKey`       |    string |      yes | Matching path key                |
| `pathHash`      |    string |      yes | Path hash                        |
| `filterCount`   |    number |      yes | Number of filtering answers      |
| `circleCount`   |    number |      yes | Result count                     |
| `circleState`   |    string |      yes | Result state                     |
| `status`        |    string |      yes | `pending`, `completed`, `failed` |
| `startedAt`     | timestamp |      yes | Start time                       |
| `completedAt`   | timestamp |       no | Completion time                  |
| `durationMs`    |    number |       no | Calculation duration             |
| `strategy`      |    string |       no | Calculation strategy             |

---

## 10. answerPathCounters

### Path

```text
answerPathCounters/{pathHash}
```

### Purpose

Stores exact path counts.

Important: exact path count is not the same as directional circle count.

Exact path count counts users with exactly the same filter path.

Directional circle count counts users who satisfy all of the current user’s filters, even if they have additional filters.

This collection is optional and should not be treated as the main source of truth for circle count unless the product explicitly wants exact-path matching.

---

### Example Document

```json
{
  "pathHash": "sha256_hash_here",
  "pathKey": "q001:yes|q003:no|q004:yes",
  "exactCount": 126,
  "updatedAt": "2026-01-01T12:20:00Z"
}
```

---

### Fields

| Field        |      Type | Required | Description                     |
| ------------ | --------: | -------: | ------------------------------- |
| `pathHash`   |    string |      yes | Hash of exact path              |
| `pathKey`    |    string |      yes | Human-readable exact path       |
| `exactCount` |    number |      yes | Number of users with exact path |
| `updatedAt`  | timestamp |      yes | Last update                     |

---

### Warning

Do not use `exactCount` as the main MVP circle count if the intended behavior is:

```text
people who match my important answers
```

Because users with extra filtering answers should still be counted if they satisfy my filters.

---

## 11. remoteConfigMirror

### Path

```text
remoteConfigMirror/app
```

### Purpose

Optional Firestore mirror of important Remote Config values for debugging and admin visibility.

Remote Config itself remains the source of truth for client configuration.

---

### Example Document

```json
{
  "targetCircleMin": 50,
  "targetCircleMax": 150,

  "tooBroadAbove": 1000,
  "gettingCloserMax": 1000,
  "rarePathBelow": 50,

  "savePromptAfterAnswers": 7,
  "savePromptAfterFilters": 4,

  "firstQuestionId": "q001",

  "updatedAt": "2026-01-01T10:00:00Z"
}
```

---

## 12. contactRequests

Later-version collection.

### Path

```text
contactRequests/{requestId}
```

### Purpose

Stores contact requests between users.

Not required for MVP core loop.

---

### Example Document

```json
{
  "requestId": "req_abc123",
  "fromUserId": "user_a",
  "toUserId": "user_b",

  "status": "pending",

  "createdAt": "2026-01-01T13:00:00Z",
  "updatedAt": "2026-01-01T13:00:00Z",

  "matchType": "directional",
  "circleCountAtRequest": 126,

  "message": null
}
```

---

### Allowed `status` Values

```text
pending
accepted
declined
cancelled
blocked
```

---

## 13. groups

Later-version collection.

### Path

```text
groups/{groupId}
```

### Purpose

Stores small groups formed from users’ circles.

Not required for MVP core loop.

---

### Example Document

```json
{
  "groupId": "group_abc123",
  "createdBy": "user_abc123",

  "status": "forming",
  "targetSize": 5,
  "memberCount": 3,

  "title": "Small group from your circle",
  "description": null,

  "createdAt": "2026-01-01T14:00:00Z",
  "updatedAt": "2026-01-01T14:20:00Z"
}
```

---

### Subcollection

```text
groups/{groupId}/members/{userId}
```

Example:

```json
{
  "userId": "user_abc123",
  "role": "creator",
  "status": "joined",
  "joinedAt": "2026-01-01T14:00:00Z"
}
```

---

## 14. actions

Later-version collection.

### Path

```text
actions/{actionId}
```

### Purpose

Stores offline actions.

Not required for MVP core loop.

---

### Example Document

```json
{
  "actionId": "action_abc123",
  "createdBy": "user_abc123",

  "title": "First small group meeting",
  "description": "A 60-minute meeting for people from the same circle.",

  "status": "active",
  "visibility": "circle_only",

  "startsAt": "2026-01-10T18:00:00Z",

  "approxLocation": {
    "country": "UA",
    "city": "Kyiv",
    "area": "Center"
  },

  "capacity": 7,
  "participantCount": 3,

  "createdAt": "2026-01-01T15:00:00Z",
  "updatedAt": "2026-01-01T15:00:00Z"
}
```

---

### Subcollection

```text
actions/{actionId}/participants/{userId}
```

Example:

```json
{
  "userId": "user_abc123",
  "status": "requested",
  "requestedAt": "2026-01-01T15:10:00Z",
  "approvedAt": null
}
```

---

## 15. reports

### Path

```text
reports/{reportId}
```

### Purpose

Stores user reports for moderation.

May not be needed in first core-loop-only prototype, but should be added before people/contact features.

---

### Example Document

```json
{
  "reportId": "report_abc123",
  "reporterId": "user_a",

  "targetType": "user",
  "targetId": "user_b",

  "reason": "abuse",
  "details": "User sent abusive message.",

  "status": "open",

  "createdAt": "2026-01-01T16:00:00Z",
  "updatedAt": "2026-01-01T16:00:00Z"
}
```

---

### Allowed `targetType` Values

```text
user
question
custom_question
message
group
action
```

### Allowed `status` Values

```text
open
reviewing
resolved
rejected
```

---

## 16. adminUsers

### Path

```text
adminUsers/{userId}
```

### Purpose

Stores admin permissions.

This is useful if a lightweight admin panel is added later.

---

### Example Document

```json
{
  "userId": "user_admin123",
  "role": "admin",
  "permissions": {
    "manageQuestions": true,
    "reviewReports": true,
    "manageUsers": true
  },
  "createdAt": "2026-01-01T10:00:00Z"
}
```

---

### Allowed `role` Values

```text
admin
moderator
content_editor
```

---

## 17. Data Ownership Rules

### Client Can Write

The client may write:

```text
users/{ownUserId}
users/{ownUserId}/answers/{questionId}
reports/{reportId}
```

With restrictions.

The client should not directly write global counters or indexes.

---

### Cloud Functions Should Write

Cloud Functions should write:

```text
answerIndexes
userFilterAnswers
circleCalculations
questionStats
answerPathCounters
users/{userId}.currentCircleCount
users/{userId}.circleState
```

Reason:

These are derived or shared data.

They should not be trusted from the client.

---

### Admin Can Write

Admins may write:

```text
questions
adminUsers
moderation fields
```

Only through verified admin privileges.

---

## 18. Answer Write Flow

When a user answers a question:

### Step 1 — Client writes answer

Path:

```text
users/{userId}/answers/{questionId}
```

Example:

```json
{
  "questionId": "q001",
  "answer": "yes",
  "isFilter": true,
  "answeredAt": "serverTimestamp",
  "questionOrder": 1
}
```

---

### Step 2 — Cloud Function triggers

Trigger:

```text
onWrite users/{userId}/answers/{questionId}
```

The function should:

1. Validate answer.
2. Update question stats.
3. Update answer index if answer is `yes` or `no`.
4. Remove answer index if answer changed to `not_important`.
5. Rebuild user filter answers.
6. Recalculate circle count.
7. Update user document with:

   * `answerCount`
   * `filterAnswerCount`
   * `currentPathKey`
   * `currentPathHash`
   * `currentCircleCount`
   * `circleState`
   * `updatedAt`

---

## 19. Matching Path Generation

Matching path is generated from `userFilterAnswers`.

Rules:

1. Include only `yes` and `no`.
2. Exclude `not_important`.
3. Exclude unanswered questions.
4. Sort deterministically.
5. Generate `pathKey`.
6. Generate `pathHash`.

Example:

```json
{
  "q001": "yes",
  "q003": "no",
  "q004": "yes"
}
```

Path key:

```text
q001:yes|q003:no|q004:yes
```

---

## 20. Circle Count Calculation

### MVP Recommendation

For the first MVP, prioritize correctness over scale.

The correct conceptual count is:

```text
all active users who satisfy every filter in current user's matching path
```

This is **directional matching**.

If current user’s path is:

```text
q001:yes|q003:no
```

Candidate matches if:

```text
candidate.q001 == yes
AND candidate.q003 == no
```

Candidate may have additional filters.

That is allowed.

---

### Candidate Does Not Match If

Candidate does not match if:

* they answered differently on a filtering question;
* they did not answer a filtering question;
* they are banned;
* they are deleted;
* they are the current user.

---

## 21. Circle State Calculation

Suggested thresholds:

```text
0 users       → no_matches
1–49 users    → rare_path
50–150 users  → circle_found
151–1000      → getting_closer
1001+         → too_broad
```

These should be configurable.

Do not hardcode permanently.

---

## 22. Firestore Security Rules — Conceptual

This is not final code, but the intended access model.

### Users

A user can read/write their own user document.

A user cannot read/write another user’s private document.

### Answers

A user can read/write their own answers.

A user cannot read another user’s answers directly.

### Questions

All users can read active questions.

Only admins can create/update questions.

### Indexes and Counters

Users cannot write:

```text
answerIndexes
questionStats
answerPathCounters
circleCalculations
```

These are written by Cloud Functions.

### Reports

Users can create reports.

Admins can read and update reports.

---

## 23. Suggested Firestore Indexes

Firestore indexes depend on final query strategy.

Likely useful fields:

### questions

```text
status ASC, locale ASC, order ASC
status ASC, type ASC, order ASC
```

### users

```text
isBanned ASC, isDeleted ASC, lastActiveAt DESC
circleState ASC, updatedAt DESC
```

### actions later

```text
status ASC, startsAt ASC
status ASC, visibility ASC, startsAt ASC
approxLocation.city ASC, startsAt ASC
```

---

## 24. MVP Minimum Schema

If the first build must be extremely small, use only these:

```text
users
users/{userId}/answers
questions
userFilterAnswers
answerIndexes
```

Minimum user document:

```json
{
  "uid": "user_abc123",
  "authType": "anonymous",
  "createdAt": "timestamp",
  "lastActiveAt": "timestamp",
  "answerCount": 0,
  "filterAnswerCount": 0,
  "currentCircleCount": null,
  "circleState": "unknown",
  "saved": false,
  "isBanned": false,
  "isDeleted": false
}
```

Minimum question document:

```json
{
  "id": "q001",
  "text": "You can make society safer, but everyone loses privacy. Do you agree?",
  "status": "active",
  "order": 1,
  "locale": "en"
}
```

Minimum answer document:

```json
{
  "questionId": "q001",
  "answer": "yes",
  "isFilter": true,
  "answeredAt": "timestamp"
}
```

---

## 25. Common Data Model Mistakes to Avoid

### Mistake 1 — Creating `not_important` indexes

Wrong:

```text
answerIndexes/q001_not_important/users/{userId}
```

Correct:

```text
No index for not_important
```

---

### Mistake 2 — Counting exact path as circle count

Wrong:

```text
Only users with exactly the same path are counted.
```

Correct:

```text
Users who satisfy all current user's filters are counted, even if they have extra filters.
```

---

### Mistake 3 — Letting client update global counters

Wrong:

```text
Client increments questionStats or answerIndexes directly.
```

Correct:

```text
Cloud Functions update derived/shared data.
```

---

### Mistake 4 — Exposing private answers publicly

Wrong:

```text
Any user can read users/{otherUserId}/answers.
```

Correct:

```text
Users can read only their own answers.
Public matching uses aggregate counts or approved interaction flows.
```

---

### Mistake 5 — Storing fake or estimated counts as real

Wrong:

```text
currentCircleCount includes simulated users.
```

Correct:

```text
currentCircleCount reflects real users in the current network.
```

---

## 26. Future Extensions

The schema should later support:

* approximate location;
* nearby people;
* mutual matching;
* contact requests;
* chats;
* small groups;
* offline actions;
* user-created questions;
* moderation workflow;
* trust signals after offline participation.

Do not add all future collections to MVP unless needed.

The first priority is validating:

```text
Question → Answer → Circle narrows
```

---

## 27. Final Summary

The Firestore schema should support one core idea:

```text
A user's circle is built only from their Yes/No answers.
Not important means no filter.
```

The most important collections for MVP are:

```text
users
users/{userId}/answers
questions
userFilterAnswers
answerIndexes
```

Derived data such as circle counts, indexes, and stats should be written by Cloud Functions, not by the client.

The schema should remain simple enough for fast MVP development, but structured enough to support people, groups, and offline actions later.
