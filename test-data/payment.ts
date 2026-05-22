export const validCreditCard = {
  cardNumber: '4111-1111-1111-1111',
  expiry: '03/2030',
  cvv: '737',
  cardHolderName: 'Test User',
};

export const invalidCreditCard = {
  invalidCardNumber: '1234567890123456',
  invalidCvv: '99',
  invalidCardHolderName: '',
};

export const cashOnDelivery = {
  method: 'Cash on Delivery',
};

export const PAYMENT_METHODS = {
  CREDIT_CARD: 'Credit Card',
  CASH_ON_DELIVERY: 'Cash on Delivery',
} as const;
