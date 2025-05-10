import { type expect, type Locator, type Page } from '@playwright/test'

/**
 * Interface representing a cart item with its details.
 */
interface CartItem {
  description: string
  price: string
  quantity: string
  totalPrice: string
  deleteLocator: Locator
}

/**
 * Represents the shopping cart page.
 * Handles cart item management and checkout initiation.
 */
export class CartPage {
  readonly page: Page
  readonly proceedToCheckoutButton: Locator
  readonly cartItemDescription: Locator
  readonly cartItemPrice: Locator
  readonly cartItemQuantity: Locator
  readonly cartItemTotalPrice: Locator
  readonly cartItemRemove: Locator

  /**
   * Creates an instance of CartPage.
   * @param page - The Playwright Page object
   */
  constructor(page: Page) {
    this.page = page
    this.proceedToCheckoutButton = page.getByText('Proceed To Checkout')
    this.cartItemDescription = page.locator('.cart_description').first()
    this.cartItemPrice = page.locator('.cart_price').first()
    this.cartItemQuantity = page.locator('.cart_quantity').first()
    this.cartItemTotalPrice = page.locator('.cart_total').first()
    this.cartItemRemove = page.locator('.cart_delete').first()
  }

  /**
   * Checks the details of a specific cart item.
   * @param itemName - Optional name of the item to check. If not provided, checks the first item.
   * @returns Promise with the cart item details
   */
  async checkCartItemDetails(itemName?: string): Promise<CartItem> {
    const cartItemRow = itemName
      ? this.page.getByRole('row', { name: itemName })
      : this.page.getByRole('row').filter({ hasNotText: 'description' }).first()

    const description = await cartItemRow
      .locator('.cart_description')
      .getByRole('heading')
      .textContent()
    const price = (
      await cartItemRow.locator('.cart_price').textContent()
    )?.trim()

    const quantity = (
      await cartItemRow.locator('.cart_quantity').textContent()
    )?.trim()
    const totalPrice = (
      await cartItemRow.locator('.cart_total').textContent()
    )?.trim()

    const deleteLocator = cartItemRow.locator('.cart_quantity_delete')

    if (!description || !price || !quantity || !totalPrice) {
      throw new Error('Failed to extract product details')
    }
    return {
      description,
      price,
      quantity,
      totalPrice,
      deleteLocator
    }
  }

  /**
   * Verifies if specified items exist in the cart.
   * @param itemNames - Names of items to check for in the cart
   * @returns Promise<boolean> indicating whether all items were found
   */
  async verifyItemsExistInCart(...itemNames: string[]): Promise<boolean> {
    const allItemTexts = await this.page
      .locator('.cart_description')
      .allTextContents()

    return itemNames.every((itemName) =>
      allItemTexts.some((text) => text.includes(itemName))
    )
  }
}
