import { expect, type Locator, type Page } from '@playwright/test'
import { CategoryComponent } from '../components/category.component'

/**
 * Represents a brand-specific products page.
 * Handles product listings filtered by brand.
 */
export class BrandProductsPage {
  readonly categoryComponent: CategoryComponent
  readonly page: Page
  readonly productsList: Locator
  readonly heading: Locator

  /**
   * Creates an instance of BrandProductsPage.
   * @param page - The Playwright Page object
   */
  constructor(page: Page) {
    this.page = page
    this.productsList = page.locator('.single-products')
    this.heading = page.getByRole('heading', { name: 'Brand -' })
    this.categoryComponent = new CategoryComponent(page)
  }

  /**
   * Verifies that products for a specific brand are displayed.
   * @param brandName - Name of the brand to verify
   */
  async verifyBrandProductsDisplayed(brandName: string): Promise<void> {
    await expect(this.heading).toContainText(brandName)
    await expect(this.productsList).toBeVisible()
  }
}
