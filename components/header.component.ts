import { type Locator, type Page } from '@playwright/test'
import { SignupLoginPage } from '../pages/signup-login.page'

/**
 * Represents the header navigation component.
 * Contains navigation links and user account management controls that are available across all pages.
 */
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

  /**
   * Creates an instance of HeaderComponent.
   * @param page - The Playwright Page object
   */
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

  /**
   * Opens the signup/login page.
   * @returns Promise with a new SignupLoginPage instance
   */
  async openSignupLoginPage(): Promise<SignupLoginPage> {
    await this.signupLoginPageLink.click()
    return new SignupLoginPage(this.page)
  }
}
