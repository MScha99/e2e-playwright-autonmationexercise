import { expect, type Locator, type Page } from '@playwright/test'

/**
 * Represents a category-specific products page.
 * Handles product listings filtered by category.
 */
export class CategoryProductsPage {
  readonly page: Page
  readonly productsList: Locator

  /**
   * Creates an instance of CategoryProductsPage.
   * @param page - The Playwright Page object
   */
  constructor(page: Page) {
    this.page = page
    this.productsList = page.getByText('All Products  Added! Your')
  }

  /**
   * Verifies that products for a specific category are displayed.
   * @param categoryName - Name of the category to verify
   * @returns Promise that resolves when verification is complete
   */
  async verifyCategoryProductsDisplayed(categoryName: string): Promise<void> {
    await expect(this.productsList).toBeVisible()
    await expect(this.page.getByRole('heading')).toContainText(categoryName)
  }
}
