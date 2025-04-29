import { test, expect, type Page } from '@playwright/test'

import { AccountInformation, generateUniqueEmail } from '../../config/test_data'
import { HeaderComponent } from '../../components/header.component'
import { AppUrls } from '../../config/urls'
import { SignupLoginPage } from '../../pages/signup-login.page'
import { AccountCreatedPage } from '../../pages/account-created.page'
import { AccountDeletedPage } from '../../pages/account-deleted.page'
//TC-002: Login User with correct email and password
// TC-003: Login User with incorrect email and password
// TC-004: Logout User

test.describe('Login and logout user', () => {
  let signupLoginPage: SignupLoginPage
  let headerComponent: HeaderComponent
  const uniqueEmail = generateUniqueEmail()

  test.beforeEach(async ({ page }) => {
    const accountCreatedPage = new AccountCreatedPage(page)

    await page.goto(AppUrls.BASE_URL)
    headerComponent = new HeaderComponent(page)
    signupLoginPage = await headerComponent.openSignupLoginPage()
    await signupLoginPage.fillNameEmailFields(
      AccountInformation.valid.name,
      uniqueEmail
    )
    await expect(signupLoginPage.enterAccountInformationHeading).toBeVisible()

    await signupLoginPage.fillAccountInformation(
      AccountInformation.valid.title,
      AccountInformation.valid.name,
      AccountInformation.valid.password,
      AccountInformation.valid.dateOfBirth.day,
      AccountInformation.valid.dateOfBirth.month,
      AccountInformation.valid.dateOfBirth.year,
      AccountInformation.valid.newsletter,
      AccountInformation.valid.specialOffers
    )

    await signupLoginPage.fillAddressInformation(
      AccountInformation.valid.address.firstName,
      AccountInformation.valid.address.lastName,
      AccountInformation.valid.address.company,
      AccountInformation.valid.address.address1,
      AccountInformation.valid.address.address2,
      AccountInformation.valid.address.country,
      AccountInformation.valid.address.state,
      AccountInformation.valid.address.city,
      AccountInformation.valid.address.zipcode,
      AccountInformation.valid.address.mobileNumber
    )

    await signupLoginPage.createAccountButton.click()

    await expect(accountCreatedPage.accountCreatedConfirmation).toBeVisible()
    await accountCreatedPage.continueButton.click()
    await expect(headerComponent.loggedInAsUsername).toBeVisible()
    await headerComponent.logoutButton.click()
    await page.goto(AppUrls.BASE_URL)
  })

  test('TC002 Login User with correct email and password', async ({ page }) => {
    await test.step('todo', async () => {
     
    })
    await test.step('todo', async () => {})

    await test.step('todo', async () => {
     
    })
  })
  test('TC003 Login User with incorrect email and password', async ({ page }) => {
    await test.step('todo', async () => {
     
    })
    await test.step('todo', async () => {})

    await test.step('todo', async () => {
     
    })
  })
 

  test('TC004 Logout User', async ({ page }) => {
    await test.step('todo', async () => {
     
    })
    await test.step('todo', async () => {})

    await test.step('todo', async () => {
     
    })
  })
})
