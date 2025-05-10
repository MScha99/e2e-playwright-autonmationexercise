import { type Locator, type Page } from '@playwright/test'

/**
 * Represents the product details page.
 * Handles display and interaction with detailed product information, reviews, and purchase options.
 */
export class ProductDetailsPage {
  readonly page: Page
  readonly productName: Locator
  readonly productCategory: Locator
  readonly productPrice: Locator
  readonly productAvailability: Locator
  readonly productCondition: Locator
  readonly brand: Locator
  readonly writeYourReviewHeading: Locator
  readonly reviewNameField: Locator
  readonly reviewEmailField: Locator
  readonly reviewTextField: Locator
  readonly submitReviewButton: Locator
  readonly reviewSubmitConfirmationText: Locator
  readonly productQuantity: Locator
  readonly addToCartButton: Locator

  /**
   * Creates an instance of ProductDetailsPage.
   * @param page - The Playwright Page object
   */
  constructor(page: Page) {
    this.page = page
    this.productName = page
      .locator('css=.product-information')
      .getByRole('heading')
      .first()
    this.productCategory = page.getByText('Category:')
    this.productPrice = page
      .locator('span:left-of(label:text("Quantity:"))')
      .first()
    this.productAvailability = page.getByText(/^Availability: .+/)
    this.productCondition = page.getByText(/^Condition: .+/)
    this.brand = page.getByText(/^Brand: .+/)
    this.writeYourReviewHeading = page.getByRole('link', { name: 'Write Your Review' })
    this.reviewNameField = page.getByRole('textbox', { name: 'Your Name' })
    this.reviewEmailField = page.getByRole('textbox', { name: 'Email Address', exact: true })
    this.reviewTextField = page.getByRole('textbox', { name: 'Add Review Here!' })
    this.submitReviewButton = page.getByRole('button', { name: 'Submit' })
    this.reviewSubmitConfirmationText = page.getByText('Thank you for your review')
    this.productQuantity = page.getByRole('spinbutton')
    this.addToCartButton = page.getByRole('button', { name: ' Add to cart' })
  }
}
