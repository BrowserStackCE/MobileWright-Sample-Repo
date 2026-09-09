# BStackDemo MobileWright Tests

End-to-end mobile tests for the **BStackDemo** Android app, built with [MobileWright](https://mobilewright.dev) and executed on real devices via [BrowserStack App Automate](https://www.browserstack.com/app-automate).

---

## Prerequisites

- **Node.js** 18 or newer
- A **BrowserStack** account — [sign up free](https://www.browserstack.com/users/sign_up)
- Your BrowserStack **Username** and **Access Key** (found in [Account Settings](https://www.browserstack.com/accounts/settings))

---

## Clone & Install

```bash
git clone <your-repo-url>
cd MobileWright
npm install
```

---

## Configure Credentials

Create a `.env` file at the project root (it is already gitignored):

```env
BROWSERSTACK_USERNAME=your_username
BROWSERSTACK_ACCESS_KEY=your_access_key
```

> **Never commit `.env`** — it is listed in `.gitignore`.

---

## Project Structure

```
MobileWright/
├── mobilewright.config.ts   # BrowserStack driver, app ID, and device matrix
├── tests/
│   └── bstackdemo.spec.ts   # All 6 test cases
├── package.json
├── tsconfig.json
└── .env                     # Credentials (gitignored)
```

---

## Running Tests

### Run all tests on all 3 devices

```bash
set -a; source .env; set +a
npm test
```

This runs the full suite in parallel across:

| Project | Device | OS |
|---|---|---|
| `pixel-9-android-17` | Google Pixel 9 | Android 17 |
| `samsung-s23-android-13` | Samsung Galaxy S23 | Android 13 |
| `samsung-s24-android-14` | Samsung Galaxy S24 | Android 14 |

### Run a specific test by name

```bash
set -a; source .env; set +a
npx mobilewright test --grep "login with valid"
```

### Run on a single device project

```bash
set -a; source .env; set +a
npx mobilewright test --project pixel-9-android-17
```

### View the HTML report

```bash
set -a; source .env; set +a
npx mobilewright test --reporter html
npx mobilewright show-report
```

Open [http://localhost:9323](http://localhost:9323) to browse results, screenshots, and errors.

---

## Test Cases

| # | Test | Description |
|---|---|---|
| 1 | Login with valid credentials | Fills username/password, taps Login, asserts product listing loads |
| 2 | Filter by Samsung | Taps Samsung category filter, asserts filter is applied |
| 3 | Filter by Apple | Taps Apple category filter, asserts filter is applied |
| 4 | User Profile tab | Navigates to Profile, verifies username and key menu items |
| 5 | Favorites empty state | Navigates to Favorites, asserts empty-state message |
| 6 | Orders empty state | Navigates to Orders, asserts empty-state message |

---

## BrowserStack Dashboard

After each run, session links are printed to the terminal. View all sessions at:

👉 [https://app-automate.browserstack.com](https://app-automate.browserstack.com)

---

## Updating the App

To test a new build, upload it to BrowserStack and update `app` in `mobilewright.config.ts`:

```bash
curl -u "USERNAME:ACCESS_KEY" \
  -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
  -F "file=@/path/to/your.apk"
```

Copy the returned `app_url` (e.g. `bs://abc123...`) and set it in `mobilewright.config.ts`:

```ts
driver: browserStackDriver({
  app: 'bs://<new-app-id>',
  ...
})
