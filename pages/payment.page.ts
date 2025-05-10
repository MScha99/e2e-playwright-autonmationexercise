import { type Locator, type Page } from '@playwright/test'

export class PaymentPage {
  readonly page: Page
  readonly nameOnCardField: Locator
  readonly cardNumberField: Locator
  readonly cvcField: Locator
  readonly expirationMonthFIeld: Locator
  readonly expirationYearField: Locator
  readonly payAndConfirmButton: Locator

  constructor(page: Page) {
    this.page = page
    this.nameOnCardField = page.locator('[data-qa="name-on-card"]')
    this.cardNumberField = page.locator('[data-qa="card-number"]')
    this.cvcField = page.locator('[data-qa="cvc"]')
    this.expirationMonthFIeld = page.locator('[data-qa="expiry-month"]')
    this.expirationYearField = page.locator('[data-qa="expiry-year"]')
    this.payAndConfirmButton = page.getByRole('button', {
      name: 'Pay and Confirm Order',
    })
  }

  async fillPaymentDetails(
    nameOnCard: string,
    cardNumber: string,
    cvc: string,
    expirationMonth: string,
    expirationYear: string
  ) {
    await this.nameOnCardField.fill(nameOnCard)
    await this.cardNumberField.fill(cardNumber)
    await this.cvcField.fill(cvc)
    await this.expirationMonthFIeld.fill(expirationMonth)
    await this.expirationYearField.fill(expirationYear)
  }
}
