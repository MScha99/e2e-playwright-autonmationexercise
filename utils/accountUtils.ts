import { expect, type Page } from '@playwright/test'
import { HeaderComponent } from '../components/header.component'
import { SignupLoginPage } from '../pages/signup-login.page'
import { AccountDeletedPage } from '../pages/account-deleted.page'
import { AccountCreatedPage } from '../pages/account-created.page'


//requires to be at the registration page
export async function deleteUserAccount(
  page: Page,
  email: string,
  password: string
) {
  const signupLoginPage = new SignupLoginPage(page)
  const headerComponent = new HeaderComponent(page)
  const accountDeletedPage = new AccountDeletedPage(page)

  
  await signupLoginPage.fillLoginFormAndSubmit(email, password)
  await headerComponent.deleteAccountButton.click()
  await expect(accountDeletedPage.accountDeletedConfirmation).toBeVisible()
  await accountDeletedPage.continueButton.click()
}

//requires to be at the registration page
export async function createUserAccount(
  page: Page,
  name: string,
  email: string,
  title: string,
  //name: string,
  // email: string,
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
) {
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
