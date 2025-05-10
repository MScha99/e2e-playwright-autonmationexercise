import { type Locator, type Page } from '@playwright/test'

/**
 * Represents the payment page where users enter payment details.
 * Handles payment form fields and submission.
 */
export class PaymentPage {
  readonly page: Page
  readonly nameOnCardField: Locator
  readonly cardNumberField: Locator
  readonly cvcField: Locator
  readonly expirationMonthFIeld: Locator
  readonly expirationYearField: Locator
  readonly payAndConfirmButton: Locator

  /**
   * Creates an instance of PaymentPage.
   * @param page - The Playwright Page object
   */
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

  /**
   * Fills out the payment form with card details.
   * @param nameOnCard - Name as it appears on the card
   * @param cardNumber - Credit card number
   * @param cvc - Card verification code
   * @param expirationMonth - Card expiration month
   * @param expirationYear - Card expiration year
   */
  async fillPaymentDetails(
    nameOnCard: string,
    cardNumber: string,
    cvc: string,
    expirationMonth: string,
    expirationYear: string
  ): Promise<void> {
    await this.nameOnCardField.fill(nameOnCard)
    await this.cardNumberField.fill(cardNumber)
    await this.cvcField.fill(cvc)
    await this.expirationMonthFIeld.fill(expirationMonth)
    await this.expirationYearField.fill(expirationYear)
  }
}
