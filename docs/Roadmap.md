# Taqyro — MVP Roadmap

### 1. Purpose

This document defines the staged MVP roadmap for **Taqyro**.

The goal is to avoid overbuilding and focus development on proving the core product loop first:

```text
Question → Answer → Circle narrows → Continue → Circle found → Save → Next step
```

The roadmap is divided into small product versions. Each version should validate one major assumption before moving to the next.

---

### 2. Roadmap Philosophy

Taqyro should not start as a full social network.

The product should be built in this order:

```text
Core loop first
→ Save and return
→ Real circle visibility
→ People from circle
→ Small groups
→ Offline actions
```

Each stage must answer a specific question.

Do not build people, groups, chats, maps, or offline actions until the question loop is proven.

---

### 3. Version Overview

```text
MVP 0.0 — Local Web Prototype
MVP 0.1 — Core Question Loop
MVP 0.2 — Save Result and Return
MVP 0.3 — Real Circle and Invite
MVP 0.4 — People From Circle
MVP 0.5 — Small Groups
MVP 0.6 — Offline Actions
MVP 1.0 — Public MVP
```

---

## MVP 0.0 — Local Web Prototype

### Goal

Create the first runnable version of the app on Windows through Expo Web.

### Main Hypothesis

> The core question loop can be understood and tested before the full backend exists.

### Must Include

* Expo React Native app with TypeScript
* Browser launch on Windows through Expo Web
* First screen is a question
* Fixed answer options:

  * Yes
  * No
  * Not important
* Local starter question set
* Local answer state
* Local circle count simulation
* Circle state display
* Result after each answer
* Continue to next question

### Must Not Include

* Firebase setup as a blocker
* account registration
* real users
* real matching backend
* profiles
* chat
* maps
* groups
* offline actions

### Exit Criteria

Move to MVP 0.1 only if:

* the app starts reliably on Windows;
* the first question appears immediately;
* the answer flow feels clear;
* `Not important` clearly does not narrow the circle;
* the local prototype is good enough to connect to Firebase.

---

## MVP 0.1 — Core Question Loop

### Goal

Prove that users will answer meaningful questions and continue because they want to see their circle narrow.

### Main Hypothesis

> Users will keep answering sharp questions if each answer immediately changes the size of their circle.

### Must Include

* Expo React Native app
* Firebase anonymous auth
* First screen is a question
* No registration before answering
* Fixed answer options:

  * Yes
  * No
  * Not important
* At least 20 active questions
* Answer saving
* Matching path generation
* Circle count calculation
* Circle state display
* Result after each answer
* Continue to next question
* Basic analytics
* Crashlytics

### Must Not Include

* user profiles
* photos
* bios
* chat
* maps
* people browsing
* groups
* actions
* location
* personality labels
* AI interpretation

### Core Screens

```text
Question Screen
Answer Result State
Circle Found Screen
Rare Path Screen
No Matches Screen
```

### Success Metrics

Primary:

```text
% of users who answer at least 7 questions in first session
```

Secondary:

```text
First question answer rate
Average answers per session
Average filtering answers per session
% Not important answers
% reaching circle_found
% reaching rare_path
```

### Exit Criteria

Move to MVP 0.2 only if:

* users understand the question flow;
* users understand that `Not important` does not filter;
* a meaningful number of users answer several questions;
* the circle narrowing mechanic is interesting enough to continue.

---

## MVP 0.2 — Save Result and Return

### Goal

Allow users to preserve their circle and return later.

### Main Hypothesis

> After receiving value, users will be willing to save their result.

### Must Include

* Save result prompt after meaningful progress
* Account linking:

  * Apple
  * Google
  * Email
* Anonymous account upgrade
* Preserve answers after account linking
* Returning user state
* Continue narrowing after returning
* Basic “Not now” option
* Analytics for save flow

### Save Prompt Triggers

The save prompt may appear when:

```text
circle_found is reached
OR user answers 7+ questions
OR user has 4+ filtering answers
OR user tries to access next step
```

Exact thresholds should be configurable.

### Core Screens

```text
Save Result Screen
Welcome Back State
Continue Narrowing Screen
```

### Success Metrics

```text
Save prompt view rate
Save conversion rate
Account linking completion rate
Return rate
Answers after return
```

### Exit Criteria

Move to MVP 0.3 only if:

* anonymous answers survive account linking;
* users understand why saving matters;
* users return and continue answering;
* save prompt does not appear too early.

---

## MVP 0.3 — Real Circle and Invite

### Goal

Make the circle feel real without building full people browsing yet.

### Main Hypothesis

> Users will care more about the circle if they understand it contains real people from the current network.

### Must Include

* Honest current-network circle count
* Invite/share mechanic
* Simple explanation of small network / early network
* Optional shareable prompt
* Basic current network stats
* No exposure of identities yet
* No fake users or fake counts

### Possible Features

#### Invite Someone

