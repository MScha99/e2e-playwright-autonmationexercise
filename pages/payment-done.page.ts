import { type Locator, type Page } from '@playwright/test'

export class PaymentDonePage {
  readonly page: Page
  readonly orderConfirmed: Locator
  readonly downloadInvoiceButton: Locator
  readonly continueButton: Locator

  constructor(page: Page) {
    this.page = page
    this.orderConfirmed = page.getByText('Congratulations! Your order')
    this.downloadInvoiceButton = page.getByRole('link', { name: 'Download Invoice' })
    this.continueButton = page.getByRole('link', { name: 'Continue' })
  }
}
