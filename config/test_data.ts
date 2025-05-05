export const AccountInformation = {
  valid: {
    title: 'Mr.',
    name: 'maciej',
    takenEmail: 'test@gmail.com',
    password: 'TestPass123!',
    dateOfBirth: {
      day: '15',
      month: '5',
      year: '1990',
    },
    newsletter: true,
    specialOffers: true,
    address: {
      firstName: 'Maciej',
      lastName: 'Smith',
      company: 'Test Company Ltd',
      address1: '123 Test Street',
      address2: 'Apt 4B',
      country: 'India',
      state: 'Delhi',
      city: 'New Delhi',
      zipcode: '110001',
      mobileNumber: '+91 9876543210',
    },
  },
  invalid: {
    email: 'abecadl@gmail.com',
    pasword: '123blabla123',
  },
}

export function generateUniqueEmail(baseEmail = 'abecadlo@gmail.com') {
  const [name, domain] = baseEmail.split('@')
  return `${name}+${Date.now()}@${domain}`
}

export const contactUsInformation = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  subject: 'Inquiry about services',
  message:
    'I would like to know more about your services. Please provide details.',
}

export const products = {
  queryForProductSearch: 'pink',
  reviewForm: {
    name: 'jon smith',
    email: 'abecadl@gmail.com',
    review:
      'Great product! High quality and exactly as described. Highly recommend!',
  },
}
