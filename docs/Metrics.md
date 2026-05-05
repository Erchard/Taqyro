# Taqyro — Analytics & Success Metrics

### 1. Purpose

This document defines analytics events, funnels, and success metrics for **Taqyro**.

The goal is to measure whether the core product loop works:

```text
Question → Answer → Circle narrows → Continue → Circle found → Save → Next step
```

The MVP should not be judged by vanity metrics such as installs or total screen views alone.

The main question is:

> Do users voluntarily keep answering meaningful questions because they want to see their circle narrow?

---

### 2. Analytics Principles

### 2.1 Measure Behavior, Not Opinions

User feedback is useful, but the MVP must be judged mainly by behavior:

* Did users answer the first question?
* Did they continue?
* Did they understand the loop?
* Did they reach a circle state?
* Did they save?
* Did they choose a next step?

---

### 2.2 Track the Core Loop First

Before tracking people, groups, or offline actions, track the question loop.

The most important early behavior is:

```text
User answers multiple questions in the first session.
```

---

### 2.3 Avoid Over-Tracking Sensitive Data

Taqyro deals with potentially sensitive answers.

Analytics should avoid storing unnecessary personal or sensitive content.

Do not log:

* full answer history as raw text;
* custom question text unless privacy-reviewed;
* exact location;
* private messages;
* personal identity data;
* sensitive free-form explanations.

Use IDs and aggregate properties instead.

---

### 2.4 Events Must Be Actionable

Every tracked event should help answer a product question.

Bad analytics:

```text
button_clicked
screen_viewed
thing_happened
```

Better analytics:

```text
question_answered
circle_found
save_prompt_viewed
account_link_completed
next_step_selected
```

---

## 3. North Star Metric

### Primary MVP North Star

```text
% of users who answer at least 7 questions in their first session
```

Why this matters:

* It measures whether the question loop is engaging.
* It happens before profiles, chat, groups, or actions.
* It validates the core behavior.
* It does not depend on a large network.

Suggested event basis:

```text
first_session_started
question_answered
```

---

### Long-Term North Star

Later, after people/groups/actions exist:

```text
% of users who move from circle found to offline action
```

This may include:

* joining a small group;
* requesting contact;
* joining an offline action;
* creating an offline action;
* attending a confirmed action.

But this is not the main metric for MVP 0.1.

---

## 4. Key Product Questions

Analytics should answer these questions.

### Activation

1. Do users answer the first question?
2. Which first questions perform best?
3. Do users understand what to do without onboarding?

### Engagement

4. How many questions do users answer?
5. How many filtering answers do users give?
6. How often do users choose `Not important`?
7. Where do users drop off?

### Circle Mechanics

8. Does circle narrowing create curiosity?
9. How many users reach `circle_found`?
10. How many reach `rare_path`?
11. How many reach `no_matches`?
12. How many continue after seeing result feedback?

### Save

13. Do users save after receiving value?
14. Does the save prompt appear too early or too late?
15. Which save method converts best?

### Next Step

16. What do users choose after the circle is found?
17. Do users want people, groups, actions, or more questions?
18. Do users invite others?

---

## 5. Core Funnels

### 5.1 First Session Funnel

```text
app_opened
→ anonymous_session_created
→ first_question_viewed
→ first_question_answered
→ question_3_answered
→ question_7_answered
→ circle_state_reached
→ save_prompt_viewed
→ account_link_completed
→ next_step_selected
```

#### Primary Conversion Points

```text
first_question_viewed → first_question_answered
first_question_answered → question_3_answered
question_3_answered → question_7_answered
circle_found → save_prompt_viewed
save_prompt_viewed → account_link_completed
circle_found → next_step_selected
```

---

### 5.2 Question Loop Funnel

```text
question_viewed
→ question_answered
→ answer_result_viewed
→ next_question_requested
→ next_question_viewed
```

This funnel measures whether each question keeps the user moving.

---

### 5.3 Circle Milestone Funnel

