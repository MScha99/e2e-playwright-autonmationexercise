import { type Locator, type Page } from '@playwright/test'

/**
 * Represents the page shown after successful payment.
 * Handles order confirmation and invoice download functionality.
 */
export class PaymentDonePage {
  readonly page: Page
  readonly orderConfirmed: Locator
  readonly downloadInvoiceButton: Locator
  readonly continueButton: Locator

  /**
   * Creates an instance of PaymentDonePage.
   * @param page - The Playwright Page object
   */
  constructor(page: Page) {
    this.page = page
    this.orderConfirmed = page.getByText('Congratulations! Your order')
    this.downloadInvoiceButton = page.getByRole('link', { name: 'Download Invoice' })
    this.continueButton = page.getByRole('link', { name: 'Continue' })
  }
}
