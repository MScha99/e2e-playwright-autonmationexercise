import { expect, type Locator, type Page } from '@playwright/test'
import { CategoryComponent } from '../components/category.component'
import { BramdComponent } from '../components/brand.component.'

export class ProductsPage {
  readonly page: Page
  readonly productsList: Locator
  readonly searchedProductsList: Locator
  readonly viewFirstProduct: Locator
  readonly searchProductField: Locator
  readonly searchProductButton: Locator
  readonly searchedProductsHeading: Locator
  readonly categoryComponent: CategoryComponent
  readonly brandCOmponent: BramdComponent

  constructor(page: Page) {
    this.page = page
    this.categoryComponent = new CategoryComponent(page)
    this.brandCOmponent = new BramdComponent(page)
    this.productsList = page.getByText('All Products  Added! Your')
    this.searchedProductsList = page.getByText('Searched Products  Added!')
    this.viewFirstProduct = page.getByText('View Product').first()
    this.searchProductField = page.getByRole('textbox', {
      name: 'Search Product',
    })
    this.searchProductButton = page.getByRole('button', { name: '' })
    this.searchedProductsHeading = page.getByText('SEARCHED PRODUCTS')
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
}
