import { expect, type Locator, type Page } from '@playwright/test'
import { CategoryComponent } from '../components/category.component'
import { CartModalComponent } from '../components/cart-modal.component'

/**
 * Represents the Home page of the application.
 * Handles interactions with the main landing page elements and components.
 */
export class HomePage {
  readonly page: Page
  readonly arrowJumpBackUP: Locator
  readonly copyrightInfo: Locator
  readonly automationExerciseCarouselSlider: Locator
  readonly categoryComponent: CategoryComponent
  readonly viewFirstProduct: Locator
  readonly cartModalComponent: CartModalComponent

  /**
   * Creates an instance of HomePage.
   * @param page - The Playwright Page object
   */
  constructor(page: Page) {
    this.page = page
    this.cartModalComponent = new CartModalComponent(page)
    this.categoryComponent = new CategoryComponent(page)
    this.arrowJumpBackUP = page.getByRole('link', { name: '' })
    this.copyrightInfo = page.getByText('Copyright © 2021 All rights')
    this.automationExerciseCarouselSlider = page.getByRole('heading', {
      name: 'Full-Fledged practice website',
    })
    this.viewFirstProduct = page.getByText('View Product').first()
  }

  /**
   * Views the details of a product by its position in the list.
   * @param nth - Zero-based index of the product to view
   */
  async viewNthProductDetails(nth: number): Promise<void> {
    await this.page.getByText('View Product').nth(nth).click()
  }

  /**
   * Adds a featured product to the cart by its position.
   * @param nth - Zero-based index of the featured product to add
   * @returns Promise with the product details including description and price
   */
  async addNthFeaturedItemToCart(
    nth: number
  ): Promise<{ description: string; price: string }> {
    const singleProductCell = this.page.locator('.single-products').nth(nth)
    await expect(singleProductCell).toBeVisible()

    await singleProductCell.evaluate((el) => {
      el.scrollIntoView({  block: 'start' })
    })

    await singleProductCell.hover({ trial: true })
    await this.page.waitForSelector('.product-overlay:visible', {
      state: 'attached',
      timeout: 5000,
    })
    await singleProductCell.hover()

    const description = await singleProductCell
      .locator('.overlay-content > p')
      .textContent()

    const price = (
      await singleProductCell
        .locator('.overlay-content')
        .getByRole('heading')
        .textContent()
    )?.trim()

    await singleProductCell.evaluate((el) => {
      el.scrollIntoView({  block: 'start' })
    })
    
    await singleProductCell
      .locator('.overlay-content a.add-to-cart')
      .click()
    await expect(this.cartModalComponent.addedToCartConfirmation).toBeVisible()

    await this.page.waitForSelector('.product-overlay', {
      state: 'hidden',
      timeout: 5000,
    })

    if (!description || !price) {
      throw new Error('Failed to extract product details')
    }
    return {
      description,
      price,
    }
  }

  /**
   * Adds a recommended product to the cart by its position.
   * @param nth - Zero-based index of the recommended product to add
   * @returns Promise with the product details including description and price
   */
  async addNthRecommendedItemToCart(
    nth: number
  ): Promise<{ description: string; price: string }> {
    //test
    // const singleProductCell2 = this.page
    //   .getByText('recommended items Rs. 500')
    //   .locator('.single-products')
    //   .nth(0)
    //   .getByText('Add to cart')

    await expect(this.page.getByText('recommended items Rs. 500')).toBeVisible()
    const singleProductCell = this.page
      .getByText('recommended items Rs. 500')
      .locator('.single-products')
      .nth(nth)
    await singleProductCell.hover()

    const description = await singleProductCell.locator('p').textContent()

    const price = (
      await singleProductCell.getByRole('heading').textContent()
    )?.trim()

    await singleProductCell.getByText('Add to cart').click()
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
