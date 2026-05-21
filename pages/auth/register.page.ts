import BasePage from '../base.page';
import type { Page } from '@playwright/test';

export type RegisterUserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  country: string;
  postalCode: string;
  houseNumber: string;
  street: string;
  city: string;
  state: string;
  phone: string;
};

export default class RegisterPage extends BasePage {
  readonly firstNameInput;
  readonly lastNameInput;
  readonly emailInput;
  readonly passwordInput;
  readonly dobInput;
  readonly countrySelect;
  readonly postalCodeInput;
  readonly houseNumberInput;
  readonly streetInput;
  readonly cityInput;
  readonly stateInput;
  readonly phoneInput;
  readonly registerButton;
  readonly errorMessage;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = this.page.getByLabel(/first name/i);
    this.lastNameInput = this.page.getByLabel(/last name/i);
    this.emailInput = this.page.getByLabel(/email/i);
    this.passwordInput = this.page.getByLabel(/password/i);
    this.dobInput = this.page.getByLabel(/date of birth|dob/i);
    this.countrySelect = this.page.getByRole('combobox', { name: /country/i });
    this.postalCodeInput = this.page.getByLabel(/postal code|postcode|zip/i);
    this.houseNumberInput = this.page.getByLabel(/house number|house #|number/i);
    this.streetInput = this.page.getByLabel(/street|address line 1|address/i);
    this.cityInput = this.page.getByLabel(/city/i);
    this.stateInput = this.page.getByLabel(/state|province|region/i);
    this.phoneInput = this.page.getByLabel(/phone|telephone|mobile/i);
    this.registerButton = this.page.getByRole('button', { name: /register|sign up/i });
    this.errorMessage = this.page.getByRole('alert').locator('text=/error|invalid|failed/i');
  }

  async register(userData: RegisterUserData): Promise<void> {
    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.emailInput.fill(userData.email);
    await this.passwordInput.fill(userData.password);
    await this.dobInput.fill(userData.dateOfBirth);
    await this.countrySelect.selectOption({ label: userData.country });
    await this.postalCodeInput.fill(userData.postalCode);
    await this.houseNumberInput.fill(userData.houseNumber);
    await this.streetInput.fill(userData.street);
    await this.cityInput.fill(userData.city);
    await this.stateInput.fill(userData.state);
    await this.phoneInput.fill(userData.phone);
    await this.registerButton.click();
  }

  async getErrorMessage(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }
}
