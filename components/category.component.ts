import { expect, type Locator, type Page } from '@playwright/test'

export class CategoryComponent {

  readonly categoryList: Locator
  readonly categoryWomen: Locator
  readonly categoryOfProducts: Locator
  readonly subcategoryOfProducts: Locator
  readonly categoryAndSubcategoryHeading: Locator

  constructor(page: Page) {

    this.categoryList = page.locator('.panel-group.category-products')

    this.categoryWomen = page
      .locator('.panel-group.category-products')
      .getByRole('link', { name: ' Women' })

    this.categoryOfProducts = page.locator(
      '.panel-group.category-products a:not(li a)'
    )

    this.subcategoryOfProducts = page
      .locator('.panel-group.category-products')
      .getByRole('listitem')
      .getByRole('link')

    this.categoryAndSubcategoryHeading = page.getByRole('heading')
  }

  async selectNthProductCategory(nth = 0): Promise<string> {
    const nthElement = this.categoryOfProducts.nth(nth)
    // console.log('Selected Category:', await nthElement.textContent())
    await this.categoryOfProducts.nth(nth).click()
    const subcategoryName = await nthElement.textContent()
    return subcategoryName!.trim() //category name
  }

  async selectNthProductSubcategory(nth = 0): Promise<string> {
    const nthElement = this.subcategoryOfProducts.nth(nth)
    // console.log('Selected subCategory:', await nthElement.textContent())
    const subcategoryName = await nthElement.textContent()
    await this.subcategoryOfProducts.nth(nth).click()
    return subcategoryName!.trim()
  }

  async verifySelectedCategoryAndSubcategory(
    categoryName: string,
    subcategoryName: string
  ) {
    await expect(
      this.categoryAndSubcategoryHeading.filter({
        hasText: `${categoryName} - ${subcategoryName} Products `,
      })
    ).toBeVisible()
  }
}