```text
question_answered
→ circle_count_updated
→ circle_state_changed
→ circle_found / rare_path / no_matches
→ user_decision_after_state
```

Possible decisions:

```text
continue_narrowing
save_circle
invite_someone
view_next_steps
exit
```

---

### 5.4 Save Funnel

```text
save_prompt_viewed
→ account_link_started
→ account_link_completed
→ saved_user_returned
```

Break down by provider:

```text
apple
google
email
```

---

### 5.5 Next Step Funnel

```text
next_step_viewed
→ next_step_selected
```

Possible selections:

```text
continue_narrowing
invite_someone
see_people
form_group
join_action
create_action
```

In early MVP, some may be placeholders.

---

## 6. Event Naming Rules

Use lowercase snake_case.

Good:

```text
question_answered
circle_found
save_prompt_viewed
```

Bad:

```text
QuestionAnswered
question answered
qa_clicked
```

Event names should describe product behavior, not UI implementation.

Good:

```text
next_step_selected
```

Bad:

```text
blue_button_clicked
```

---

## 7. Required MVP Events

### 7.1 App and Session Events

#### `app_opened`

Triggered when the app opens.

Properties:

```json
{
  "app_version": "0.1.0",
  "platform": "ios",
  "is_first_open": true
}
```

---

#### `anonymous_session_created`

Triggered when Firebase anonymous auth user is created.

Properties:

```json
{
  "user_id": "firebase_uid",
  "auth_type": "anonymous"
}
```

---

#### `session_started`

Triggered when a tracked app session begins.

Properties:

```json
{
  "session_id": "uuid",
  "is_first_session": true
}
```

---

#### `session_ended`

Triggered when the app session ends or becomes inactive.

Properties:

```json
{
  "session_id": "uuid",
  "duration_seconds": 184,
  "questions_answered": 9,
  "filter_answers": 6,
  "last_circle_state": "getting_closer"
}
```

---

## 8. Question Events

### 8.1 `question_viewed`

Triggered when a question is shown to the user.

Properties:

```json
{
  "question_id": "q001",
  "question_order": 1,
  "question_type": "universal",
  "locale": "en",
  "session_answer_index": 0,
  "current_circle_count": null,
  "current_circle_state": "unknown"
}
```

Do not log full question text unless needed for debugging and privacy-approved.

---

### 8.2 `question_answered`

Triggered when the user answers a question.

Properties:

```json
{
  "question_id": "q001",
  "question_order": 1,
  "answer": "yes",
  "is_filter": true,
  "answer_count": 1,
  "filter_answer_count": 1,
  "previous_circle_count": 12000,
  "session_answer_index": 1
}
```

Allowed `answer` values:

```text
yes
no
not_important
```

---

### 8.3 `answer_yes`

Optional convenience event.

Triggered when answer is `yes`.

Properties:

```json
{
  "question_id": "q001",
  "question_order": 1
}
```

---

### 8.4 `answer_no`

Optional convenience event.

Triggered when answer is `no`.

Properties:

```json
{
  "question_id": "q001",
  "question_order": 1
}
```

---

### 8.5 `answer_not_important`

Optional convenience event.

Triggered when answer is `not_important`.

Properties:

```json
{
  "question_id": "q001",
  "question_order": 1
}
```

This is important because high `not_important` rates may show weak or poorly placed questions.

---

## 9. Circle Events

### 9.1 `matching_path_updated`

Triggered when the user’s matching path changes.

This should happen only after `yes` or `no`.

It should not happen after `not_important`, unless the event explicitly shows no path change.

Properties:

```json
{
  "answer_count": 4,
  "filter_answer_count": 3,
  "path_length": 3,
  "path_hash": "sha256_hash"
}
```

Do not log full `path_key` if it becomes sensitive or too detailed.

---

### 9.2 `circle_count_requested`

Triggered when the app requests a new circle count.

Properties:

