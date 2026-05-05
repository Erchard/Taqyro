# Taqyro — Matching Logic Specification

### 1. Purpose

This document defines the matching logic for **Taqyro**.

The goal is to make the core rule precise enough for implementation, testing, and future development.

Taqyro does not match people by profiles, personality types, interests, or inferred traits.

Taqyro matches people by **the same answers to the questions that the user made important**.

---

### 2. Core Rule

Every question has three possible answers:

```text
Yes
No
Not important
```

The matching rule is:

```text
Yes = filter by Yes
No = filter by No
Not important = no filter
```

Meaning:

* If I answer **Yes**, people in my circle must also have answered **Yes** to this question.
* If I answer **No**, people in my circle must also have answered **No** to this question.
* If I answer **Not important**, this question is ignored completely for my matching.

`Not important` is not a third matching value.

It means:

> This question does not matter to me as a criterion for my circle.

---

### 3. Definitions

### 3.1 Question

A question is an item shown to the user.

Example:

```text
Would you accept total surveillance if it made society much safer?
```

Each question has a unique ID.

Example:

```text
q_privacy_001
```

---

### 3.2 Answer

An answer is the user’s response to a question.

Allowed values:

```text
yes
no
not_important
```

---

### 3.3 Filtering Answer

A filtering answer is an answer that participates in matching.

Filtering answers:

```text
yes
no
```

Non-filtering answer:

```text
not_important
```

---

### 3.4 Matching Path

A matching path is the set of filtering answers selected by the user.

It includes only questions where the user answered:

```text
yes
no
```

It excludes:

```text
not_important
unanswered questions
```

Example full answer history:

```text
Q1 = yes
Q2 = not_important
Q3 = no
Q4 = not_important
Q5 = yes
```

Matching path:

```text
Q1:yes
Q3:no
Q5:yes
```

---

### 3.5 Circle

A user’s circle is the set of users who satisfy the current user’s matching path.

A person belongs to my circle if they match every filtering answer in my matching path.

---

### 3.6 Circle Count

Circle count is the number of users in the current user’s circle.

Example:

```text
Your circle: 126 people
```

---

### 4. Important Principle: Matching Is Based on My Filters

A user’s circle is defined by that user’s filtering answers.

If I marked a question as `not_important`, it does not matter how another user answered that question.

They may have answered:

```text
yes
no
not_important
not answered
```

All are acceptable for that question, because the question is not part of my matching path.

---

### 5. Directional Matching

Matching is directional by default.

This means:

> User B can be in User A’s circle if B satisfies A’s filters.

But User A is not necessarily in User B’s circle.

Why?

Because User B may have additional filtering answers that User A has not answered or does not match.

---

### 6. Mutual Matching

A mutual match exists when both users satisfy each other’s filters.

User A and User B are mutual matches if:

```text
B satisfies A’s matching path
AND
A satisfies B’s matching path
```

This is stricter than directional matching.

---

### 7. MVP Matching Mode

For the MVP, use **directional circle count** for the question flow.

Reason:

During the answering flow, the user wants to know:

> How many people match my important answers so far?

This should be based on the current user’s filtering answers only.

Later features like contact requests, nearby people, and small groups may use mutual matching.

---

## 8. Matching Examples

### Example 1 — Simple Match

User A:

```text
Q1 = yes
Q2 = no
```

User B:

```text
Q1 = yes
Q2 = no
```

Result:

```text
B is in A’s circle.
```

Because B matches all of A’s filtering answers.

---

### Example 2 — Different Answer

User A:

```text
Q1 = yes
Q2 = no
```

User B:

```text
Q1 = yes
Q2 = yes
```

Result:

```text
B is not in A’s circle.
```

Because Q2 does not match.

---

### Example 3 — User A Says Not Important

User A:

```text
Q1 = yes
Q2 = not_important
Q3 = no
```

A’s matching path:

```text
Q1:yes
Q3:no
```

User B:

```text
Q1 = yes
Q2 = yes
Q3 = no
```

Result:

