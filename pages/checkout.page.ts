import { expect, type Locator, type Page } from '@playwright/test'

export class CheckoutPage {
  readonly page: Page
  readonly deliveryAddressHeading: Locator
  readonly billingAddressHeading: Locator
  readonly deliveryAddressFirstAndLastName: Locator
  readonly deliveryAddressCompany: Locator
  readonly deliveryAddressAddress1: Locator
  readonly deliveryAddressAddress2: Locator
  readonly deliveryAddressCityStatePostcode: Locator
  readonly deliveryAddressCountry: Locator
  readonly deliveryAddressPhone: Locator
  readonly addressListLocator: Locator
  readonly cartItemDescription: Locator
  readonly cartItemPrice: Locator
  readonly cartItemQuantity: Locator
  readonly cartItemTotalPrice: Locator
  readonly commentField: Locator
  readonly placeOrderLink: Locator

  constructor(page: Page) {
    this.page = page

    this.cartItemDescription = page.locator('.cart_description').first()
    this.cartItemPrice = page.locator('.cart_price').first()
    this.cartItemQuantity = page.locator('.cart_quantity').first()
    this.cartItemTotalPrice = page.locator('.cart_total').first()

    this.deliveryAddressHeading = page.getByRole('heading', {
      name: 'your delivery address',
    })

  
    this.addressListLocator = page.getByRole('list').filter({
      has: this.deliveryAddressHeading,
    })

    const addressLines = this.addressListLocator.locator(
      'li.address_address1.address_address2'
    )
    this.deliveryAddressFirstAndLastName = this.addressListLocator.locator(
      '.address_firstname.address_lastname'
    )

    this.deliveryAddressCompany = addressLines.nth(0)
    this.deliveryAddressAddress1 = addressLines.nth(1)
    this.deliveryAddressAddress2 = addressLines.nth(2)

    this.deliveryAddressCityStatePostcode = this.addressListLocator.locator(
      '.address_city.address_state_name.address_postcode'
    )

    this.deliveryAddressCountry = this.addressListLocator.locator(
      '.address_country_name'
    )

    this.deliveryAddressPhone =
      this.addressListLocator.locator('.address_phone')

    this.commentField = page.locator('textarea[name="message"]')
    this.placeOrderLink = page.getByRole('link', { name: 'Place Order' })
  }

  async verifyItemsExistInCart(...itemNames: string[]): Promise<boolean> {
    const allItemTexts = await this.page
      .locator('.cart_description')
      .allTextContents()

    return itemNames.every((itemName) =>
      allItemTexts.some((text) => text.includes(itemName))
    )
  }

  async verifyAddressDetails(
    title: string,
    company: string,
    firstName: string,
    lastName: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    zipcode: string,
    country: string,
    mobileNumber: string
  ): Promise<void> {
    await expect(this.deliveryAddressFirstAndLastName).toHaveText(
      `${title} ${firstName} ${lastName}`
    )
    await expect(this.deliveryAddressCompany).toHaveText(company)
    await expect(this.deliveryAddressAddress1).toHaveText(address1)
    await expect(this.deliveryAddressAddress2).toHaveText(address2)
    await expect(this.deliveryAddressCityStatePostcode).toHaveText(
      `${city} ${state} ${zipcode}`
    )
    await expect(this.deliveryAddressCountry).toHaveText(country)
    await expect(this.deliveryAddressPhone).toHaveText(mobileNumber)
  }
}