```json
{
  "filter_answer_count": 3,
  "path_hash": "sha256_hash",
  "strategy": "cloud_function"
}
```

---

### 9.3 `circle_count_updated`

Triggered when circle count is returned.

Properties:

```json
{
  "circle_count": 420,
  "previous_circle_count": 1280,
  "circle_delta": -860,
  "filter_answer_count": 3,
  "circle_state": "getting_closer",
  "calculation_duration_ms": 740
}
```

For `not_important`, `circle_delta` may be `0`.

---

### 9.4 `circle_state_changed`

Triggered when the circle state changes.

Properties:

```json
{
  "previous_circle_state": "too_broad",
  "new_circle_state": "getting_closer",
  "circle_count": 420,
  "filter_answer_count": 3
}
```

---

### 9.5 `circle_found`

Triggered when the user reaches `circle_found`.

Properties:

```json
{
  "circle_count": 126,
  "answer_count": 14,
  "filter_answer_count": 9,
  "session_answer_index": 14
}
```

---

### 9.6 `rare_path_reached`

Triggered when the user reaches `rare_path`.

Properties:

```json
{
  "circle_count": 9,
  "answer_count": 16,
  "filter_answer_count": 13
}
```

---

### 9.7 `no_matches_reached`

Triggered when the user reaches `no_matches`.

Properties:

```json
{
  "circle_count": 0,
  "answer_count": 18,
  "filter_answer_count": 15
}
```

---

## 10. Result Screen Events

### 10.1 `answer_result_viewed`

Triggered when feedback after answer is shown.

Properties:

```json
{
  "question_id": "q001",
  "answer": "yes",
  "is_filter": true,
  "circle_count": 420,
  "circle_state": "getting_closer"
}
```

---

### 10.2 `next_question_requested`

Triggered when user taps to continue.

Properties:

```json
{
  "from_question_id": "q001",
  "answer_count": 1,
  "filter_answer_count": 1,
  "circle_count": 420,
  "circle_state": "getting_closer"
}
```

---

### 10.3 `continue_narrowing_selected`

Triggered when user chooses to keep answering after reaching a milestone.

Properties:

```json
{
  "circle_count": 126,
  "circle_state": "circle_found",
  "filter_answer_count": 9
}
```

---

## 11. Save Events

### 11.1 `save_prompt_viewed`

Triggered when save prompt is shown.

Properties:

```json
{
  "trigger": "circle_found",
  "answer_count": 14,
  "filter_answer_count": 9,
  "circle_count": 126,
  "circle_state": "circle_found"
}
```

Allowed `trigger` values:

```text
circle_found
rare_path
answer_threshold
next_step_attempt
manual_save
```

---

### 11.2 `save_prompt_dismissed`

Triggered when user declines or closes save prompt.

Properties:

```json
{
  "trigger": "circle_found",
  "answer_count": 14,
  "filter_answer_count": 9
}
```

---

### 11.3 `account_link_started`

Triggered when user starts saving with a provider.

Properties:

```json
{
  "provider": "apple",
  "circle_count": 126,
  "circle_state": "circle_found"
}
```

Allowed `provider` values:

```text
apple
google
email
```

---

### 11.4 `account_link_completed`

Triggered when anonymous account is successfully linked.

Properties:

```json
{
  "provider": "apple",
  "answer_count": 14,
  "filter_answer_count": 9,
  "circle_count": 126
}
```

---

### 11.5 `account_link_failed`

Triggered when account linking fails.

Properties:

```json
{
  "provider": "apple",
  "error_code": "auth_error_code"
}
```

Do not log raw error messages if they contain sensitive data.

---

## 12. Next Step Events

### 12.1 `next_step_viewed`

Triggered when the next step screen appears.

Properties:

```json
{
  "circle_count": 126,
  "circle_state": "circle_found",
  "saved": true
}
```

---

### 12.2 `next_step_selected`

Triggered when user selects a next step.

Properties:

