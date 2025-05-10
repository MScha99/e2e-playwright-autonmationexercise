import { type Locator, type Page } from '@playwright/test'

export class CheckoutModalComponent {
  readonly page: Page
  readonly registerLoginLink: Locator
  readonly continueOnCartButton: Locator

  constructor(page: Page) {
    this.page = page
    this.registerLoginLink = page.getByRole('link', {
      name: 'Register / Login',
    })
    this.continueOnCartButton = page.getByRole('button', {
      name: 'Continue On Cart',
    })
  }
}
