import { expect, type Locator, type Page } from '@playwright/test'

/**
 * Component that handles brand filtering functionality.
 * Provides interface for selecting and filtering products by brand.
 */
export class BramdComponent {
  readonly page: Page
  readonly brandList: Locator
readonly brandWomen: Locator
  readonly brandOfProducts: Locator
readonly subbrandOfProducts: Locator
  readonly brandAndSubbrandHeading: Locator

  /**
   * Creates an instance of BrandComponent.
   * @param page - The Playwright Page object
   */
  constructor(page: Page) {
    this.page = page
    this.brandList = page.locator('.brands-name')

    this.brandOfProducts = this.brandList.getByRole('link')

    this.brandAndSubbrandHeading = page.getByRole('heading')
  }

  /**
   * Selects a brand by its position in the list.
   * @param nth - Zero-based index of the brand to select
   * @returns Promise with the selected brand name
   */
  async selectNthProductBrand(nth = 0): Promise<string> {
    const nthElement = this.brandOfProducts.nth(nth)
    console.log('Selected Brand:', await nthElement.textContent())
    await this.brandOfProducts.nth(nth).click()
    const subbrandName = await nthElement.textContent()
    return subbrandName!.trim() //brand name
  }

  async verifySelectedBrand(brandName: string) {
    const cleanBrandName = brandName.replace(/\(\d+\)\s*/, '') //remove  digits and parenthesis
    await expect(
this.brandAndSubbrandHeading.filter({
        hasText: `Brand - ${cleanBrandName} Products`,
      })
    ).toBeVisible()
  }
}
