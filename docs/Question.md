# Taqyro — Question Content Guidelines

### 1. Purpose

This document defines how questions should be written, selected, reviewed, and organized for **Taqyro**.

In Taqyro, questions are not secondary content.  
Questions are the core product material.

A weak question makes the product feel like a boring survey.  
A strong question makes the product feel alive.

The purpose of every question is to help the user decide:

> Does this issue matter enough to shape my circle?

---

### 2. Role of Questions in the Product

Taqyro is built around this loop:

```text
Question → Answer → Circle narrows → Next question
```

A question is successful if it does at least one of the following:

* reveals a real boundary;
* makes the user pause for a moment;
* splits people meaningfully;
* helps the user decide who belongs in their circle;
* leads to a clearer circle after a Yes or No answer.

A question is not successful if it only creates noise, outrage, confusion, or shallow engagement.

---

### 3. Answer Options

Every MVP question must use exactly three answers:

```text
Yes
No
Not important
```

These options are not optional.

Do not create question-specific answer sets in MVP.

---

### 4. Meaning of Answers

#### Yes

The user wants people in their circle to also answer **Yes**.

```text
Yes = filter by Yes
```

#### No

The user wants people in their circle to also answer **No**.

```text
No = filter by No
```

#### Not important

The user does not want this question to affect their circle.

```text
Not important = no filter
```

This means the question is ignored completely for matching.

The app must not treat **Not important** as a third matching position.

---

### 5. What Makes a Good Question

A good Taqyro question should be:

* short;
* clear;
* meaningful;
* emotionally engaging;
* answerable in one tap;
* not purely factual;
* not trivial;
* not obviously one-sided;
* able to split users;
* connected to values, boundaries, or cooperation.

A good question should make the user think:

> “This actually says something about whether I could trust or cooperate with someone.”

---

### 6. What Makes a Bad Question

A bad question is one that is:

* too vague;
* too long;
* too academic;
* too easy;
* purely factual;
* obviously morally one-sided;
* written to shame the user;
* written to provoke outrage;
* based on insider knowledge;
* dependent on a niche context;
* impossible to answer with Yes / No / Not important;
* too local for the first global flow;
* legally or physically unsafe.

Bad questions weaken the product.

---

### 7. Question Length

Recommended length:

```text
80–160 characters
```

Maximum preferred length:

```text
240 characters
```

A question can be longer only if the dilemma requires context.

Avoid multi-paragraph questions in the main flow.

The user should understand the question quickly on a mobile screen.

---

### 8. Question Tone

Questions should be:

* direct;
* calm;
* sharp;
* neutral;
* human;
* non-judgmental.

Questions should not be:

* preachy;
* sarcastic;
* manipulative;
* insulting;
* leading;
* hysterical;
* written like clickbait.

Good tone:

```text
Could you cooperate with someone who believes X?
```

Bad tone:

```text
Do you also hate people who believe X?
```

---

### 9. Neutrality Without Weakness

Taqyro questions can be sharp without being biased.

A question should not tell the user which answer is correct.

Bad:

```text
Would you support the obvious right of people to defend themselves?
```

Better:

```text
Should law-abiding citizens have the right to own weapons for self-defense?
```

Bad:

```text
Would you betray freedom by accepting state surveillance?
```

Better:

```text
Would you accept state surveillance if it made society much safer?
```

The second version is still sharp, but it does not judge the user before they answer.

---

### 10. Avoid Moral Scoring

Questions must not imply that one answer is brave, smart, weak, evil, cowardly, or superior.

Bad:

```text
Would you have the courage to tell the truth even if everyone hates you?
```

Better:

```text
Would you tell an unpopular truth if it cost you most of your social circle?
```

Bad:

```text
Would you selfishly protect your family from justice?
```

Better:

```text
Would you help a close family member avoid punishment for a crime?
```

---

### 11. Avoid Fake Dilemmas

A question should not have an obviously correct or socially mandatory answer.

Bad:

```text
Should innocent people be tortured for no reason?
```

This is not useful. Almost everyone will answer the same way.

Better:

```text
Could torture ever be justified to prevent a large-scale attack?
```

This creates an actual moral boundary.

---

### 12. Avoid Overloaded Questions

Do not put multiple questions inside one question.

Bad:

```text
Do you support free speech, gun ownership, low taxes, and traditional family values?
```

Better:

```text
Should offensive speech be legally protected?
```

Better:

```text
Should law-abiding citizens be allowed to own weapons for self-defense?
```

One question should test one boundary.

---

### 13. Avoid Ambiguous Wording

The user should not struggle to understand what is being asked.

Bad:

```text
Do you support freedom?
```

