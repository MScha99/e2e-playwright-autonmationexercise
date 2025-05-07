import { expect, type Locator, type Page } from '@playwright/test'
import { CategoryComponent } from '../components/category.component'
import { BramdComponent } from '../components/brand.component.'
import { CartModalComponent } from '../components/cart-modal.component'

export class ProductsPage {
  readonly page: Page
  readonly productsList: Locator
  readonly searchedProductsList: Locator
  readonly viewFirstProduct: Locator
  readonly searchProductField: Locator
  readonly searchProductButton: Locator
  readonly searchedProductsHeading: Locator
  readonly categoryComponent: CategoryComponent
  readonly brandComponent: BramdComponent
  readonly cartModalComponent: CartModalComponent
  readonly testowy: Locator

  constructor(page: Page) {
    this.page = page
    this.categoryComponent = new CategoryComponent(page)
    this.brandComponent = new BramdComponent(page)
    this.cartModalComponent = new CartModalComponent(page)
    this.productsList = page.getByText('All Products  Added! Your')
    this.searchedProductsList = page.getByText('Searched Products  Added!')
    this.viewFirstProduct = page.getByText('View Product').first()
    this.searchProductField = page.getByRole('textbox', {
      name: 'Search Product',
    })
    this.searchProductButton = page.getByRole('button', { name: '' })
    this.searchedProductsHeading = page.getByText('SEARCHED PRODUCTS')
    this.testowy = this.page
      .locator('.single-products')
      .nth(0)
      .locator('.btn btn-default add-to-cart')
  }

  async searchForProduct(query: string) {
    await this.searchProductField.fill(query)
    await this.searchProductButton.click()
  }

  async verifySearchResultsAgainstQuery(query: string) {
    const texts = await this.searchedProductsList
      .locator('p')
      .filter({ hasNotText: 'Your product has been added to cart.' })
      .filter({ hasNotText: 'View Cart' })
      .allTextContents()
    // console.log('search results: ', texts)
    const lowerQuery = query.toLowerCase()

    expect(
      texts.every((text) => text.toLowerCase().includes(lowerQuery))
    ).toBeTruthy()
  }
  async addNthItemToCart(
    nth: number
  ): Promise<{ description: string; price: string }> {
    const singleProductCell = this.page.locator('.single-products').nth(nth)

    await singleProductCell.evaluate((el) => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })

    await singleProductCell.hover({ trial: true })
    await this.page.waitForSelector('.product-overlay:visible', {
      state: 'attached',
      timeout: 5000,
    })
    await singleProductCell.hover({ force: true })

    const description = await singleProductCell
      .locator('.overlay-content > p')
      .textContent()

    const price = (
      await singleProductCell
        .locator('.overlay-content')
        .getByRole('heading')
        .textContent()
    )?.trim()

    // await singleProductCell.locator('.overlay-content').getByRole('button', {name: 'Add to cart'}).click()
    // await singleProductCell.getByRole('button', {name: 'Add to cart'}).click()
    await singleProductCell.evaluate((el) => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })

    await singleProductCell.hover({ force: true })
    await singleProductCell.hover({ force: true })
    await this.page.waitForSelector('.product-overlay:visible', {
      state: 'attached',
      timeout: 5000,
    })
    await singleProductCell
      .locator('.overlay-content a.add-to-cart')
      .click({ force: true })
    await expect(this.cartModalComponent.addedToCartConfirmation).toBeVisible()

    if (!description || !price) {
      throw new Error('Failed to extract product details')
    }
    return {
      description,
      price,
    }
  }
}
