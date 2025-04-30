import { type Locator, type Page } from '@playwright/test'
import { SignupLoginPage } from '../pages/signup-login.page'

export class HeaderComponent {
  readonly page: Page
  readonly homePageLink: Locator
  readonly productPageLink: Locator
  readonly cartPageLink: Locator
  readonly signupLoginPageLink: Locator
  readonly contactUsPageLink: Locator
  readonly testCasesPageLink: Locator
  readonly loggedInAsUsername: Locator
  readonly logoutButton: Locator
  readonly deleteAccountButton: Locator
  readonly accountDeletionConfirmation: Locator

  constructor(page: Page) {
    this.page = page
    this.homePageLink = page.getByRole('link', {
      name: 'Website for automation',
    })
    this.productPageLink = page.getByRole('link', { name: ' Products' })
    this.cartPageLink = page.getByRole('link', { name: ' Cart' })
    this.signupLoginPageLink = page.getByRole('link', {
      name: ' Signup / Login',
    })
    this.contactUsPageLink = page
      .getByRole('listitem')
      .filter({ hasText: 'Contact us' })

    this.testCasesPageLink = page.getByRole('link', { name: ' Test Cases' })

    this.loggedInAsUsername = page.getByText('Logged in as ')

    this.logoutButton = page.getByRole('link', { name: ' Logout' })

    this.deleteAccountButton = page.getByRole('link', {
      name: ' Delete Account',
    })

    this.accountDeletionConfirmation = page.getByText('Account Deleted!')

  }
  async openSignupLoginPage() {
    await this.signupLoginPageLink.click()
    return new SignupLoginPage(this.page)
  }
}