```json
{
  "selected_step": "continue_narrowing",
  "circle_count": 126,
  "circle_state": "circle_found"
}
```

Allowed `selected_step` values:

```text
continue_narrowing
invite_someone
see_people
form_group
join_action
create_action
```

---

## 13. Invite Events

### 13.1 `invite_viewed`

Triggered when invite/share screen is shown.

Properties:

```json
{
  "source": "next_step",
  "circle_count": 126,
  "circle_state": "circle_found"
}
```

---

### 13.2 `invite_started`

Triggered when native share sheet opens.

Properties:

```json
{
  "source": "rare_path",
  "circle_count": 9
}
```

---

### 13.3 `invite_completed`

Triggered if share completion can be detected.

Properties:

```json
{
  "source": "rare_path"
}
```

Note: Native share completion tracking may be unreliable depending on platform.

---

## 14. Later Events: People, Groups, Actions

These are not required for MVP 0.1 but should be planned.

### People

```text
people_screen_viewed
person_card_viewed
contact_request_started
contact_request_sent
contact_request_accepted
contact_request_declined
```

### Groups

```text
group_form_started
group_join_requested
group_joined
group_ready
group_opened
```

### Actions

```text
action_list_viewed
action_created
action_join_requested
action_join_approved
action_completed
```

These should be added only when the corresponding product layer exists.

---

## 15. User Properties

Recommended user properties:

```json
{
  "auth_type": "anonymous",
  "saved": false,
  "answer_count": 8,
  "filter_answer_count": 5,
  "current_circle_state": "getting_closer",
  "locale": "en",
  "app_version": "0.1.0"
}
```

Avoid storing sensitive answer content as user properties.

---

## 16. Core Metrics

### 16.1 First Question Answer Rate

Definition:

```text
users who answered first question / users who viewed first question
```

Why it matters:

* Measures strength of first screen.
* Measures clarity of UX.
* Measures whether the first question works.

---

### 16.2 Average Answers Per First Session

Definition:

```text
total questions answered in first session / users with first session
```

Why it matters:

* Measures engagement with question loop.
* Core MVP signal.

---

### 16.3 7-Question Completion Rate

Definition:

```text
users who answer at least 7 questions in first session / users who answer first question
```

This is the primary MVP success metric.

---

### 16.4 Filtering Answer Rate

Definition:

```text
yes/no answers / total answers
```

Why it matters:

* Measures how often questions actually shape the circle.
* High `not_important` may indicate weak questions or wrong ordering.

---

### 16.5 Not Important Rate

Definition:

```text
not_important answers / total answers
```

Track by:

* overall;
* question;
* session position;
* user segment;
* locale.

High rates may mean:

* question does not matter to users;
* question is unclear;
* question is placed too early;
* topic is too niche;
* wording is weak.

---

### 16.6 Circle Found Rate

Definition:

```text
users who reach circle_found / users who answer first question
```

Why it matters:

* Measures whether the loop reaches its intended milestone.

---

### 16.7 Rare Path Rate

Definition:

```text
users who reach rare_path / users who answer first question
```

Why it matters:

* Shows how often users narrow too far.
* Helps tune thresholds and question ordering.

---

### 16.8 No Matches Rate

Definition:

```text
users who reach no_matches / users who answer first question
```

Why it matters:

* High rate may indicate small network, too harsh filtering, or weak count logic.

---

### 16.9 Save Conversion Rate

Definition:

```text
users who complete account linking / users who see save prompt
```

Why it matters:

* Measures whether value was strong enough to save.

---

### 16.10 Next Step Selection Rate

Definition:

```text
users who select a next step / users who view next step screen
```

Why it matters:

* Measures whether users want to do something with their circle.

---

## 17. Question-Level Metrics

Each question should be evaluated.

### 17.1 Answer Rate

```text
question_answered / question_viewed
```

Low answer rate may mean the question is confusing, too sensitive, or badly placed.

---

### 17.2 Answer Distribution

Track:

```text
% yes
% no
% not_important
```

