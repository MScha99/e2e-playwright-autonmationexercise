import { type Locator, type Page } from '@playwright/test'

export class AccountDeletedPage {
  readonly page: Page
  readonly accountDeletedConfirmation: Locator
  readonly continueButton: Locator

  constructor(page: Page) {
    this.page = page

    this.accountDeletedConfirmation = page.getByText('Account Deleted!')
    this.continueButton = page.getByRole('link', { name: 'Continue' })
  }
}

