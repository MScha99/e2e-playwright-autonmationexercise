import { type Locator, type Page } from '@playwright/test'

export class CartModalComponent {
    readonly page: Page
    readonly addedToCartConfirmation: Locator
    readonly viewCartLink: Locator
    readonly continueShoppingButton: Locator

    constructor(page: Page) {
        this.page = page
        this.addedToCartConfirmation = page.getByText('Your product has been added')
        this.viewCartLink = page.getByRole('link', { name: 'View Cart' })
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' })
    }


}