Useful questions usually split users meaningfully.

A rough useful range:

```text
Yes: 20–80%
No: 20–80%
Not important: not dominant
```

This is a guideline, not a hard rule.

---

### 17.3 Drop-Off After Question

```text
users who do not continue after this question / users who answered this question
```

High drop-off may mean:

* question is too heavy;
* result copy is weak;
* circle count is disappointing;
* question feels irrelevant;
* the user reached a satisfying state.

Interpret carefully.

---

### 17.4 Average Time to Answer

Measured from `question_viewed` to `question_answered`.

Very short time may mean:

* question is obvious;
* user is tapping without thinking;
* question is too easy.

Very long time may mean:

* question is engaging;
* question is confusing;
* question is too complex.

Use with qualitative review.

---

### 17.5 Circle Narrowing Effect

Average change in circle count after a question when answered Yes/No.

Example:

```text
average_circle_delta
median_circle_delta
```

Questions that do not narrow meaningfully may be weak or too universally answered.

---

### 17.6 Report Rate

Later, if reports exist:

```text
reports for question / question views
```

High report rate means question needs review.

---

## 18. Funnel Targets for Early Internal MVP

These are not guaranteed benchmarks. They are initial targets for evaluating the first test.

### Strong Signals

```text
First question answer rate: 70%+
7-question completion among answerers: 35%+
Average answers per first session: 6+
Save conversion after circle_found: 15%+
Users understand Not important in qualitative testing
```

### Warning Signals

```text
First question answer rate below 40%
Average answers per first session below 3
Not important rate above 60% across many questions
Circle found rate near 0
Users think Not important means matching other neutral users
Users think app is a personality test
```

### Critical Failure Signals

```text
Users leave before answering first question
Users do not understand circle count
Users do not trust the numbers
Not important logic is misunderstood
Question loop feels like a survey
Users feel judged by the app
```

---

## 19. A/B Testing Plan

### 19.1 First Question Test

Test different first questions.

Variants:

```text
privacy_vs_safety
truth_vs_loyalty
law_vs_family
peace_vs_dignity
mercy_vs_justice
```

Primary metric:

```text
first_question_answer_rate
```

Secondary metrics:

```text
question_3_completion
question_7_completion
drop_off_after_first_result
```

---

### 19.2 Result Copy Test

Test whether different result feedback improves continuation.

Variant A:

```text
Your circle: 3,420 people.
Still broad.
```

Variant B:

```text
This answer narrowed your circle to 3,420 people.
```

Primary metric:

```text
next_question_requested
```

---

### 19.3 Save Prompt Timing Test

Variants:

```text
after_7_answers
after_circle_found
when_next_step_selected
```

Primary metric:

```text
account_link_completed
```

Secondary metric:

```text
question_loop_continuation_after_prompt
```

Save prompt should not interrupt the loop too early.

---

### 19.4 Threshold Test

Test different `circle_found` ranges.

Variants:

```text
50–150
100–300
25–100
```

Primary metric:

```text
circle_found_to_next_step_selected
```

Secondary metric:

```text
continue_narrowing_selected
```

---

## 20. Dashboards

### 20.1 Core Loop Dashboard

Must show:

* app opens;
* first question views;
* first question answers;
* average answers per session;
* 3-question completion;
* 7-question completion;
* circle_found rate;
* rare_path rate;
* no_matches rate.

---

### 20.2 Question Quality Dashboard

Must show per question:

* views;
* answer rate;
* yes/no/not important distribution;
* drop-off after question;
* average time to answer;
* average circle delta.

---

### 20.3 Save Dashboard

Must show:

* save prompt views;
* save prompt trigger;
* provider selected;
* account link starts;
* account link completions;
* account link failures;
* save conversion rate.

---

### 20.4 Next Step Dashboard

Must show:

* next step screen views;
* next step selected;
* selected option distribution;
* continue narrowing rate;
* invite rate;
* people/group/action interest.

---

