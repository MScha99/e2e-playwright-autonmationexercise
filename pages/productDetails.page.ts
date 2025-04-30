import { type Locator, type Page } from '@playwright/test'

export class ProductDetailsPage {
  readonly page: Page
  readonly productName: Locator
  readonly productCategory: Locator
  readonly productPrice: Locator
  readonly productAvailability: Locator
  readonly productCondition: Locator
  readonly brand: Locator

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
  }
}
