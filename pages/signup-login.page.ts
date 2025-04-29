import { type Locator, type Page } from '@playwright/test'
import { AccountCreatedPage } from './account-created.page'

export class SignupLoginPage {
  readonly page: Page
  //login form
  readonly loginHeading: Locator
  readonly loginEmailField: Locator
  readonly loginPasswordField: Locator
  readonly loginButton: Locator
  //register form
  readonly signupHeading: Locator
  readonly signupNameField: Locator
  readonly signupEmailField: Locator
  readonly signupButton: Locator
  //account information form (for registration)
  readonly enterAccountInformationHeading: Locator
  readonly radioTitleMr: Locator
  readonly radioTitleMrs: Locator
  readonly nameField: Locator
  readonly accountInformationEmailField: Locator
  readonly accountInformationPasswordField: Locator
  readonly birthDayDropdown: Locator
  readonly monthDayDropdown: Locator
  readonly yearDayDropdown: Locator
  readonly newsletterCheckbox: Locator
  readonly specialOffersCheckbox: Locator
  //addres information form (for registration)
  readonly firstNameField: Locator
  readonly lastNameField: Locator
  readonly companyField: Locator
  readonly addressField: Locator
  readonly address2Field: Locator
  readonly countryDropdown: Locator
  readonly stateField: Locator
  readonly cityField: Locator
  readonly zipCodeField: Locator
  readonly mobileNumberField: Locator
  readonly createAccountButton: Locator

  constructor(page: Page) {
    this.page = page

    ////////////////login form
    this.loginHeading = page.getByRole('heading', {
      name: 'Login to your account',
    })
    this.loginEmailField = page
      .locator('form')
      .filter({ hasText: 'Login' })
      .getByRole('textbox', { name: 'Email Address' })
    this.loginPasswordField = page
      .locator('form')
      .filter({ hasText: 'Login' })
      .getByRole('textbox', { name: 'Password' })
    this.loginButton = page.getByRole('button', { name: 'Login' })
    ////////////////

    ////////////////register form
    this.signupHeading = page.getByRole('heading', {
      name: 'New User Signup!',
    })
    this.signupNameField = page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByRole('textbox', { name: 'Name' })
    this.signupEmailField = page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByRole('textbox', { name: 'Email Address' })
    this.signupButton = page.getByRole('button', { name: 'Signup' })
    ////////////////

    ////////////////account information form (for registration)
    this.enterAccountInformationHeading = page.getByText(
      'Enter Account Information'
    )
    this.radioTitleMr = page.getByRole('radio', { name: 'Mr.' })
    this.radioTitleMrs = page.getByRole('radio', { name: 'Mrs.' })
    this.nameField = page.getByRole('textbox', { name: 'Name *', exact: true })
    this.accountInformationEmailField = page.getByRole('textbox', {
      name: 'Email',
    })
    this.accountInformationPasswordField = page.getByRole('textbox', {
      name: 'Password *',
    })

    //getByID does not work here for some reason
    this.birthDayDropdown = page.locator('[data-qa="days"]')
    this.monthDayDropdown = page.locator('[data-qa="months"]')
    this.yearDayDropdown = page.locator('[data-qa="years"]')

    this.newsletterCheckbox = page.getByRole('checkbox', {
      name: 'Sign up for our newsletter!',
    })
    this.specialOffersCheckbox = page.getByRole('checkbox', {
      name: 'Receive special offers from',
    })

    //address information form (for registration)
    this.firstNameField = page.getByRole('textbox', { name: 'First name *' })
    this.lastNameField = page.getByRole('textbox', { name: 'Last name *' })
    this.companyField = page.getByRole('textbox', {
      name: 'Company',
      exact: true,
    })
    this.addressField = page.getByRole('textbox', {
      name: 'Address * (Street address, P.',
    })
    this.address2Field = page.getByRole('textbox', { name: 'Address 2' })
    this.countryDropdown = page.getByLabel('Country *')
    this.stateField = page.getByRole('textbox', { name: 'State *' })
    this.cityField = page.getByRole('textbox', { name: 'City * Zipcode *' })
    this.zipCodeField = page
      .getByRole('paragraph')
      .filter({ hasText: 'Zipcode *' })
      .getByRole('textbox')
    this.mobileNumberField = page.getByRole('textbox', {
      name: 'Mobile Number *',
    })
    this.createAccountButton = page.getByRole('button', {
      name: 'Create Account',
    })
    ////////////////
  }

  async clickButtonToFinishRegistration() {
    await this.createAccountButton.click()
    return new AccountCreatedPage(this.page)
  }

  async fillNameEmailFields(name: string, email: string) {
    await this.signupNameField.fill(name)
    await this.signupEmailField.fill(email)
    await this.signupButton.click()
  }

  async fillAccountInformation(
    title: string,
    name: string,
    // email: string,
    password: string,
    day: string,
    month: string,
    year: string,
    subscribeNewsletter: boolean,
    receiveSpecialOffers: boolean
  ) {
    if (title === 'Mr.') {
      await this.radioTitleMr.check()
    } else {
      await this.radioTitleMrs.check()
    }
    await this.nameField.fill(name)
    // await this.accountInformationEmailField.fill(email)
    await this.accountInformationPasswordField.fill(password)
    await this.birthDayDropdown.selectOption(day)
    await this.monthDayDropdown.selectOption(month)
    await this.yearDayDropdown.selectOption(year)

    if (subscribeNewsletter) {
      await this.newsletterCheckbox.check()
    }
    if (receiveSpecialOffers) {
      await this.specialOffersCheckbox.check()
    }
  }

  async fillAddressInformation(
    firstName: string,
    lastName: string,
    company: string,
    address: string,
    address2: string,
    country: string,
    state: string,
    city: string,
    zipCode: string,
    mobileNumber: string
  ) {
    await this.firstNameField.fill(firstName)
    await this.lastNameField.fill(lastName)
    await this.companyField.fill(company)
    await this.addressField.fill(address)
    await this.address2Field.fill(address2)
    await this.countryDropdown.selectOption(country)
    await this.stateField.fill(state)
    await this.cityField.fill(city)
    await this.zipCodeField.fill(zipCode)
    await this.mobileNumberField.fill(mobileNumber)
  }
}
