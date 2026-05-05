# Taqyro — User Stories

### Purpose of This Document

This document describes the main user stories for **Taqyro**.

Taqyro is a mobile app where users answer sharp questions, narrow a broad audience into a smaller circle of people with matching important answers, and move toward offline connection or cooperation.

The product should feel immediate, simple, and game-like.  
The user should get value before registration, profile setup, or any complex configuration.

---

## 1. First Launch

### US-01 — Start with a Question

As a new user,  
I want to see a meaningful question immediately after opening the app,  
so that I can engage with the product without registration or onboarding.

#### Acceptance Criteria

- The first screen is a question.
- There is no registration screen before the first question.
- There is no mandatory profile setup before the first question.
- The question has three answer options:
  - Yes
  - No
  - Not important
- The user can answer in one tap.

---

### US-02 — Answer the First Question

As a new user,  
I want to answer the first question quickly,  
so that I can immediately see how my answer affects my circle.

#### Acceptance Criteria

- After the user answers, the app shows feedback immediately.
- If the user answers **Yes**, the circle is filtered by users who also answered **Yes**.
- If the user answers **No**, the circle is filtered by users who also answered **No**.
- If the user answers **Not important**, the question does not affect the circle.
- The app clearly explains what happened to the circle.

---

### US-03 — See Immediate Circle Feedback

As a user,  
I want to see how many people remain in my circle after each answer,  
so that I understand that my choices have an effect.

#### Acceptance Criteria

- After each answer, the app shows the current circle size.
- The circle size is based only on important answers.
- Questions answered as **Not important** do not reduce the circle.
- The feedback is short and easy to understand.

#### Example

```text
Your circle: 4,820 people

Still broad.
Answer more questions to narrow it.
```

---

## 2. Answering Questions

### US-04 — Continue Answering Questions

As a user,
I want to continue answering questions one by one,
so that I can narrow my circle further.

#### Acceptance Criteria

* After each result screen, the user can move to the next question.
* The next question appears without extra setup.
* The user does not need to choose categories manually in the first flow.
* The app keeps the experience fast and focused.

---

### US-05 — Answer “Yes”

As a user,
I want to answer **Yes** to a question,
so that my circle includes people who also answered **Yes** to that question.

#### Acceptance Criteria

* The question becomes part of the user’s matching filter.
* Only users who also answered **Yes** to this question remain in the circle.
* Users who answered **No** are excluded from this user’s circle.
* Users who did not answer this question are excluded for this question, because the user made it important.
* The app updates the circle size.

---

### US-06 — Answer “No”

As a user,
I want to answer **No** to a question,
so that my circle includes people who also answered **No** to that question.

#### Acceptance Criteria

* The question becomes part of the user’s matching filter.
* Only users who also answered **No** to this question remain in the circle.
* Users who answered **Yes** are excluded from this user’s circle.
* Users who did not answer this question are excluded for this question, because the user made it important.
* The app updates the circle size.

---

### US-07 — Answer “Not Important”

As a user,
I want to answer **Not important** when a question is not a criterion for me,
so that this question does not affect my circle.

#### Acceptance Criteria

* The question is saved in the user’s answer history.
* The question is not added to the matching filter.
* The circle does not narrow because of this question.
* Other users are not filtered by their answer to this question.
* Users who answered Yes, No, Not important, or did not answer this question are all treated the same for this user.

#### Example

```text
This question will not affect your circle.
We will not filter people by this answer.
```

---

### US-08 — Skip Interpretation

As a user,
I do not want the app to assign me psychological types or labels,
so that the experience stays factual and not manipulative.

#### Acceptance Criteria

* The app does not generate personality types.
* The app does not assign ideological labels.
* The app does not explain the user’s inner traits.
* The app only shows matching facts based on answers.

#### Good Example

```text
126 people answered the same way on your important questions.
```

#### Bad Example

```text
You are a freedom-oriented moral traditionalist.
```

---

## 3. Circle Progress

### US-09 — See Circle Focus

As a user,
I want to understand whether my circle is still too broad, focused enough, or very rare,
so that I know whether to continue answering questions.

#### Acceptance Criteria

* The app shows the current state of the circle.
* Possible states:

  * Too broad
  * Getting closer
  * Circle found
  * Rare path
* The state is based on the current circle size.
* The app does not force the user to continue if the circle is already useful.

---

### US-10 — Continue When Circle Is Too Broad

As a user,
I want the app to suggest more questions when my circle is too large,
so that I can narrow it further.

#### Acceptance Criteria

* If the circle is above the target range, the app suggests answering more questions.
* The app explains that the circle is still broad.
* The user can proceed to the next question immediately.

#### Example

```text
Your circle: 3,420 people

Still broad.
One more question can make it more focused.
```

---

### US-11 — Stop When Circle Is Focused

As a user,
I want the app to tell me when my circle is focused enough,
so that I can move from answering questions to action.

