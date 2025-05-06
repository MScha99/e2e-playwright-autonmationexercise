import { type expect, type Locator, type Page } from '@playwright/test'

interface CartItem {
  description: string
  price: string
  quantity: string
  totalPrice: string
}

export class CartPage {
  readonly page: Page
  readonly proceedToCheckoutButton: Locator
  //   readonly cartItem: Locator
  readonly cartItemDescription: Locator
  readonly cartItemPrice: Locator
  readonly cartItemQuantity: Locator
  readonly cartItemTotalPrice: Locator
  readonly cartItemRemove: Locator

  constructor(page: Page) {
    this.page = page
    this.proceedToCheckoutButton = page.getByRole('button', {
      name: 'Proceed To Checkout',
    })

    // this.cartItem = page.getByRole('row').filter({hasNotText: 'item'}).first()
    this.cartItemDescription = page.locator('.cart_description').first()
    this.cartItemPrice = page.locator('.cart_price').first()
    this.cartItemQuantity = page.locator('.cart_quantity').first()
    this.cartItemTotalPrice = page.locator('.cart_total').first()
    this.cartItemRemove = page.locator('.cart_delete').first()
  }

  async checkCartItemDetails(itemName: string): Promise<CartItem> {
    const cartItemRow = this.page.getByRole('row', { name: itemName })

    const description = await cartItemRow
      .locator('.cart_description')
      .getByRole('heading')
      .textContent()
    // const description2 = await this.page
    //   .getByRole('row', { name: 'Blue Top' })
    //   .locator('.cart_description')
    //   .getByRole('heading')
    //   .textContent()
    const price = await cartItemRow.locator('.cart_price').textContent()
    const quantity = await cartItemRow.locator('.cart_quantity').textContent()
    const totalPrice = await cartItemRow.locator('.cart_total').textContent()

    if (!description || !price || !quantity || !totalPrice) {
      throw new Error('Failed to extract product details')
    }
    return {
      description,
      price,
      quantity,
      totalPrice,
    }
  }

  async verifyItemsExistInCart(...itemNames: string[]): Promise<boolean> {
    const allItemTexts = await this.page
      .locator('.cart_description')
      .allTextContents()

    return itemNames.every((itemName) =>
      allItemTexts.some((text) => text.includes(itemName))
    )
  }
}
