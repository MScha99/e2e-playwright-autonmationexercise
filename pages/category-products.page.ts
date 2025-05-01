import { expect, type Locator, type Page } from '@playwright/test'

export class CategoryProductsPage {
  readonly page: Page
  readonly productsList: Locator

  constructor(page: Page) {
    this.page = page
    this.productsList = page.getByText('All Products  Added! Your')
  }
}
