import { expect, type Locator, type Page } from '@playwright/test'

export class BramdComponent {
  readonly brandList: Locator
  readonly brandWomen: Locator
  readonly brandOfProducts: Locator
  readonly subbrandOfProducts: Locator
  readonly brandAndSubbrandHeading: Locator

  constructor(page: Page) {
    this.brandList = page.locator('.brands-name')

    this.brandOfProducts = this.brandList.getByRole('link')

    this.brandAndSubbrandHeading = page.getByRole('heading')
  }

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
