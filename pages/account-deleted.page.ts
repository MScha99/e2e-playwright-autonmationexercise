import { type Locator, type Page } from '@playwright/test'

/**
 * Represents the page shown after account deletion.
 * Handles account deletion confirmation and navigation.
 */
export class AccountDeletedPage {
  readonly page: Page
  readonly accountDeletedConfirmation: Locator
  readonly continueButton: Locator

  /**
   * Creates an instance of AccountDeletedPage.
   * @param page - The Playwright Page object
   */
  constructor(page: Page) {
    this.page = page
    this.accountDeletedConfirmation = page.getByText('Account Deleted!')
    this.continueButton = page.getByRole('link', { name: 'Continue' })
  }
}