#### Acceptance Criteria

* When the circle enters the target range, the app shows a “circle found” state.
* The user can stop answering questions.
* The user can also choose to narrow the circle further.
* The app presents clear next steps.

#### Example

```text
Your circle is found.

124 people match your important answers.
```

---

### US-12 — Handle Rare Paths

As a user,
I want the app to tell me if my answer path is rare,
so that I understand why very few people remain.

#### Acceptance Criteria

* If the circle becomes very small, the app shows a “rare path” state.
* The app does not present this as a failure.
* The user can still continue.
* The user can choose to broaden the circle or see the rare circle.

#### Example

```text
Your path is rare.

Only 9 people match your important answers.
```

---

## 4. Saving the Result

### US-13 — Use the App Before Registration

As a new user,
I want to answer questions before creating an account,
so that I can experience the product before committing.

#### Acceptance Criteria

* The user can answer questions without manual registration.
* The app creates an anonymous session in the background.
* The user’s answers are not lost during the session.
* Registration is not required before the user receives value.

---

### US-14 — Save the Circle

As a user,
I want to save my circle after it becomes meaningful,
so that I do not lose my answers and result.

#### Acceptance Criteria

* The app asks the user to save only after value has been created.
* The save prompt appears after a meaningful number of answers or when the circle is found.
* The user can save using Apple, Google, or email.
* Existing anonymous answers are preserved after account linking.

#### Example

```text
Your circle is almost formed.
Save it so you do not lose your result.
```

---

## 5. After the Circle Is Found

### US-15 — Choose What to Do Next

As a user,
I want to choose what to do after my circle is found,
so that I can decide whether I want to connect, continue narrowing, or move toward action.

#### Acceptance Criteria

* After the circle is found, the app shows several next steps.
* Possible actions:

  * See people nearby
  * Form a small group
  * Join an action
  * Create an action
  * Answer more questions
* The app does not immediately push the user into a profile feed.

---

### US-16 — See People Nearby

As a user,
I want to see people from my circle who are geographically near me,
so that I can understand whether offline connection is possible.

#### Acceptance Criteria

* The app asks for approximate location only when needed.
* The app does not expose exact user location.
* The app shows how many people from the circle are nearby.
* The user can choose whether to proceed.

#### Example

```text
18 people from your circle are nearby.
```

---

### US-17 — Use Approximate Location

As a user,
I want the app to use only approximate location,
so that I can find nearby people without exposing my exact position.

#### Acceptance Criteria

* Exact location is not shown to other users.
* The app can use city, region, or approximate distance.
* The user can deny location access.
* The user can still use the app without nearby matching, but with limited local features.

---

### US-18 — See Anonymous Circle Cards

As a user,
I want to see people from my circle without the experience becoming a social media profile feed,
so that the focus stays on shared answers rather than appearance or status.

#### Acceptance Criteria

* Initial cards can be anonymous or semi-anonymous.
* Cards focus on matching facts, not photos or bios.
* The app shows how many important answers match.
* The app does not require users to upload photos for MVP.

#### Example

```text
Person #42

Matches your important answers: 12/12
Nearby: same city
Open to: small group
```

---

## 6. Connection

### US-19 — Request Contact

As a user,
I want to request contact with a person from my circle,
so that we can start interacting if both sides agree.

#### Acceptance Criteria

* Contact requires mutual consent.
* The receiving user can accept or decline.
* The user cannot send unlimited requests.
* The app prevents spam behavior.

---

### US-20 — Ask One Additional Question Before Contact

As a user,
I want to ask one additional important question before opening contact,
so that I can confirm a specific boundary that matters to me.

#### Acceptance Criteria

* The user can add one custom question before contact.
* The other user can answer Yes, No, or Not important.
* The answer can determine whether contact opens.
* This step is optional.

---

### US-21 — Open Chat After Mutual Consent

As a user,
I want chat to open only after both people agree,
so that communication stays intentional.

#### Acceptance Criteria

* Chat opens only after the contact request is accepted.
* Either user can block the other.
* Either user can report inappropriate behavior.
* Chat is not available before mutual consent.

---

## 7. Small Groups

### US-22 — Form a Small Group

As a user,
I want to form a small group from people in my circle,
so that we can move from matching to real interaction.

#### Acceptance Criteria

* The user can choose to form a group.
* The app suggests people from the circle who are compatible by important answers.
* The group has a target size, for example 5–7 people.
* Users must opt in before being added.

---

### US-23 — Join a Forming Group

As a user,
I want to join a group that is being formed from my circle,
so that I can participate without creating a group myself.

#### Acceptance Criteria

* The user can see that a group is forming.
* The user can request to join.
* The group opens when enough people join.
* The group can be based on location or action intent.

---

## 8. Offline Actions

### US-24 — See Available Actions

