import { type Locator, type Page } from '@playwright/test'

/**
 * Represents the page shown after successful account creation.
 * Handles account creation confirmation and navigation.
 */
export class AccountCreatedPage {
  readonly page: Page
  readonly accountCreatedConfirmation: Locator
  readonly continueButton: Locator

  /**
   * Creates an instance of AccountCreatedPage.
   * @param page - The Playwright Page object
   */
  constructor(page: Page) {
    this.page = page

    this.accountCreatedConfirmation = page.getByText('Account Created!')
    this.continueButton = page.getByRole('link', { name: 'Continue' })
  }
}

