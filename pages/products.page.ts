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
  // readonly testowy: Locator
  readonly singleProductCell: Locator

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
    // this.testowy = this.page
    //   .locator('.single-products')
    //   .nth(0)
    //   .locator('.btn btn-default add-to-cart')

    this.singleProductCell = this.page.locator('.single-products')
  }

  async searchForProduct(query: string) {
    await this.searchProductField.fill(query)
    await expect(this.searchProductButton).toBeVisible()
    await expect(async () => {
      await this.searchProductButton.click()
      await expect(this.searchedProductsHeading).toBeVisible()
    }).toPass()
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
  // async addNthItemToCart(
  //   nth: number
  // ): Promise<{ description: string; price: string }> {
  //   const singleProductCell = this.page.locator('.single-products').nth(nth)
  //   await expect(singleProductCell).toBeVisible()

  //   await singleProductCell.evaluate((el) => {
  //     el.scrollIntoView({ block: 'start' })
  //   })

  //   const overlay = single.locator('.product-overlay')

  //   await singleProductCell.hover({ trial: true })
  //   await this.page.waitForSelector('.product-overlay:visible', {
  //     state: 'attached',
  //     timeout: 5000,
  //   })
  //   await singleProductCell.hover({ force: true })

  //   const description = await singleProductCell
  //     .locator('.overlay-content > p')
  //     .textContent()

  //   const price = (
  //     await singleProductCell
  //       .locator('.overlay-content')
  //       .getByRole('heading')
  //       .textContent()
  //   )?.trim()

  //   await singleProductCell.locator('.overlay-content a.add-to-cart').click()
  //   await expect(this.cartModalComponent.addedToCartConfirmation).toBeVisible()

  //   // await this.page.waitForSelector('.product-overlay', {
  //   //   state: 'hidden',
  //   //   timeout: 5000,
  //   // })
  //   const single = this.page.locator('.single-products').nth(nth)
  //   const overlay = single.locator('.product-overlay')
  //   // wait for *that* cell’s overlay to hide
  //   await overlay.waitFor({ state: 'hidden', timeout: 5000 })

  //   if (!description || !price) {
  //     throw new Error('Failed to extract product details')
  //   }
  //   return {
  //     description,
  //     price,
  //   }
  // }
  async addNthItemToCart(
    nth: number
  ): Promise<{ description: string; price: string }> {
    const singleProductCell = this.page.locator('.single-products').nth(nth)
    await expect(singleProductCell).toBeVisible()

    await singleProductCell.evaluate((el) => {
      el.scrollIntoView({ block: 'start' })
    })

    const overlay = singleProductCell.locator('.product-overlay')

    await singleProductCell.hover()

    await overlay.waitFor({
      state: 'visible',
      timeout: 5000,
    })

    const descLoc = overlay.locator('.overlay-content > p')
    const priceLoc = overlay.getByRole('heading')
    await expect(descLoc).toBeVisible()
    await expect(priceLoc).toBeVisible()
    const description = (await descLoc.textContent())!.trim()
    const price = (await priceLoc.textContent())!.trim()

    const addBtn = overlay.locator('a.add-to-cart')

    await expect(addBtn).toBeVisible()

    await singleProductCell.evaluate((el) => {
      el.scrollIntoView({ block: 'start' })
    })

    await addBtn.click()
    await this.page.mouse.move(0, 0)
    await expect(this.cartModalComponent.addedToCartConfirmation).toBeVisible()

    await overlay.waitFor({ state: 'hidden', timeout: 5_000 })

    if (!description || !price) {
      throw new Error('Failed to extract product details')
    }
    return {
      description,
      price,
    }
  }
}
