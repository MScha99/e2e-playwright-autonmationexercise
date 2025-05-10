import { expect, type Locator, type Page } from '@playwright/test'

/**
 * Component that handles product category navigation and filtering.
 * Provides functionality to browse products by categories and subcategories.
 */
export class CategoryComponent {
  readonly page: Page
  readonly categoryList: Locator
  readonly categoryWomen: Locator
  readonly categoryOfProducts: Locator
  readonly subcategoryOfProducts: Locator
  readonly categoryAndSubcategoryHeading: Locator

  /**
   * Creates an instance of CategoryComponent.
   * @param page - The Playwright Page object
   */
  constructor(page: Page) {
    this.page = page
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

  /**
   * Selects a product category by its position in the list.
   * @param nth - Zero-based index of the category to select
   * @returns Promise with the selected category name
   */
  async selectNthProductCategory(nth = 0): Promise<string> {
    await this.categoryList.scrollIntoViewIfNeeded()

    const nthElement = this.categoryOfProducts.nth(nth)
    // console.log('Selected Category:', await nthElement.textContent())
    await expect(async () => {
      await this.categoryOfProducts.nth(nth).click()
      await this.page.waitForSelector('.panel-collapse.in', {
      state: 'visible',
      timeout: 5000,
      })
    }).toPass()

    const categoryName = await nthElement.textContent()

    return categoryName!.trim() //category name
  }

  /**
   * Selects a product subcategory by its position in the list.
   * @param nth - Zero-based index of the subcategory to select
   * @returns Promise with the selected subcategory name
   */
  async selectNthProductSubcategory(nth = 0): Promise<string> {
    await this.page.waitForSelector('.panel-collapse.in', {
      state: 'visible',
      timeout: 5000,
    })
    const nthElement = this.subcategoryOfProducts.nth(nth)
    await expect(nthElement).toBeVisible()
    // console.log('Selected subCategory:', await nthElement.textContent())
    const subcategoryName = await nthElement.textContent()

    await this.subcategoryOfProducts.nth(nth).click()

    return subcategoryName!.trim()
  }

  /**
   * Verifies that the selected category and subcategory are correctly displayed.
   * @param categoryName - The name of the selected category
   * @param subcategoryName - The name of the selected subcategory
   */
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