```text
B is in A’s circle.
```

Q2 does not matter for A.

---

### Example 4 — User A Says Not Important, User B Did Not Answer

User A:

```text
Q1 = yes
Q2 = not_important
Q3 = no
```

A’s matching path:

```text
Q1:yes
Q3:no
```

User B:

```text
Q1 = yes
Q3 = no
```

User B has no answer for Q2.

Result:

```text
B is in A’s circle.
```

Q2 is ignored completely for A.

---

### Example 5 — User A Filters, User B Did Not Answer

User A:

```text
Q1 = yes
Q2 = no
```

A’s matching path:

```text
Q1:yes
Q2:no
```

User B:

```text
Q1 = yes
```

User B has no answer for Q2.

Result:

```text
B is not in A’s circle.
```

Because A made Q2 important and B does not satisfy that filter.

---

### Example 6 — Directional Match but Not Mutual Match

User A:

```text
Q1 = yes
```

A’s matching path:

```text
Q1:yes
```

User B:

```text
Q1 = yes
Q2 = no
```

B’s matching path:

```text
Q1:yes
Q2:no
```

Directional result:

```text
B is in A’s circle.
```

Because B matches A’s only filter.

But:

```text
A is not in B’s circle.
```

Because A has not answered Q2 and does not satisfy B’s Q2 filter.

Mutual result:

```text
A and B are not mutual matches yet.
```

---

### Example 7 — Mutual Match

User A:

```text
Q1 = yes
Q2 = no
```

User B:

```text
Q1 = yes
Q2 = no
Q3 = not_important
```

A’s matching path:

```text
Q1:yes
Q2:no
```

B’s matching path:

```text
Q1:yes
Q2:no
```

Result:

```text
A and B are mutual matches.
```

B’s Q3 is ignored because B marked it `not_important`.

---

## 9. Matching Path Generation

### 9.1 Input

The input is the user’s answer history.

Example:

```json
[
  { "questionId": "q001", "answer": "yes" },
  { "questionId": "q002", "answer": "not_important" },
  { "questionId": "q003", "answer": "no" },
  { "questionId": "q004", "answer": "yes" }
]
```

---

### 9.2 Output

The output is a matching path containing only filtering answers.

```json
[
  { "questionId": "q001", "answer": "yes" },
  { "questionId": "q003", "answer": "no" },
  { "questionId": "q004", "answer": "yes" }
]
```

---

### 9.3 Path Key

The path key is a deterministic string representation of the matching path.

Example:

```text
q001:yes|q003:no|q004:yes
```

This key can be hashed for storage.

Example:

```text
sha256("q001:yes|q003:no|q004:yes")
```

---

### 9.4 Ordering Rule

The path key must be deterministic.

Preferred rule:

```text
Sort by question order if all users receive the same question sequence.
```

Alternative rule:

```text
Sort by questionId lexicographically.
```

For MVP, if the first question flow has a fixed global sequence, sorting by question order is acceptable.

If question order can vary between users, sort by `questionId` to avoid different keys for the same logical path.

---

### 9.5 Empty Path

If the user has no filtering answers yet, the matching path is empty.

This happens when:

* the user has not answered any question;
* the user answered only `not_important`.

For an empty path, the circle count should represent the broadest available audience.

Possible definition for MVP:

```text
circleCount = total active users with answer activity
```

or:

```text
circleCount = total active users in the current network
```

This must be consistent across the product.

---

## 10. Circle Count Calculation

### 10.1 Conceptual Rule

Circle count is:

```text
number of users who match every filtering answer in the current user’s matching path
```

Example:

Current user path:

```text
q001:yes|q003:no|q004:yes
```

Circle count is the number of users where:

```text
q001 = yes
AND q003 = no
AND q004 = yes
```

---

### 10.2 Not Important Is Ignored

If current user answered:

```text
q002 = not_important
```

Then q002 is not part of the query.

Do not filter by:

```text
q002 = not_important
```

Do not require:

```text
q002 exists
```

Do not require:

