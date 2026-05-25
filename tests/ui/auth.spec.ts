import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/auth/login.page';
import RegisterPage from '../../pages/auth/register.page';
import HomePage from '../../pages/home.page';
import { existingUser, newUser, invalidUser } from '../../test-data/users';

test.describe('Authentication Tests', () => {
  const BASE_URL = 'https://practicesoftwaretesting.com';

  test('TC001 - Successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    // Navigate to login page
    await loginPage.navigate('/auth/login');
    await loginPage.waitForPageLoad();

    // Login with valid credentials
    await loginPage.login(existingUser.email, existingUser.password);
    await page.waitForURL('**/account');

    // Assert URL contains /account
    expect(page.url()).toContain('/account');

    // Assert username 'Jane' is visible in the navigation
    expect(await homePage.getUserName()).toContain('Jane');
  });

  test('TC002 - Login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to login page
    await loginPage.navigate('/auth/login');
    await loginPage.waitForPageLoad();

    // Login with valid email but invalid password
    await loginPage.login(existingUser.email, invalidUser.wrongPassword);
    await page.waitForLoadState('networkidle');

    // Assert error message is visible
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).not.toBeNull();
    expect(errorMessage?.toLowerCase()).toMatch(/error|invalid|failed/);

    // Assert URL still contains /auth/login
    expect(page.url()).toContain('/auth/login');
  });

  test('TC003 - Login with unregistered email', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to login page
    await loginPage.navigate('/auth/login');
    await loginPage.waitForPageLoad();

    // Login with unregistered email
    await loginPage.login(invalidUser.unregisteredEmail, 'anypassword123');
    await page.waitForLoadState('networkidle');

    // Assert error message is visible
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).not.toBeNull();
    expect(errorMessage?.toLowerCase()).toMatch(/error|invalid|failed|not found|not registered/i);
  });

  test('TC004 - Successful logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    // Navigate to login page
    await loginPage.navigate('/auth/login');
    await loginPage.waitForPageLoad();

    // Login with valid credentials
    await loginPage.login(existingUser.email, existingUser.password);
    await page.waitForLoadState('networkidle');

    // Logout using home page helper
    await homePage.logout();
    await homePage.signInLink.waitFor();

    // Assert user is logged out
    expect(await homePage.isLoggedOut()).toBeTruthy();

  });

  test('TC005 - Successful user registration', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await registerPage.navigate('/auth/register');
    await registerPage.waitForPageLoad();

    const testEmail = `test_${Date.now()}@example.com`;
    const registerData = { ...newUser, email: testEmail };
    await registerPage.register(registerData);
    await page.waitForLoadState('networkidle');

    expect(await homePage.isLoggedOut()).toBeTruthy();

    await loginPage.navigate('/auth/login');
    await loginPage.waitForPageLoad();
    await loginPage.login(testEmail, newUser.password);
    
await page.waitForSelector('[data-test="nav-menu"]', { state: 'visible' });

    expect(await homePage.getUserName()).toContain('Test');
  });

  test('TC006 - Registration with already existing email', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const duplicateUser = { ...newUser, email: existingUser.email };

    await registerPage.navigate('/auth/register');
    await registerPage.waitForPageLoad();

    await registerPage.register(duplicateUser);
    
    const errorMessage = await registerPage.getRegisterError();
    expect(errorMessage).not.toBeNull();
    expect(errorMessage).toContain('A customer with this email address already exists.');
  });

  test('TC007 - Registration with invalid email format', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const invalidEmailUser = { ...newUser, email: 'invalidemail' };

    await registerPage.navigate('/auth/register');
    await registerPage.waitForPageLoad();

    await registerPage.register(invalidEmailUser);
    await page.waitForLoadState('networkidle');

    const errorMessage = await registerPage.getEmailError();
    expect(errorMessage).not.toBeNull();
    expect(errorMessage).toContain('Email format is invalid');
  });
});
