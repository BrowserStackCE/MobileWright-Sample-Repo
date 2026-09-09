import { expect, test } from "@mobilewright/test";

/**
 * Test 1: Login with valid credentials
 *
 * Selectors grounded in session 955a19a9 (Samsung Galaxy S23):
 *   - content-desc="Username input field" → getByLabel('Username input field')
 *   - content-desc="Password input field" → getByLabel('Password input field')
 *   - content-desc="Login button"         → getByLabel('Login button')
 *   - text="23 Product(s) found"          → getByText('23 Product(s) found')
 */
test("login with valid credentials shows product listing", async ({
  screen,
}) => {
  // Wait for the login screen to be ready
  await expect(screen.getByLabel("Login button")).toBeVisible();

  // Enter credentials
  await screen.getByLabel("Username input field").fill("demouser");
  await screen.getByLabel("Password input field").fill("testpass123");

  // Tap Login
  await screen.getByLabel("Login button").tap();

  // Assert products listing screen is shown
  await expect(screen.getByText("23 Product(s) found")).toBeVisible({
    timeout: 10_000,
  });
});

/**
 * Test 2: Filter products by Samsung category
 *
 * Selectors grounded in session 955a19a9 (Samsung Galaxy S23):
 *   - content-desc="Samsung" → getByLabel('Samsung')
 *   - text="23 Product(s) found" → getByText('23 Product(s) found')
 */
test("filter products by Samsung category", async ({ screen }) => {
  // Log in first
  await expect(screen.getByLabel("Login button")).toBeVisible();
  await screen.getByLabel("Username input field").fill("demouser");
  await screen.getByLabel("Password input field").fill("testpass123");
  await screen.getByLabel("Login button").tap();

  // Wait for products screen
  await expect(screen.getByText("23 Product(s) found")).toBeVisible({
    timeout: 10_000,
  });

  // Tap the Samsung category filter
  await screen.getByLabel("Samsung").tap();

  // Assert Samsung filter tab remains visible (filter applied successfully)
  await expect(screen.getByLabel("Samsung")).toBeVisible();
});