## 21. Event Properties Reference

Use consistent shared properties across events.

### Common Properties

```json
{
  "user_id": "firebase_uid",
  "session_id": "uuid",
  "app_version": "0.1.0",
  "platform": "ios",
  "locale": "en"
}
```

### Question Properties

```json
{
  "question_id": "q001",
  "question_order": 1,
  "question_type": "universal"
}
```

### Answer Properties

```json
{
  "answer": "yes",
  "is_filter": true
}
```

### Circle Properties

```json
{
  "circle_count": 420,
  "circle_state": "getting_closer",
  "filter_answer_count": 3
}
```

### Save Properties

```json
{
  "save_trigger": "circle_found",
  "provider": "apple"
}
```

---

## 22. Privacy and Data Safety

### Do Not Track

Do not track:

* exact location;
* full answer text in analytics by default;
* free-form sensitive content;
* private chat content;
* exact custom question text;
* personal identity details;
* complete raw answer history as a single analytics property.

### Safe to Track

Safe to track:

* question ID;
* answer value;
* aggregate count;
* filter count;
* circle state;
* screen/flow events;
* provider type;
* app version;
* locale.

Even safe fields should be reviewed if the question library becomes politically or socially sensitive.

---

## 23. Analytics Implementation Notes

### Firebase Analytics

Use Firebase Analytics for MVP.

Recommended wrapper:

```text
src/lib/analytics.ts
```

All analytics calls should go through this wrapper.

Do not call Firebase Analytics directly across the app.

This keeps event names consistent and easier to refactor.

---

### Example Wrapper API

```ts
trackQuestionViewed({
  questionId,
  questionOrder,
  questionType,
  currentCircleCount,
  currentCircleState,
});

trackQuestionAnswered({
  questionId,
  questionOrder,
  answer,
  isFilter,
  answerCount,
  filterAnswerCount,
});

trackCircleCountUpdated({
  circleCount,
  previousCircleCount,
  circleState,
  filterAnswerCount,
});
```

---

## 24. QA Requirements for Analytics

Before release, verify:

* `app_opened` fires once per app open.
* `question_viewed` fires when a question appears.
* `question_answered` fires once per answer.
* `answer_not_important` fires only for `not_important`.
* `matching_path_updated` does not incorrectly fire for `not_important`.
* `circle_count_updated` includes correct count.
* `circle_found` fires once when user first reaches circle found.
* `save_prompt_viewed` includes correct trigger.
* `account_link_completed` fires after successful linking.
* No event logs full sensitive question text unintentionally.
* No event logs exact location.

---

## 25. Success Criteria by Version

### MVP 0.1 — Core Loop

Success means:

```text
Users answer multiple questions voluntarily.
Users understand circle narrowing.
Users understand Not important.
```

Primary metric:

```text
7-question completion rate
```

---

### MVP 0.2 — Save

Success means:

```text
Users save their result after value is created.
Users return later.
```

Primary metric:

```text
save conversion rate
```

---

### MVP 0.3 — Invite / Real Circle

Success means:

```text
Users want others to join and compare circles.
```

Primary metric:

```text
invite started / next step viewed
```

---

### MVP 0.4 — People

Success means:

```text
Users want to see real people from their circle.
```

Primary metric:

```text
people screen viewed / next step viewed
```

---

### MVP 0.5 — Groups

Success means:

```text
Users opt into small groups.
```

Primary metric:

```text
group opt-in rate
```

---

### MVP 0.6 — Actions

Success means:

```text
Users move toward offline cooperation.
```

Primary metric:

```text
action join request rate
```

---

## 26. Final Analytics Summary

The MVP should be judged by one main behavior:

```text
Do users keep answering questions because the circle narrowing is compelling?
```

The first analytics priority is not retention, revenue, or social graph growth.

The first analytics priority is proving the core loop.

If users do not care about the narrowing circle, nothing else matters yet.

If users do care, then saving, people, groups, and offline actions become worth building.
