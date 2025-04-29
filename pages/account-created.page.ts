import { type Locator, type Page } from '@playwright/test'

export class AccountCreatedPage {
  readonly page: Page
  readonly accountCreatedConfirmation: Locator
  readonly continueButton: Locator

  constructor(page: Page) {
    this.page = page

    this.accountCreatedConfirmation = page.getByText('Account Created!')
    this.continueButton = page.getByRole('link', { name: 'Continue' })
  }
}

