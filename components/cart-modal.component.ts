import { type Locator, type Page } from '@playwright/test'

/**
 * Modal component that appears after adding items to cart.
 * Provides options to view cart or continue shopping.
 */
export class CartModalComponent {
    readonly page: Page
    readonly addedToCartConfirmation: Locator
    readonly viewCartLink: Locator
    readonly continueShoppingButton: Locator

    /**
     * Creates an instance of CartModalComponent.
     * @param page - The Playwright Page object
     */
    constructor(page: Page) {
        this.page = page
        this.addedToCartConfirmation = page.getByText('Your product has been added')
        this.viewCartLink = page.getByRole('link', { name: 'View Cart' })
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' })
    }
}