As a user,
I want to see offline actions connected to my circle,
so that I can move from shared answers to real-world activity.

#### Acceptance Criteria

* The app shows actions related to the user’s circle.
* Actions can be filtered by location.
* Actions can include meetings, discussions, volunteering, local initiatives, or projects.
* The user can request to join an action.

---

### US-25 — Create an Action

As a user,
I want to create an offline action,
so that I can invite people from my circle to do something together.

#### Acceptance Criteria

* The user can create a simple action.
* Required fields are minimal:

  * title
  * short description
  * approximate location
  * time
  * capacity
* The action can be visible to people in the user’s circle.
* The creator can approve or reject join requests.

---

### US-26 — Join an Action

As a user,
I want to join an action created by someone from my circle,
so that I can participate in real-world cooperation.

#### Acceptance Criteria

* The user can request to join.
* The organizer can approve or decline.
* Exact location details can be hidden until approval.
* The user receives confirmation after approval.

---

## 9. User-Created Questions

### US-27 — Add My Own Question

As a user,
I want to add my own question if existing questions do not capture something important to me,
so that I can narrow my circle by a personal boundary.

#### Acceptance Criteria

* The user can create a custom question.
* The question has the same answer options:

  * Yes
  * No
  * Not important
* The question can be used to narrow the user’s circle.
* The question does not automatically become public for all users.

---

### US-28 — Use Custom Question for Matching

As a user,
I want my custom question to affect matching only if I use Yes or No,
so that it follows the same logic as standard questions.

#### Acceptance Criteria

* Yes and No become filters.
* Not important means no filter.
* Other users can answer the custom question when interacting with the creator.
* The custom question can be ignored by users for whom it does not matter.

---

## 10. Safety and Moderation

### US-29 — Report a User

As a user,
I want to report another user,
so that unsafe or abusive behavior can be handled.

#### Acceptance Criteria

* The user can report another user from a card, chat, group, or action.
* The report includes a reason.
* The reported user is not told who reported them.
* Moderators can review reports.

---

### US-30 — Block a User

As a user,
I want to block another user,
so that they cannot contact me or appear in my interaction flow.

#### Acceptance Criteria

* Blocking prevents direct messages.
* Blocking hides the blocked user where appropriate.
* The user can unblock later.
* Blocking does not require explanation.

---

### US-31 — Moderate Custom Questions

As a moderator,
I want to review user-created questions,
so that harmful, illegal, or abusive content does not spread.

#### Acceptance Criteria

* Custom questions can be flagged.
* Moderators can approve, reject, edit, or hide questions.
* Rejected questions have an internal reason.
* Public promotion of custom questions requires moderation.

---

## 11. Admin and Content Management

### US-32 — Manage Standard Questions

As an admin,
I want to create and manage standard questions,
so that the app can provide a high-quality question flow.

#### Acceptance Criteria

* Admins can create questions.
* Admins can edit question text.
* Admins can activate or deactivate questions.
* Questions have three answer options:

  * Yes
  * No
  * Not important

---

### US-33 — Control Question Order

As an admin,
I want to control or test the order of questions,
so that the first user experience can be improved.

#### Acceptance Criteria

* Admins can set the default order of questions.
* The app can support different question sequences.
* The first question can be changed without releasing a new app version.
* Question order can be tested experimentally.

---

### US-34 — View Basic Metrics

As an admin,
I want to see basic product metrics,
so that I can understand whether users engage with the core loop.

#### Acceptance Criteria

* Admins can see:

  * first question views
  * first question answers
  * average number of answers
  * percentage of users reaching circle found
  * saves / registrations after answering
  * users moving to people, groups, or actions
* Metrics focus on the core loop.

---

## 12. MVP Scope

### Must Have

* First screen is a question.
* No registration before answering.
* Answers: Yes / No / Not important.
* Yes and No filter the circle.
* Not important does not filter the circle.
* Circle size updates after each answer.
* App shows whether the circle is broad, focused, or rare.
* User can save result after receiving value.
* User can reach a “circle found” state.
* User can choose a next step after the circle is found.

---

### Should Have

* Approximate location.
* Nearby people from the circle.
* Anonymous or semi-anonymous circle cards.
* Contact request.
* Basic chat after mutual consent.
* User-created questions.
* Small group formation.
* Basic offline actions.

---

### Later

* Advanced action management.
* Group coordination.
* More detailed moderation tools.
* Public custom question library.
* Regional question sets.
* Recommendation of actions.
* Trust signals after offline participation.

---

## Main User Flow

```text
Open app
→ See question
→ Answer Yes / No / Not important
→ See circle size
→ Continue answering
→ Circle becomes focused
→ Save result
→ Choose next step
→ See people / group / action
→ Move toward offline connection
```

---

## Core Rule

```text
Yes = filter by Yes
No = filter by No
Not important = no filter
```

This rule must remain consistent across the whole product.
