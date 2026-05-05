# Taqyro — Local Setup Checklist

## Purpose

This document describes what must be prepared manually so Codex can continue building the first runnable version of Taqyro.

The initial development target is Windows with Expo Web.

```text
Windows → Expo React Native → Expo Web → Browser preview
```

This allows the first prototype to run directly on the computer before testing on a smartphone.

---

## Current State

The repository currently contains documentation only.

The next step is to create the app code:

```text
Expo React Native + TypeScript
```

The first runnable prototype should implement only the local question loop:

```text
Question → Answer → Circle updates → Result → Next question
```

Firebase should be connected after the local loop works.

---

## Manual Setup Required

### 1. Install Node.js LTS

Install the current Node.js LTS version from:

```text
https://nodejs.org/
```

After installation, restart the terminal or Codex app.

Codex needs this to create and run the Expo project.

### 2. Allow npm in PowerShell

On this Windows machine, Node.js is available, but PowerShell may block `npm.ps1` because script execution is disabled.

If `npm --version` fails with an execution policy error, run PowerShell as your normal user and execute:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Then restart the terminal or Codex app.

Alternative: Codex can use `npm.cmd` instead of `npm`, but allowing npm normally makes development smoother.

### 3. Install Git

Git is already working in this project, but if it is missing on another machine, install it from:

```text
https://git-scm.com/
```

Codex needs this to commit and push changes to GitHub.

### 4. Keep GitHub Access Available

The repository is already connected to:

```text
https://github.com/Erchard/Taqyro.git
```

If GitHub asks for authentication during future pushes, complete the browser login or token prompt manually.

Codex can run the git commands, but it cannot complete private account approval screens for you.

### 5. Allow Local Development Server Access

When the app exists, Codex will start a local Expo server.

Expected local URL:

```text
http://localhost:8081
```

or another available localhost port.

If Windows Firewall asks whether to allow Node.js or Expo network access, allow it for private networks.

### 6. Firebase Later

Firebase is not required for the first local web prototype.

When the local question loop is ready, create a Firebase project manually and provide the web app config values.

Codex will need these values later:

```text
apiKey
authDomain
projectId
storageBucket
messagingSenderId
appId
```

Do not commit private `.env` files to the repository.

---

## What Codex Can Do Next

After Node.js is installed and available, Codex can:

* scaffold the Expo React Native project;
* add TypeScript structure;
* create the first question screen;
* implement Yes / No / Not important answers;
* simulate circle narrowing locally;
* run the app in the browser on Windows;
* commit and push the first app version.

---

## Next Recommended Command for Codex

Ask Codex:

```text
Створи перший Expo Web прототип Taqyro
```

The expected output is a browser-runnable prototype of the core question loop.