```text
q002 answered by other user
```

---

### 10.3 Unanswered Questions

Unanswered questions are not part of the current user’s matching path.

If a question is not in the path, it does not affect matching.

However, if a question is in the current user’s path, another user must have a matching answer to satisfy it.

Example:

Current user path:

```text
q001:yes
```

Other user:

```text
no answer for q001
```

Result:

```text
Other user does not match.
```

---

### 10.4 Excluding Self

For user-facing circle count, exclude the current user.

Example:

If 127 users including the current user satisfy the path, show:

```text
126 people
```

This prevents the user from being counted inside their own circle.

Implementation may store raw counts including all users, then subtract 1 if the current user satisfies the path.

---

### 10.5 Active Users Only

For MVP, circle count should ideally count active users only.

Suggested definition of active:

```text
user has answered at least one question
AND user is not banned
```

Later, active may also include:

```text
lastActiveAt within N days
```

For MVP, keep it simple.

---

## 11. Data Model Requirements

### 11.1 User Answer Document

Suggested Firestore path:

```text
users/{userId}/answers/{questionId}
```

Document:

```json
{
  "questionId": "q001",
  "answer": "yes",
  "isFilter": true,
  "answeredAt": "timestamp"
}
```

For `not_important`:

```json
{
  "questionId": "q002",
  "answer": "not_important",
  "isFilter": false,
  "answeredAt": "timestamp"
}
```

---

### 11.2 User Matching State

Suggested Firestore path:

```text
users/{userId}
```

Fields:

```json
{
  "answerCount": 4,
  "filterAnswerCount": 3,
  "currentPathKey": "q001:yes|q003:no|q004:yes",
  "currentPathHash": "hash",
  "currentCircleCount": 126,
  "circleState": "circle_found",
  "updatedAt": "timestamp"
}
```

---

### 11.3 Answer Path Counter

Suggested Firestore path:

```text
answerPaths/{pathHash}
```

Document:

```json
{
  "pathKey": "q001:yes|q003:no|q004:yes",
  "count": 126,
  "updatedAt": "timestamp"
}
```

This document stores the number of users with exactly this same path.

Important:

This exact-path count is not always enough for circle count if users may have additional filtering answers.

See section 12.

---

## 12. Exact Path Count vs Superset Matching

This is a critical distinction.

### 12.1 Exact Path Count

Exact path count means:

> Count users whose matching path is exactly the same as mine.

Example:

User A path:

```text
q001:yes|q003:no
```

User B path:

```text
q001:yes|q003:no
```

B is counted.

User C path:

```text
q001:yes|q003:no|q007:yes
```

C is not counted in exact path count.

Because C has an additional filtering answer.

---

### 12.2 Superset Matching

Superset matching means:

> Count users who satisfy all of my filters, even if they have additional filters of their own.

Example:

User A path:

```text
q001:yes|q003:no
```

User C path:

```text
q001:yes|q003:no|q007:yes
```

C is counted in A’s directional circle.

Because C satisfies A’s filters.

---

### 12.3 Which One Should MVP Use?

The product language says:

> people who answered the same way on the questions that matter to me

This implies **superset matching**, not exact path matching.

Therefore, for circle count, MVP should prefer:

```text
superset matching
```

Meaning:

A person is in my circle if they match all my filtering answers, regardless of whether they answered additional filtering questions.

---

### 12.4 Why Exact Path Alone Is Wrong

If the app uses exact path only, then answering more questions can exclude users who already match the user’s important answers but have answered extra questions.

This would make counts misleading.

Example:

User A has answered 3 filtering questions.

User B answered the same 3 filtering questions and also 10 more.

B should still be in A’s circle if B matches A’s 3 important answers.

Therefore exact path count is not enough for directional circle count.

---

### 12.5 How to Use Exact Path Counters Anyway

Exact path counters can still be useful for optimization, analytics, or early prototypes.

But the conceptual circle count should be based on:

```text
all users who satisfy current user’s filters
```

not only users with the exact same path.

---

## 13. Implementation Strategies for Circle Count

