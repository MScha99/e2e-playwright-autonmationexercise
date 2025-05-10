import { type Locator, type Page } from '@playwright/test'

/**
 * Modal component that appears during checkout process.
 * Provides options for registration/login or continuing with cart.
 */
export class CheckoutModalComponent {
  readonly page: Page
  readonly registerLoginLink: Locator
  readonly continueOnCartButton: Locator

  /**
   * Creates an instance of CheckoutModalComponent.
   * @param page - The Playwright Page object
   */
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
