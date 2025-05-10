import { expect, type Page } from '@playwright/test'
import { HeaderComponent } from '../components/header.component'
import { SignupLoginPage } from '../pages/signup-login.page'
import { AccountDeletedPage } from '../pages/account-deleted.page'
import { AccountCreatedPage } from '../pages/account-created.page'

/**
 * Deletes a user account after logging in.
 * Must be called when on the registration page.
 * @param page - The Playwright Page object
 * @param email - User's email for login
 * @param password - User's password for login
 */
export async function deleteUserAccount(
  page: Page,
  email: string,
  password: string
): Promise<void> {
  const signupLoginPage = new SignupLoginPage(page)
  const headerComponent = new HeaderComponent(page)
  const accountDeletedPage = new AccountDeletedPage(page)

  
  await signupLoginPage.fillLoginFormAndSubmit(email, password)
  await headerComponent.deleteAccountButton.click()
  await expect(accountDeletedPage.accountDeletedConfirmation).toBeVisible()
  await accountDeletedPage.continueButton.click()
}

/**
 * Creates a new user account with complete registration details.
 * Must be called when on the registration page.
 * @param page - The Playwright Page object
 * @param name - User's display name
 * @param email - User's email address
 * @param title - User's title (Mr./Mrs.)
 * @param password - Account password
 * @param day - Birth day
 * @param month - Birth month
 * @param year - Birth year
 * @param subscribeNewsletter - Whether to subscribe to newsletter
 * @param receiveSpecialOffers - Whether to receive special offers
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @param company - User's company
 * @param address - User's address
 * @param address2 - User's secondary address
 * @param country - User's country
 * @param state - User's state
 * @param city - User's city
 * @param zipCode - User's zip code
 * @param mobileNumber - User's mobile number
 */
export async function createUserAccount(
  page: Page,
  name: string,
  email: string,
  title: string,
  password: string,
  day: string,
  month: string,
  year: string,
  subscribeNewsletter: boolean,
  receiveSpecialOffers: boolean,
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
): Promise<void> {
  const signupLoginPage = new SignupLoginPage(page)
  const headerComponent = new HeaderComponent(page)
  const accountCreatedPage = new AccountCreatedPage(page)

  await signupLoginPage.fillInitialSignupFormAndSubmit(name, email)
  await signupLoginPage.fillOutRegistrationForm(
    title,
    password,
    day,
    month,
    year,
    subscribeNewsletter,
    receiveSpecialOffers,
    firstName,
    lastName,
    company,
    address,
    address2,
    country,
    state,
    city,
    zipCode,
    mobileNumber
  )
  await signupLoginPage.createAccountButton.click({force: true}) 
  await expect(accountCreatedPage.accountCreatedConfirmation).toBeVisible()
  await accountCreatedPage.continueButton.click()
  await expect(headerComponent.loggedInAsUsername).toBeVisible()
}