Firestore does not support arbitrary complex intersection queries easily at large scale.

There are several possible strategies.

---

### 13.1 Strategy A — Simple Scan for Small MVP

For early internal MVP with small user base:

1. Store each user’s filter answers.
2. On Cloud Function, query or scan candidate users.
3. Count users who satisfy current user’s matching path.

This is simplest but does not scale well.

Good for:

```text
internal prototype
small beta
early validation
```

Bad for:

```text
large public launch
many users
many questions
```

---

### 13.2 Strategy B — Inverted Index

Create an inverted index for each filtering answer.

Example:

```text
answerIndex/q001_yes/users/{userId}
answerIndex/q003_no/users/{userId}
```

To calculate circle count for path:

```text
q001:yes
q003:no
q004:yes
```

Intersect user sets:

```text
answerIndex/q001_yes
∩ answerIndex/q003_no
∩ answerIndex/q004_yes
```

Good for correctness.

Needs careful implementation for performance.

---

### 13.3 Strategy C — Precomputed Prefix Counts

If all users answer the same fixed question sequence in the same order, counts can be precomputed by prefix path.

Example:

```text
q001:yes
q001:yes|q002:no
q001:yes|q002:no|q003:yes
```

This is very fast, but only works well if:

* questions are shown in the same order;
* users do not skip filtering questions except `not_important`;
* product accepts prefix-like behavior.

But because `not_important` removes questions from the path, prefix count can become less straightforward.

---

### 13.4 Strategy D — Hybrid MVP Approach

Recommended MVP approach:

Start with simple correctness over scale.

Use:

* user answer documents;
* user matching state;
* Cloud Function to compute circle count;
* basic indexes if needed;
* optimize later after validation.

For the first MVP, correctness of the core rule is more important than large-scale performance.

---

## 14. Recommended MVP Algorithm

### 14.1 Store Every Answer

When user answers a question:

1. Save answer in `users/{userId}/answers/{questionId}`.
2. Mark `isFilter = true` for yes/no.
3. Mark `isFilter = false` for not_important.

---

### 14.2 Build Current Matching Path

Fetch or maintain user’s filtering answers.

Pseudo-code:

```ts
function buildMatchingPath(answers: UserAnswer[]): MatchingPathItem[] {
  return answers
    .filter(answer => answer.answer === "yes" || answer.answer === "no")
    .map(answer => ({
      questionId: answer.questionId,
      answer: answer.answer
    }))
    .sort((a, b) => a.questionId.localeCompare(b.questionId));
}
```

---

### 14.3 Check Whether Candidate Matches Path

Pseudo-code:

```ts
function candidateMatchesPath(
  candidateAnswers: Record<string, "yes" | "no" | "not_important">,
  path: MatchingPathItem[]
): boolean {
  for (const item of path) {
    if (candidateAnswers[item.questionId] !== item.answer) {
      return false;
    }
  }

  return true;
}
```

Important:

If candidate did not answer a question from the path, then:

```text
candidateAnswers[item.questionId] === undefined
```

This does not match.

---

### 14.4 Calculate Directional Circle Count

Pseudo-code:

```ts
function calculateCircleCount(
  currentUserId: string,
  currentUserPath: MatchingPathItem[],
  candidates: CandidateUser[]
): number {
  return candidates.filter(candidate => {
    if (candidate.userId === currentUserId) return false;
    if (candidate.isBanned) return false;

    return candidateMatchesPath(candidate.answers, currentUserPath);
  }).length;
}
```

---

### 14.5 Determine Circle State

Pseudo-code:

```ts
function getCircleState(circleCount: number): CircleState {
  if (circleCount === 0) return "no_matches";
  if (circleCount < 50) return "rare_path";
  if (circleCount <= 150) return "circle_found";
  if (circleCount <= 1000) return "getting_closer";
  return "too_broad";
}
```

Thresholds should come from Remote Config or server config.

---

## 15. Handling Answer Changes

Editing answers may be deferred from MVP.