Too vague.

Better:

```text
Should people be allowed to say offensive things without legal punishment?
```

Bad:

```text
Is justice important?
```

Too broad.

Better:

```text
Should a guilty person still be punished if they sincerely regret what they did?
```

---

### 14. Avoid Questions That Require Expertise

The main flow should not require specialized knowledge.

Bad:

```text
Do you support replacing income tax with a land value tax?
```

This may be interesting later, but it is too specific for the first flow.

Better:

```text
Should people who earn more pay a much larger share of their income in taxes?
```

---

### 15. Avoid Pure Preference Questions

Taqyro is not about taste.

Bad:

```text
Do you prefer coffee or tea?
```

Bad:

```text
Do you like dogs?
```

Bad:

```text
Do you enjoy traveling?
```

These may be fine for other apps, but they do not reveal important boundaries.

---

### 16. Avoid Pure Identity Questions

Do not ask users to label themselves.

Bad:

```text
Are you conservative?
```

Bad:

```text
Are you liberal?
```

Bad:

```text
Are you religious?
```

Better:

```text
Could you build a family with someone who does not share your religion?
```

Better:

```text
Should public institutions remain neutral toward religion?
```

The product should compare choices, not labels.

---

### 17. Avoid Questions That Directly Target Protected Groups

Do not write questions that invite rejection, hate, or dehumanization of protected or vulnerable groups.

Bad:

```text
Would you live near people of group X?
```

Bad:

```text
Should group X have fewer rights?
```

Bad:

```text
Could you be friends with people from group X?
```

If a topic touches identity, rights, or social conflict, phrase it around policies, boundaries, or cooperation without dehumanizing people.

The question should not become a tool for harassment or exclusion based on protected characteristics.

---

### 18. Avoid Doxxing or Personal Exposure

Questions must not ask users to reveal dangerous personal information.

Avoid asking:

* exact location;
* illegal activity;
* hidden political activity in unsafe environments;
* names of people;
* private medical status;
* personal secrets;
* sensitive identity information not needed for the product.

Bad:

```text
Have you illegally hidden someone from authorities?
```

Better:

```text
Could breaking the law be justified to protect someone from an unjust system?
```

---

### 19. Avoid Calls for Violence

Questions must not encourage, recruit for, praise, or coordinate violence.

Bad:

```text
Would you physically attack someone who betrayed your country?
```

Better:

```text
Should betrayal of a country be punished more severely than ordinary crimes?
```

Even when discussing force, law, punishment, war, self-defense, or security, phrase questions as moral or policy boundaries, not calls to action.

---

### 20. Question Categories

Questions can be organized into categories.

Categories are for content management, not for user-facing personality labels.

Suggested categories:

```text
truth
loyalty
privacy
security
freedom
law
family
justice
mercy
responsibility
tradition
progress
property
speech
religion
state
community
war
identity
cooperation
```

The user does not need to see these categories in the first flow.

---

### 21. Question Types

#### Universal Questions

Work globally and do not depend on a specific country.

These are best for the first flow.

#### Social Questions

Concern society, rights, institutions, rules, and public norms.

These can appear after initial universal questions.

#### Local Questions

Depend on a country, culture, region, or current conflict.

These should appear after the user selects or implies a region.

#### Custom Questions

Created by users.

These should not automatically become public global questions.

---

### 22. Universal Questions Should Come First

The first questions should be understandable anywhere.

Good first-flow topics:

* truth vs loyalty;
* privacy vs safety;
* mercy vs punishment;
* law vs family;
* freedom vs order;
* peace vs dignity;
* equality vs liberty;
* forgiveness vs revenge;
* individual choice vs collective good.

Avoid starting with highly local politics.

For example, Ukraine-specific questions may be very important for Ukrainian users, but they should not be the first global experience.

---

### 23. First Question Criteria

The first question is extremely important.

It should be:

* universal;
* emotionally engaging;
* easy to understand;
* not too long;
* not dependent on politics;
* capable of splitting users;
* safe to show globally;
* strong enough to make the user answer.

A good first question should communicate:

> “This app is about meaningful choices.”

---

### 24. Candidate First Questions

#### Option A — Privacy vs Safety

```text
Would you accept constant government surveillance if it made society much safer?
```

#### Option B — Truth vs Loyalty

```text
Would you tell the truth if it destroyed the life of someone close to you but protected many strangers?
```

#### Option C — Law vs Family

```text
Would you help a close family member avoid punishment for a serious crime?
```

#### Option D — Peace vs Dignity

```text
Would you accept peace if it required publicly agreeing to something you know is false?
```

#### Option E — Mercy vs Justice