User can share a link:

```text
I’m using Taqyro to find people who answer the same way on questions that matter.
Try it and see where your circle leads.
```

#### Circle Summary

Show:

```text
Your circle: 126 people
Important answers: 12
Current network: 4,820 active users
```

### Must Not Include

* public answer history
* profile browsing
* direct contact
* location
* chat

### Success Metrics

```text
Invite button click rate
Share completion rate
New users from invites
Circle found → invite conversion
Rare path → invite conversion
```

### Exit Criteria

Move to MVP 0.4 only if:

* users want to know who is in the circle;
* users invite others;
* circle count feels meaningful;
* cold start messaging is understandable.

---

## MVP 0.4 — People From Circle

### Goal

Show people from the user’s circle without turning the product into a profile feed.

### Main Hypothesis

> Users want to see real people from their circle, but still care more about shared important answers than photos or bios.

### Must Include

* “People from my circle” screen
* Anonymous or semi-anonymous person cards
* Directional or mutual match indicator
* No required photos
* No public bios required
* Contact request placeholder or basic request
* Privacy-safe display

### Person Card MVP

Example:

```text
Person #42

Matches your important answers: 12/12
Status: active recently
Open to: conversation / small group

[Request contact]
```

### Matching Mode

For people display, prefer:

```text
mutual matching
```

Minimum acceptable early version:

```text
candidate satisfies my filters
```

But the UI must not overclaim mutual compatibility unless it is actually mutual.

### Must Not Include

* swipe mechanics
* likes
* follower counts
* profile ranking
* public comments
* full social feed
* exact location

### Success Metrics

```text
People screen open rate
Person card view rate
Contact request click rate
Contact request acceptance rate
Reports / blocks rate
```

### Exit Criteria

Move to MVP 0.5 only if:

* users want to interact with people from the circle;
* anonymous/semi-anonymous cards are understandable;
* contact interest exists;
* no major safety issues appear.

---

## MVP 0.5 — Small Groups

### Goal

Move from individual matching to small group formation.

### Main Hypothesis

> Users are more willing to move toward real interaction through small groups than through random one-to-one chats.

### Must Include

* “Form small group” option
* Group target size, for example 5–7 people
* Opt-in group joining
* Basic group formation state
* Simple group room once enough users join
* No automatic exposure without consent

### Group Formation Flow

```text
User taps Form small group
→ App explains group purpose
→ User opts in
→ Group waits for 5–7 compatible users
→ When enough users join, group opens
```

### Group States

```text
forming
ready
active
closed
cancelled
```

### Example UI

```text
Group forming

3 / 5 people joined from your circle.

When the group is ready,
you will be able to coordinate the first conversation.
```

### Must Not Include

* complex community management
* large public groups
* public group discovery
* heavy moderation tools beyond basic reporting
* exact location sharing

### Success Metrics

```text
Group formation click rate
Group opt-in rate
Groups reaching target size
Group first message rate
Group retention
Reports / blocks inside groups
```

### Exit Criteria

Move to MVP 0.6 only if:

* users opt into small groups;
* groups can actually form;
* users communicate safely;
* small groups feel more valuable than profile browsing.

---

## MVP 0.6 — Offline Actions

### Goal

Enable the first real-world cooperation layer.

### Main Hypothesis

> People who share important answers can move from small groups into simple offline actions.

### Must Include

* Basic action creation
* Basic action list for circle/group
* Join request
* Organizer approval
* Approximate location only
* Exact location hidden until approval
* Basic action status

### Action Types

Initial types:

```text
meeting
discussion
volunteering
local initiative
learning session
mutual support
```

### Create Action Fields

```text
Title
Short description
Approximate location
Time
Capacity
Visibility
```

### Action States

```text
draft
active
full
completed
cancelled
```

### Join Flow

```text
User sees action
→ requests to join
→ organizer approves
→ user receives details
```

### Must Not Include

* payments
* ticketing
* complex calendar integration
* exact public map
* public event marketplace
* ratings
* large-scale event management

### Success Metrics

```text
Action view rate
Action creation rate
Join request rate
Approval rate
Completed actions
No-show rate
Post-action continuation
Reports / safety incidents
```

### Exit Criteria

Move to MVP 1.0 only if:

* users create actions;
* users request to join;
* at least some offline actions happen;
* safety and privacy model works;
* actions feel connected to the circle, not like generic events.

---

## MVP 1.0 — Public MVP

### Goal

Launch a coherent public version that includes the full path from questions to initial offline action.

### Must Include

* Polished question loop
* Save result
* Real circle count
* People from circle
* Contact requests
* Small groups
* Basic offline actions
* Reporting/blocking
* Basic moderation
* Analytics dashboard
* Remote Config
* Crash monitoring
* Privacy-safe location model

### Public MVP Flow

```text
Open app
→ Answer questions
→ Circle narrows
→ Circle found
→ Save result
→ See people / group / action
→ Request contact or join group/action
→ Move toward real interaction
```