If answer editing is supported later, then:

1. Update answer document.
2. Rebuild matching path.
3. Recalculate circle count.
4. Update user matching state.
5. Update any relevant indexes/counters.
6. Recalculate affected user visibility if necessary.

Changing from `yes` to `not_important` removes that question from the path.

Changing from `not_important` to `yes` or `no` adds it to the path.

---

## 16. Handling Question Order

### 16.1 Fixed Order

For MVP, fixed global question order is recommended.

Benefits:

* simpler UX;
* simpler analytics;
* easier debugging;
* easier comparison;
* easier content testing.

---

### 16.2 Variable Order

If question order varies:

* path key must not depend on display order;
* sort by questionId;
* circle count logic still works;
* analytics must track question sequence variant.

---

## 17. Handling Custom Questions

Custom questions should follow the same rule:

```text
Yes = filter by Yes
No = filter by No
Not important = no filter
```

However, custom questions introduce a special issue:

Most users will not have answered a specific custom question.

If User A uses custom question Q_custom as a filter:

```text
Q_custom = yes
```

Then only users who answered that custom question `yes` can satisfy that filter.

This may make the circle very small.

This is expected.

Product should communicate:

```text
Custom questions may narrow your circle strongly.
```

For MVP, custom questions may be deferred.

---

## 18. Matching for People Nearby

Later, when showing people nearby, use mutual or semi-mutual matching.

Possible modes:

### 18.1 Directional Nearby

Show people who satisfy my filters.

```text
candidate satisfies my path
```

Pros:

* larger pool;
* simpler.

Cons:

* candidate may have filters I do not satisfy.

---

### 18.2 Mutual Nearby

Show people where both satisfy each other’s filters.

```text
candidate satisfies my path
AND
I satisfy candidate’s path
```

Pros:

* more meaningful;
* safer for contact.

Cons:

* smaller pool;
* requires more answers.

Recommended for contact and small groups:

```text
mutual matching
```

Recommended for early circle count:

```text
directional matching
```

---

## 19. Matching for Contact Requests

A contact request should ideally require at least one of:

```text
directional match
mutual match
same circle state
manual user intent
```

Recommended rule for later versions:

```text
User can request contact only if candidate satisfies current user’s filters.
```

Preferred stronger rule:

```text
User can request contact only if both users satisfy each other’s filters.
```

This can be decided in the people/contact PRD.

---

## 20. Matching for Small Groups

Small groups should use stricter logic than circle count.

Recommended:

```text
mutual compatibility between all or most group members
```

Simple MVP group rule:

A group can be formed from users where:

```text
each member satisfies the creator’s filters
```

Better later rule:

```text
each member satisfies every other member’s required filters
```

This is more complex and should not be in initial MVP unless needed.

---

## 21. Circle Count Text Rules

The UI must describe counts accurately.

### Correct

```text
126 people match your important answers.
```

```text
This question did not affect your circle.
```

```text
Your circle is still broad.
```

### Incorrect

```text
126 people are exactly like you.
```

```text
126 people share all your values.
```

```text
126 people answered everything the same way.
```

```text
You are 87% compatible.
```

The app should be precise:

```text
important answers
```

not:

```text
all answers
```

---

## 22. Zero and Low Count Wording

### Zero

```text
No one in the current network matches this exact set of important answers yet.
```

Avoid:

```text
No one is like you.
```

### Low Count

```text
Your path is rare in the current network.
```

Avoid:

```text
You are alone.
```

---

## 23. Privacy Rules for Matching

During the question flow, users should see only aggregate counts.

Do not show:

* who matched;
* exact answer histories;
* personal information;
* location;
* profiles.

The first flow is about the circle count, not identity exposure.

People are shown only after the user reaches the next stage and appropriate privacy rules exist.

---

## 24. Analytics Requirements

Track matching-related events:

```text
answer_saved
matching_path_updated
circle_count_requested
circle_count_updated
circle_state_changed
circle_found
rare_path_reached
no_matches_reached
```

Suggested properties:

