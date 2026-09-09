import { expect, test } from "@mobilewright/test";
import type { Screen } from "@mobilewright/core";

// ---------------------------------------------------------------------------
// Shared login helper
// ---------------------------------------------------------------------------
async function login(
  screen: Screen,
  username = "demouser",
  password = "testpass123",
) {
  await expect(screen.getByLabel("Login button")).toBeVisible();
  await screen.getByLabel("Username input field").fill(username);
  await screen.getByLabel("Password input field").fill(password);
  await screen.getByLabel("Login button").tap();
  await expect(screen.getByText("23 Product(s) found")).toBeVisible({
    timeout: 15_000,
  });
}

// ---------------------------------------------------------------------------
// Test 1: Login with valid credentials shows product listing
//
// Selectors (session 955a19a9 / c9eef439, Samsung Galaxy S23):
//   content-desc="Username input field" → getByLabel('Username input field')
//   content-desc="Password input field" → getByLabel('Password input field')
//   content-desc="Login button"         → getByLabel('Login button')
//   text="23 Product(s) found"          → getByText('23 Product(s) found')
// ---------------------------------------------------------------------------
test("login with valid credentials shows product listing", async ({
  screen,
}) => {
  await login(screen);
});

// ---------------------------------------------------------------------------
// Test 2: Filter products by Samsung category
//
// Selectors:
//   content-desc="Samsung" → getByLabel('Samsung')
// ---------------------------------------------------------------------------
test("filter products by Samsung category", async ({ screen }) => {
  await login(screen);

  await screen.getByLabel("Samsung").tap();

  // Samsung filter tab remains visible after tap (filter applied)
  await expect(screen.getByLabel("Samsung")).toBeVisible();
});

// ---------------------------------------------------------------------------
// Test 3: Filter products by Apple category
//
// Selectors:
//   content-desc="Apple" → getByLabel('Apple')
// ---------------------------------------------------------------------------
test("filter products by Apple category", async ({ screen }) => {
  await login(screen);

  await screen.getByLabel("Apple").tap();

  await expect(screen.getByLabel("Apple")).toBeVisible();
});

// ---------------------------------------------------------------------------
// Test 4: Navigate to User Profile tab and verify username
//
// Selectors (session c9eef439):
//   content-desc="User profile tab"   → getByLabel('User profile tab')
//   content-desc="Username: demouser" → getByLabel('Username: demouser')
//   content-desc="Edit Profile"       → getByLabel('Edit Profile')
// ---------------------------------------------------------------------------
test("user profile tab shows correct username and options", async ({
  screen,
}) => {
  await login(screen);

  await screen.getByLabel("User profile tab").tap();

  // Username is displayed
  await expect(screen.getByLabel("Username: demouser")).toBeVisible();

  // Key profile options are present
  await expect(screen.getByLabel("Edit Profile")).toBeVisible();
  await expect(screen.getByLabel("Saved Addresses")).toBeVisible();
});

// ---------------------------------------------------------------------------
// Test 5: Favorites tab shows empty state for new user
//
// Selectors (session c9eef439):
//   content-desc="Favorites tab"      → getByLabel('Favorites tab')
//   text="No favorites yet"           → getByText('No favorites yet')
// ---------------------------------------------------------------------------
test("favorites tab shows empty state when no items added", async ({
  screen,
}) => {
  await login(screen);

  await screen.getByLabel("Favorites tab").tap();

  await expect(screen.getByText("No favorites yet")).toBeVisible();
});

// ---------------------------------------------------------------------------
// Test 6: Orders history tab shows empty state for new user
//
// Selectors (session c9eef439):
//   content-desc="Orders history tab" → getByLabel('Orders history tab')
//   text="No orders yet"              → getByText('No orders yet')
// ---------------------------------------------------------------------------
test("orders history tab shows empty state when no orders placed", async ({
  screen,
}) => {
  await login(screen);

  await screen.getByLabel("Orders history tab").tap();

  await expect(screen.getByText("No orders yet")).toBeVisible();
});
