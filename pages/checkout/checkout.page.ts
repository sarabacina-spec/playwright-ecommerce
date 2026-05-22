import BasePage from '../base.page';
import type { Page } from '@playwright/test';

export type BillingAddressData = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
  phone: string;
};

export type CreditCardData = {
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardHolderName: string;
};

export type BankTransferData = {
  bankName: string;
  accountNumber: string;
};

export type GiftCardData = {
  code: string;
};

export default class CheckoutPage extends BasePage {
  readonly signInButton;
  readonly continueAsGuestButton;
  readonly firstNameInput;
  readonly lastNameInput;
  readonly addressInput;
  readonly cityInput;
  readonly stateInput;
  readonly countryInput;
  readonly postcodeInput;
  readonly phoneInput;
  readonly proceedToPaymentButton;
  readonly paymentMethodSelect;
  readonly cardNumberInput;
  readonly expiryInput;
  readonly cvvInput;
  readonly cardHolderNameInput;
  readonly bankNameInput;
  readonly accountNumberInput;
  readonly giftCardCodeInput;
  readonly confirmButton;
  readonly successMessage;
  readonly errorMessage;

  constructor(page: Page) {
    super(page);
    this.signInButton = this.page.getByRole('button', { name: /sign in|proceed/i });
    this.continueAsGuestButton = this.page.getByRole('button', { name: /continue as guest|guest checkout/i });
    this.firstNameInput = this.page.getByLabel(/first name/i);
    this.lastNameInput = this.page.getByLabel(/last name/i);
    this.addressInput = this.page.getByLabel(/address|street/i);
    this.cityInput = this.page.getByLabel(/city/i);
    this.stateInput = this.page.getByLabel(/state|province|region/i);
    this.countryInput = this.page.getByRole('combobox', { name: /country/i });
    this.postcodeInput = this.page.getByLabel(/postcode|postal code|zip/i);
    this.phoneInput = this.page.getByLabel(/phone|telephone|mobile/i);
    this.proceedToPaymentButton = this.page.getByRole('button', { name: /proceed to next step|proceed to payment|next/i });
    this.paymentMethodSelect = this.page.getByRole('combobox', { name: /payment method|payment type/i });
    this.cardNumberInput = this.page.getByLabel(/card number|credit card number/i);
    this.expiryInput = this.page.getByLabel(/expiry|expiration date|exp date/i);
    this.cvvInput = this.page.getByLabel(/cvv|cvc/i);
    this.cardHolderNameInput = this.page.getByLabel(/card holder name|cardholder name|name on card/i);
    this.bankNameInput = this.page.getByLabel(/bank name|bank/i);
    this.accountNumberInput = this.page.getByLabel(/account number|iban|bban/i);
    this.giftCardCodeInput = this.page.getByLabel(/gift card|gift card code|code/i);
    this.confirmButton = this.page.getByRole('button', { name: /confirm|pay|place order|proceed/i });
    this.successMessage = this.page.getByRole('status').locator('text=/success|thank you|order confirmed/i');
    this.errorMessage = this.page.getByRole('alert').locator('text=/error|failed|invalid/i');
  }

  async proceedAsGuest(): Promise<void> {
    await this.continueAsGuestButton.click();
  }

  async proceedAsLoggedInUser(): Promise<void> {
    await this.signInButton.click();
  }

  async fillBillingAddress(data: BillingAddressData): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.addressInput.fill(data.address);
    await this.cityInput.fill(data.city);
    await this.stateInput.fill(data.state);
    await this.countryInput.selectOption({ label: data.country });
    await this.postcodeInput.fill(data.postcode);
    await this.phoneInput.fill(data.phone);
  }

  async proceedToPayment(): Promise<void> {
    await this.proceedToPaymentButton.click();
  }

  async selectPaymentMethod(
    method: 'Credit Card' | 'Bank Transfer' | 'Gift Card' | 'Cash on Delivery'
  ): Promise<void> {
    await this.paymentMethodSelect.selectOption({ label: method });
  }

  async fillCreditCardDetails(data: CreditCardData): Promise<void> {
    await this.cardNumberInput.fill(data.cardNumber);
    await this.expiryInput.fill(data.expiry);
    await this.cvvInput.fill(data.cvv);
    await this.cardHolderNameInput.fill(data.cardHolderName);
  }

  async fillBankTransferDetails(data: BankTransferData): Promise<void> {
    await this.bankNameInput.fill(data.bankName);
    await this.accountNumberInput.fill(data.accountNumber);
  }

  async fillGiftCardDetails(code: string): Promise<void> {
    await this.giftCardCodeInput.fill(code);
  }

  async confirmOrder(): Promise<void> {
    await this.confirmButton.click();
  }

  async getSuccessMessage(): Promise<string | null> {
    return await this.successMessage.textContent();
  }

  async getErrorMessage(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }
}
