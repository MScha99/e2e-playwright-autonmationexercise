import { test, expect, type Page } from '@playwright/test'
import { AccountInformation, generateUniqueEmail } from '../../config/test_data'
import { HeaderComponent } from '../../components/header.component'
import { AppUrls } from '../../config/urls'
import { SignupLoginPage } from '../../pages/signup-login.page'

import { AccountDeletedPage } from '../../pages/account-deleted.page'
import { deleteUserAccount, createUserAccount } from '../../utils/accountUtils'

//TC-002: Login User with correct email and password
// TC-003: Login User with incorrect email and password
// TC-004: Logout User

test.describe('Login and logout user', () => {
  let signupLoginPage: SignupLoginPage
  let headerComponent: HeaderComponent
  const uniqueEmail = generateUniqueEmail()
  let shouldDeleteAccount: boolean //flag to be checked in afterEach segment

  //register account in the system to be used by login tests, then proceed to login page
  test.beforeEach(async ({ page }) => {
    headerComponent = new HeaderComponent(page)

    await page.goto(AppUrls.BASE_URL)
    signupLoginPage = await headerComponent.openSignupLoginPage()

    await createUserAccount(
      page,
      AccountInformation.valid.name,
      uniqueEmail,
      AccountInformation.valid.title,
      // AccountInformation.valid.name,
      AccountInformation.valid.password,
      AccountInformation.valid.dateOfBirth.day,
      AccountInformation.valid.dateOfBirth.month,
      AccountInformation.valid.dateOfBirth.year,
      AccountInformation.valid.newsletter,
      AccountInformation.valid.specialOffers,
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
    await page.goto(AppUrls.BASE_URL)
    await headerComponent.logoutButton.click()
    await expect(signupLoginPage.loginHeading).toBeVisible()
    shouldDeleteAccount = true //flag to be  checked in afterEach segment
  })

  test.afterEach(async ({ page }) => {
    // Conditionally delete the account if it hasn't been deleted during the test
    if (shouldDeleteAccount) {
      await deleteUserAccount(
        page,
        uniqueEmail,
        AccountInformation.valid.password
      )
    }
  })

  test('TC003 Login User with incorrect email and password', async ({
    page,
  }) => {
    await test.step('Attempt to login with incorrect credentials, and verify that it failed', async () => {
      await signupLoginPage.fillLoginFormAndSubmit(
        AccountInformation.invalid.email,
        AccountInformation.invalid.pasword
      )
      await expect(signupLoginPage.errorIncorrectUserCredentials).toBeVisible()
    })
  })

  test('TC004 Logout User', async ({ page }) => {
    await test.step('Login with correct credentials and verify logged-in status', async () => {})
    await signupLoginPage.fillLoginFormAndSubmit(
      uniqueEmail,
      AccountInformation.valid.password
    )
    await expect(headerComponent.loggedInAsUsername).toBeVisible()

    await test.step('Log out of the account', async () => {
      await headerComponent.logoutButton.click()
      await expect(page).toHaveURL(AppUrls.LOGIN)
    })
  })

  test('TC002 Login User with correct email and password', async ({ page }) => {
    await test.step('Login with correct credentials and verify logged-in status', async () => {
      await signupLoginPage.fillLoginFormAndSubmit(
        uniqueEmail,
        AccountInformation.valid.password
      )
      await expect(headerComponent.loggedInAsUsername).toBeVisible()
    })
    await test.step('Delete account', async () => {
      const accountDeletedPage = new AccountDeletedPage(page)
      await headerComponent.deleteAccountButton.click()
      await expect(accountDeletedPage.accountDeletedConfirmation).toBeVisible()
      await accountDeletedPage.continueButton.click()
      shouldDeleteAccount = false
    })
  })
})