```text
Should a guilty person still be punished if they sincerely regret what they did?
```

---

### 25. Question Review Checklist

Before adding a question, check:

```text
Is it clear?
Is it short enough?
Can it be answered Yes / No / Not important?
Does it reveal a real boundary?
Is it not purely factual?
Is it not just a preference?
Is it not obviously one-sided?
Is it not hateful or dehumanizing?
Is it not a call for violence?
Is it not too local for the current flow?
Would different reasonable people answer differently?
Would the answer help someone decide who belongs in their circle?
```

If the answer to any of these is “no”, rewrite or reject the question.

---

### 26. Writing Pattern

A useful pattern:

```text
Would you [accept/support/do X] if [cost/consequence Y]?
```

Examples:

```text
Would you accept surveillance if it made society safer?
```

```text
Would you tell the truth if it destroyed a close relationship?
```

```text
Would you break the law to protect someone from an unjust punishment?
```

Another useful pattern:

```text
Should [rule/principle] apply even when [hard case]?
```

Examples:

```text
Should free speech protect ideas most people find offensive?
```

```text
Should a guilty person be punished even if punishment ruins their life?
```

Another pattern:

```text
Could you cooperate with someone who [belief/behavior]?
```

Examples:

```text
Could you cooperate with someone who thinks loyalty matters more than truth?
```

Use this carefully to avoid targeting protected groups.

---

### 27. Good Question Examples

#### Privacy and Security

```text
Would you accept constant surveillance if it made society much safer?
```

```text
Should police be allowed to search private messages to prevent serious crimes?
```

```text
Should people give up some privacy to protect public safety?
```

#### Truth and Loyalty

```text
Would you tell the truth if it seriously harmed someone close to you?
```

```text
Should loyalty to a friend ever matter more than telling the truth?
```

```text
Would you expose wrongdoing by someone you love?
```

#### Law and Family

```text
Would you help a close family member avoid punishment for a serious crime?
```

```text
Should the law matter more than family loyalty?
```

```text
Would you report a relative if they committed a serious crime?
```

#### Justice and Mercy

```text
Should a guilty person still be punished if they sincerely regret what they did?
```

```text
Should people get a second chance after doing serious harm?
```

```text
Can mercy be more important than justice?
```

#### Freedom and Order

```text
Should people be free to say things that most of society finds offensive?
```

```text
Would you accept stricter rules if they made daily life more orderly?
```

```text
Should personal freedom be limited when many people feel unsafe?
```

#### Responsibility

```text
Should people be responsible for bad outcomes they did not intend?
```

```text
Should good intentions matter if the result caused serious harm?
```

```text
Would you trust someone who apologizes but does not change their behavior?
```

#### Cooperation

```text
Could you work with someone who shares your goals but not your methods?
```

```text
Could you cooperate with someone you respect but strongly disagree with?
```

```text
Should shared action require shared values?
```

---

### 28. Bad Question Examples and Rewrites

#### Too vague

Bad:

```text
Is freedom important?
```

Better:

```text
Should people be free to say offensive things without legal punishment?
```

---

#### Too leading

Bad:

```text
Would you let the government destroy privacy in the name of safety?
```

Better:

```text
Would you accept state surveillance if it made society much safer?
```

---

#### Too many ideas

Bad:

```text
Do you support free speech, gun rights, private property, and low taxes?
```

Better:

```text
Should offensive speech be legally protected?
```

---

#### Pure identity

Bad:

```text
Are you religious?
```

Better:

```text
Could you build a family with someone who does not share your religion?
```

---

#### Cheap outrage

Bad:

```text
Do you hate people who betray their country?
```

Better:

```text
Should betrayal of a country be punished more severely than ordinary crimes?
```

---

#### Too factual

Bad:

```text
Is the Earth round?
```

Better:

No rewrite needed. This is not a Taqyro question.

---

### 29. Local Questions

Local questions can be powerful, but they should be introduced carefully.

They should be shown only when relevant to the user’s country, region, or selected context.

For Ukraine, local questions may include topics such as:

* Crimea;
* language;
* war;
* mobilization;
* corruption;
* weapons;
* relations with Russia;
* rebuilding;
* emigration;
* veterans;
* public institutions.

Local questions should still follow the same quality rules:

* clear;
* short;
* not abusive;
* not dehumanizing;
* not inciting violence;
* answerable Yes / No / Not important.

---

### 30. Example Ukraine-Specific Questions

```text
Is Crimea part of Ukraine?
```

```text
Should Ukrainian be the default language in public service?
```

```text
Could you cooperate with someone who avoids speaking Ukrainian in public?
```