```json
{
  "questionId": "q001",
  "answer": "yes",
  "isFilter": true,
  "answerCount": 5,
  "filterAnswerCount": 3,
  "circleCount": 420,
  "circleState": "getting_closer",
  "pathLength": 3
}
```

Do not log sensitive free-text custom question content into analytics unless explicitly needed and privacy-reviewed.

---

## 25. Test Cases

### 25.1 Not Important Does Not Filter

Input:

```text
User A:
Q1 = yes
Q2 = not_important

User B:
Q1 = yes
Q2 = no
```

Expected:

```text
B matches A.
```

---

### 25.2 Not Important Does Not Require Candidate Answer

Input:

```text
User A:
Q1 = yes
Q2 = not_important

User B:
Q1 = yes
Q2 = unanswered
```

Expected:

```text
B matches A.
```

---

### 25.3 Filtering Question Requires Candidate Answer

Input:

```text
User A:
Q1 = yes
Q2 = no

User B:
Q1 = yes
Q2 = unanswered
```

Expected:

```text
B does not match A.
```

---

### 25.4 Yes Must Match Yes

Input:

```text
User A:
Q1 = yes

User B:
Q1 = no
```

Expected:

```text
B does not match A.
```

---

### 25.5 No Must Match No

Input:

```text
User A:
Q1 = no

User B:
Q1 = no
```

Expected:

```text
B matches A.
```

---

### 25.6 Directional Match

Input:

```text
User A:
Q1 = yes

User B:
Q1 = yes
Q2 = no
```

Expected:

```text
B matches A directionally.
A does not match B directionally until A answers Q2 = no.
```

---

### 25.7 Mutual Match

Input:

```text
User A:
Q1 = yes
Q2 = no

User B:
Q1 = yes
Q2 = no
```

Expected:

```text
A and B are mutual matches.
```

---

### 25.8 Empty Path

Input:

```text
User A:
Q1 = not_important
Q2 = not_important
```

Expected:

```text
A’s matching path is empty.
Circle count equals broad audience count.
```

---

### 25.9 Self Exclusion

Input:

```text
Path count including current user = 10
```

Expected user-facing circle count:

```text
9
```

---

### 25.10 Circle State

Input:

```text
circleCount = 126
```

Expected:

```text
circleState = circle_found
```

---

## 26. Common Mistakes to Avoid

### Mistake 1 — Treating Not Important as a Third Match Value

Wrong:

```text
not_important matches only not_important
```

Correct:

```text
not_important means no filter
```

---

### Mistake 2 — Requiring Other Users to Have Answered Ignored Questions

Wrong:

```text
If I answer Q2 = not_important, only count users who answered Q2.
```

Correct:

```text
If I answer Q2 = not_important, ignore Q2 completely.
```

---

### Mistake 3 — Matching by Exact Full Answer History

Wrong:

```text
All answers must be identical.
```

Correct:

```text
Only my filtering answers must match.
```

---

### Mistake 4 — Using Personality Scores

Wrong:

```text
Compute freedom/security/truth axes.
```

Correct:

```text
Compare direct answers to filtering questions.
```

---

### Mistake 5 — Showing Fake Counts

Wrong:

```text
Generate estimated/fake users to make circle feel bigger.
```

Correct:

```text
Show real counts from the current network.
```

---

## 27. Recommended Initial Implementation Decision

For earliest MVP:

1. Use Firebase Anonymous Auth.
2. Store all user answers.
3. Build matching path from yes/no only.
4. Calculate directional circle count.
5. Use simple Cloud Function calculation.
6. Optimize later after validating the core loop.

Correctness is more important than scalability for the first prototype.

---

## 28. Final Summary

Taqyro matching is based on one simple rule:

```text
Yes = filter by Yes
No = filter by No
Not important = no filter
```

A user’s circle is built only from the questions they made important.

The system must not infer personality traits, calculate hidden ideological scores, or treat `not_important` as a matching answer.

The matching logic must remain transparent:

```text
These people answered the same way as you on your important questions.
```
