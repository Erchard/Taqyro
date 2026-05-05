# Taqyro — Project Overview

## What is Taqyro?

**Taqyro** is a mobile app for finding people with similar core values through answers to sharp, meaningful questions.

The app starts with a question, not with registration or profile setup.

A user answers questions such as moral dilemmas, social issues, and personal boundary questions. Based on the answers that matter to the user, the app narrows a broad audience into a smaller circle of people who answered the same way.

The goal is to help users find people they can potentially meet, cooperate with, and build offline relationships or initiatives with.

---

## Core Concept

Taqyro is based on a simple idea:

**People are better matched by important choices than by profiles.**

Most social apps start with external markers:

- photos;
- bios;
- hobbies;
- jobs;
- status;
- lifestyle.

Taqyro focuses on something deeper:

- what questions matter to a person;
- where their boundaries are;
- what they agree or disagree with;
- what they consider acceptable or unacceptable;
- which people they would want to cooperate with in real life.

The app does not try to describe the user with personality labels.  
It only compares actual answers.

---

## Main User Experience

The first screen is a question.

The user can answer:

- **Yes**
- **No**
- **Not important**

After each answer, the app shows how many people remain in the user’s circle.

If the user answers **Yes**, the circle keeps people who also answered **Yes** to that question.

If the user answers **No**, the circle keeps people who also answered **No** to that question.

If the user answers **Not important**, the question is ignored for matching. It does not filter the circle at all.

This means the user’s circle is defined only by questions that the user treats as important.

---

## Circle Logic

The app gradually narrows a large group of people into a smaller circle.

Example:

```text
After 1 important answer: 20,000 people
After 4 important answers: 3,000 people
After 8 important answers: 500 people
After 12 important answers: 120 people
```

The user is not completing a traditional questionnaire.

The user is narrowing the circle until it becomes useful.

If the circle is too large, the app offers more questions.

If the circle is focused enough, the app offers the next step.

If the circle becomes very small, the app can show that the user’s combination of answers is rare.

---

## After the Circle Is Found

Once the user has a focused circle, the app should help them move toward interaction.

Possible next steps:

* see people from the circle nearby;
* form a small group;
* join an offline activity;
* create an offline activity;
* answer more questions to narrow the circle further.

The final purpose is not just matching or chatting.

The final purpose is offline cooperation between people who share important values.

---

## Product Direction

Taqyro should feel simple, immediate, and focused.

It should avoid:

* long onboarding;
* mandatory detailed profiles;
* personality tests;
* ideological labels;
* endless feeds;
* unnecessary settings before the user sees value.

The first version should focus on the core loop:

```text
Question → Answer → Circle narrows → Next question → Circle found → Action
```

---

## Current Project State

The project currently contains product and technical documentation only.

There is no app code yet.

The next implementation step is to create an Expo React Native project with TypeScript and run the first prototype on Windows through Expo Web.

The first prototype should validate the basic question loop before connecting the full Firebase backend:

```text
Question → Answer → Local circle update → Result → Next question
```

Mobile testing on a real phone should come after the web prototype feels clear and usable.

---

## One-Sentence Description

**Taqyro helps people answer meaningful questions, find others who answered the same way on what matters, and move from shared values to offline interaction.**