### Success Metrics

Primary:

```text
% of users who move from question loop to a next step
```

Secondary:

```text
7-question completion
circle_found rate
save conversion
people screen conversion
contact request rate
small group opt-in
action join request
completed offline actions
```

---

## 4. Development Phases

### Phase 1 — Documentation and Setup

Tasks:

* finalize docs;
* create GitHub repo;
* create Expo project;
* create Firebase project;
* configure environments;
* set up TypeScript;
* set up basic folder structure;
* set up Firebase SDK;
* set up anonymous auth;
* set up Analytics and Crashlytics.

Deliverable:

```text
App opens and creates anonymous user.
```

---

### Phase 2 — Question Flow

Tasks:

* create Firestore questions collection;
* seed initial questions;
* build Question Screen;
* build answer buttons;
* save answers;
* load next question;
* track analytics events.

Deliverable:

```text
User can answer a sequence of questions.
```

---

### Phase 3 — Matching Logic

Tasks:

* implement `Yes / No / Not important` logic;
* generate matching path;
* write userFilterAnswers;
* build circle count function;
* classify circle state;
* show result after answer;
* add tests for matching rules.

Deliverable:

```text
After each answer, user sees updated circle count and state.
```

---

### Phase 4 — Circle Milestones

Tasks:

* implement circle_found state;
* implement rare_path state;
* implement no_matches state;
* build milestone screens;
* add continue narrowing;
* add empty/no-question handling.

Deliverable:

```text
User can reach and understand circle states.
```

---

### Phase 5 — Save Flow

Tasks:

* implement save prompt;
* add Apple login;
* add Google login;
* add email login;
* link anonymous account;
* preserve answers;
* restore returning session.

Deliverable:

```text
User can save circle and return later.
```

---

### Phase 6 — Next Step Preview

Tasks:

* build Next Step Screen;
* add continue narrowing;
* add invite/share;
* add people/group/action placeholders;
* track next step selection.

Deliverable:

```text
User sees where the product goes after the circle.
```

---

### Phase 7 — Internal Test

Tasks:

* run internal test;
* collect analytics;
* collect qualitative feedback;
* verify `Not important` understanding;
* test edge cases;
* fix crashes;
* adjust question order;
* adjust thresholds.

Deliverable:

```text
Internal build proves whether core loop is engaging.
```

---

## 5. Priority Rules

When deciding what to build next, use this order:

```text
1. Does it improve the question loop?
2. Does it make circle narrowing clearer?
3. Does it help the user reach a meaningful circle?
4. Does it help the user save the result?
5. Does it move the user toward connection or action?
```

If a feature does none of these, do not build it yet.

---

## 6. Explicitly Deferred Features

Do not build in early MVP:

```text
Detailed profiles
Photo upload
Public bios
Swiping
Likes
Followers
Public comments
Endless feed
Complex chat
Maps
Exact location
Payments
Ratings
AI personality labels
Compatibility percentages
Political labels
Full admin panel
Full moderation console
Large event platform
```

These features increase complexity and can distort the product before the core loop is validated.

---

## 7. Risks by Stage

### MVP 0.1 Risks

* Questions are not strong enough.
* Users do not understand circle count.
* Users do not understand Not important.
* Circle count is too slow.
* First question is not engaging.

### MVP 0.2 Risks

* Save prompt appears too early.
* Users do not want to register.
* Anonymous account linking fails.
* Returning experience is unclear.

### MVP 0.3 Risks

* Network is too small.
* Counts feel disappointing.
* Users do not invite others.
* Cold start messaging feels weak.

### MVP 0.4 Risks

* People cards feel too anonymous.
* People cards feel too much like dating.
* Users expect photos.
* Safety issues begin.

### MVP 0.5 Risks

* Groups do not fill.
* Users do not know what to do in groups.
* Groups become chat rooms without action.

### MVP 0.6 Risks

* Users are not ready for offline action.
* Organizers do not create actions.
* Safety/privacy concerns increase.
* Location handling becomes sensitive.

---

## 8. Roadmap Success Definition

The roadmap is successful if each version validates a clear behavior before the next layer is added.

The correct development path is not:

```text
Build everything, then see if people care.
```

The correct path is:

```text
Prove the loop.
Then prove saving.
Then prove circle interest.
Then prove interaction.
Then prove groups.
Then prove offline action.
```

---

## 9. Final Roadmap Summary

```text
0.1 Core Loop
Can users answer and continue?

0.2 Save
Will users save after value?

0.3 Invite / Real Circle
Does the circle feel real?

0.4 People
Do users want to see people from the circle?

0.5 Groups
Will users form small groups?

0.6 Actions
Will users move toward offline cooperation?

1.0 Public MVP
Can the full path from choice to action work?
```

The first priority is always the same:

```text
Make the question loop work.
```