```text
Should law-abiding citizens have the right to own weapons for self-defense?
```

```text
Could you build a business with someone who justifies corruption as “necessary”?
```

```text
Should public figures be expected to take a clear position on the war?
```

```text
Could you remain close friends with someone who supports Russia’s actions against Ukraine?
```

Use local questions carefully and contextually.

---

### 31. User-Created Questions

Users may eventually add their own questions.

This is important because users know their own boundaries better than the product team.

However, custom questions are risky.

They can become:

* abusive;
* hateful;
* manipulative;
* too personal;
* defamatory;
* spammy;
* duplicates;
* low quality;
* unsafe.

Therefore, user-created questions should initially be personal or contextual.

They should not automatically become public.

---

### 32. Custom Question Rules

A custom question must:

* use Yes / No / Not important;
* be clear;
* not target private individuals;
* not reveal sensitive personal data;
* not incite violence;
* not contain hate or dehumanization;
* not be spam;
* not be an advertisement;
* not impersonate official questions.

Custom questions can be used for personal filtering or pre-contact clarification.

Global promotion requires moderation.

---

### 33. Custom Question UX Copy

When user adds a question, show guidance:

```text
Write a question that helps you decide who belongs in your circle.
```

Add warning:

```text
Avoid insults, threats, personal attacks, or questions targeting private individuals.
```

If rejected:

```text
This question cannot be used because it violates content rules.
Try rewriting it as a boundary or cooperation question.
```

---

### 34. Rewriting Custom Questions

If a question is too emotional but the underlying topic is valid, rewrite it.

Bad:

```text
Do you hate people who stay silent about corruption?
```

Better:

```text
Could you cooperate with someone who avoids taking a public position on corruption?
```

Bad:

```text
Are you okay with cowards who never help anyone?
```

Better:

```text
Is regular participation in real-world help important for people in your circle?
```

Bad:

```text
Would you cut off anyone who speaks the wrong language?
```

Better:

```text
Is language choice in public life important for people in your circle?
```

---

### 35. Question Localization

When translating questions, do not translate mechanically.

The translated question must preserve:

* clarity;
* tension;
* neutrality;
* answerability;
* emotional weight.

Avoid idioms that do not translate well.

Do not make the translated version more aggressive or more biased than the original.

---

### 36. Question Versioning

Questions should be versioned.

If a question changes meaning significantly, create a new version or new question ID.

Do not silently change the meaning of an active question if users already answered it.

Example:

```json
{
  "id": "q_privacy_001",
  "version": 1,
  "text": "Would you accept constant surveillance if it made society much safer?"
}
```

If rewritten substantially:

```json
{
  "id": "q_privacy_002",
  "version": 1,
  "text": "Should the state be allowed to monitor private communication to prevent serious crimes?"
}
```

This protects answer integrity.

---

### 37. Question Statuses

Recommended statuses:

```text
draft
active
disabled
archived
moderation
rejected
```

#### draft

Created but not shown.

#### active

Shown to users.

#### disabled

Temporarily not shown.

#### archived

No longer used, but kept for historical answer integrity.

#### moderation

Awaiting review.

#### rejected

Rejected and not usable.

---

### 38. Question Metadata

Each question should include:

```text
id
text
shortText
type
category
locale
country
status
order
version
createdAt
updatedAt
createdBy
```

Optional metadata:

```text
sensitivityLevel
reviewNotes
expectedSplit
firstFlowEligible
localOnly
```

---

### 39. Sensitivity Levels

Suggested sensitivity levels:

```text
low
medium
high
restricted
```

#### low

General moral dilemma.

#### medium

Social or political issue.

#### high

Highly divisive, identity-related, war-related, or locally sensitive.

#### restricted

Requires manual approval and careful targeting.

High and restricted questions should not appear as the first question in a global flow.

---

### 40. First Flow Eligibility

Not every active question should be eligible for the first flow.

A first-flow question must be:

* universal;
* safe;
* clear;
* not too local;
* not too identity-targeted;
* not too inflammatory;
* emotionally engaging.

Add metadata:

```json
{
  "firstFlowEligible": true
}
```

Only these questions can be used in the first session before region/context is known.

---

### 41. Ordering Strategy

Recommended MVP order:

1. universal moral dilemma;
2. universal social dilemma;
3. personal boundary dilemma;
4. cooperation dilemma;
5. justice/mercy dilemma;
6. freedom/order dilemma;
7. responsibility dilemma;
8. more specific social issues;
9. local questions only after context is known.

The first 5–7 questions should be strong and globally understandable.

---

### 42. Question Diversity

Do not show too many questions from the same category in a row.

Bad sequence:

