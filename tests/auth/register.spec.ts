import { test, expect, type Page } from '@playwright/test'

import { AccountInformation, generateUniqueEmail } from '../../config/test_data'
import { HeaderComponent } from '../../components/header.component'
import { AppUrls } from '../../config/urls'
import { SignupLoginPage } from '../../pages/signup-login.page'
import { AccountDeletedPage } from '../../pages/account-deleted.page'
import { createUserAccount } from '../../utils/accountUtils'
//TC-001: Register User, TC-005: Register User with existing email

test.describe('Register user', () => {
  let signupLoginPage: SignupLoginPage
  let headerComponent: HeaderComponent

  test.beforeEach(async ({ page }) => {
    await page.goto(AppUrls.BASE_URL)
    headerComponent = new HeaderComponent(page)
    signupLoginPage = await headerComponent.openSignupLoginPage()
    await expect(signupLoginPage.signupHeading).toBeVisible()
  })

  test('TC001 Register User', async ({ page }) => {
    await test.step('fill out account information and address information forms, proceed and verify success', async () => {
      await expect(signupLoginPage.signupHeading).toBeVisible()

      await createUserAccount(
        page,
        AccountInformation.valid.name,
        generateUniqueEmail(),
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
    })

    await test.step('Delete this account', async () => {
      const accountDeletedPage = new AccountDeletedPage(page)

      await headerComponent.deleteAccountButton.click()
      await expect(accountDeletedPage.accountDeletedConfirmation).toBeVisible()
      await accountDeletedPage.continueButton.click()
    })
  })

  test('TC005 Register User with existing email', async ({ page }) => {
    await signupLoginPage.fillInitialSignupFormAndSubmit(
      AccountInformation.valid.name,
      AccountInformation.valid.takenEmail
    )

    await expect(signupLoginPage.errorEmailAlreadyExists).toBeVisible()
  })
})
