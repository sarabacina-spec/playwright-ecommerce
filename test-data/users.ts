export const existingUser = {
  email: 'customer@practicesoftwaretesting.com',
  password: 'welcome01',
};

export const newUser = {
  firstName: 'Test',
  lastName: 'User',
  email: `test_${Date.now()}@example.com`,
  password: 'Test1234123@#!',
  dateOfBirth: '01/01/1990',
  country: 'United States of America (the)',
  postalCode: '12345',
  houseNumber: '10',
  street: 'Main Street',
  city: 'New York',
  state: 'New York',
  phone: '0612345678',
};

export const invalidUser = {
  unregisteredEmail: 'notregistered@example.com',
  wrongPassword: 'WrongPass123!',
};