```text
Privacy question
Privacy question
Privacy question
Privacy question
```

Better sequence:

```text
Privacy
Truth
Family
Justice
Freedom
Responsibility
Cooperation
```

This keeps the experience alive and prevents fatigue.

---

### 43. Emotional Intensity Curve

The first question should be strong, but not extreme.

The flow can increase intensity gradually.

Suggested curve:

```text
Question 1: strong but universal
Questions 2–4: broad moral/social dilemmas
Questions 5–8: sharper boundary questions
Questions 9+: more specific or local questions
```

Do not start with the most inflammatory issue.

---

### 44. Avoid Fatigue

If all questions are too heavy, the user may leave.

Mix question types:

* moral dilemmas;
* cooperation questions;
* social policy questions;
* personal boundary questions;
* responsibility questions.

Keep the tone serious but not exhausting.

---

### 45. Metrics for Question Quality

Track:

```text
view count
answer rate
drop-off after question
Yes %
No %
Not important %
average time to answer
circle narrowing effect
report rate
skip/exit rate
```

A good question usually has:

* high answer rate;
* meaningful split;
* not too many “Not important” answers;
* low report rate;
* low confusion;
* reasonable time to answer.

---

### 46. Question Split

A useful question should split people.

Avoid questions where nearly everyone answers the same way.

Roughly useful split:

```text
Yes: 20–80%
No: 20–80%
Not important: not dominant
```

This is not a strict rule.

Some questions may be valuable even if one answer dominates, especially if they identify a rare but important boundary.

---

### 47. Handling High “Not Important” Rate

If many users answer **Not important**, it may mean:

* the question is too weak;
* the issue is not broadly relevant;
* the wording is unclear;
* the question belongs later or in a local context;
* the topic is too niche.

Review questions with very high `not_important` rates.

---

### 48. Handling High Drop-Off

If users quit after a question, check whether it is:

* too aggressive;
* too confusing;
* too long;
* too local;
* too sensitive too early;
* badly worded;
* perceived as manipulative.

High drop-off does not always mean the topic is bad.
It may mean the placement or wording is wrong.

---

### 49. Handling Reports

If a question receives reports:

1. Review wording.
2. Check if it targets a group or individual.
3. Check if it encourages harm or harassment.
4. Check if it is too inflammatory.
5. Rewrite, restrict, or remove.

Do not keep a question active only because it creates engagement.

---

### 50. Question Library Governance

The question library should be treated as a high-quality editorial asset.

Recommended process:

```text
Draft
→ Internal review
→ Sensitivity review
→ Test with small audience
→ Activate
→ Monitor metrics
→ Revise or archive
```

Do not add large numbers of unreviewed questions just to increase volume.

Quality matters more than quantity.

---

### 51. MVP Question Library

For MVP, aim for:

```text
30–50 strong universal questions
```

This is enough to test the core loop.

Do not start with hundreds of questions.

A smaller, sharper library is better.

---

### 52. MVP Question Requirements

Every MVP question must:

* use Yes / No / Not important;
* have a unique ID;
* have `status = active`;
* have `locale`;
* have `order`;
* be understandable without explanation;
* be suitable for the first anonymous flow unless marked otherwise.

---

### 53. Example MVP Starter Set

```text
Would you accept constant government surveillance if it made society much safer?

Would you tell the truth if it destroyed the life of someone close to you but protected many strangers?

Would you help a close family member avoid punishment for a serious crime?

Should a guilty person still be punished if they sincerely regret what they did?

Would you accept peace if it required publicly agreeing to something you know is false?

Should offensive speech be legally protected?

Would you break the law to protect someone from an unjust punishment?

Could you cooperate with someone who shares your goal but uses methods you find wrong?

Should people be responsible for serious harm they caused unintentionally?

Would you forgive someone who harmed you if they truly changed?

Should public safety ever matter more than individual freedom?

Could you trust someone who often hides the truth to avoid conflict?

Should a person lose social status for beliefs most people find offensive?

Would you sacrifice personal comfort to defend a principle publicly?

Could you cooperate with someone who refuses to discuss politics or values?

Should loyalty to friends matter more than fairness to strangers?

Would you expose corruption if it seriously harmed your own group?

Should people be allowed to make harmful choices if they affect only themselves?

Could you build something long-term with a person who avoids responsibility?

Should society protect people from the consequences of their own bad decisions?
```

These are examples, not final production copy.

---

### 54. Final Principle

A Taqyro question should not ask:

> What label do you choose?

It should ask:

> What choice would you make when something important is at stake?

The strongest questions reveal boundaries without telling the user what to believe.

The product works only if the questions are clear, honest, and worth answering.
