import { expect, type Locator, type Page } from '@playwright/test'

/**
 * Component that handles footer functionality including newsletter subscription.
 * Present on all pages of the application.
 */
export class FooterComponent {
  readonly page: Page
  readonly emailField: Locator
  readonly subscribeButton: Locator
  readonly subscriptionHeading: Locator
  readonly subscribeSuccessAnnouncement: Locator

  /**
   * Creates an instance of FooterComponent.
   * @param page - The Playwright Page object
   */
  constructor(page: Page) {
    this.page = page
    this.emailField = page.getByRole('textbox', { name: 'Your email address' })
    this.subscribeButton = page
      .locator('#footer')
      .getByRole('button', { name: '' })
    this.subscriptionHeading = page.getByRole('heading', {
      name: 'Subscription',
    })
    this.subscribeSuccessAnnouncement = page.getByText(
      'You have been successfully'
    )
  }

  /**
   * Subscribes to the newsletter with the provided email address.
   * @param email - Email address to subscribe with
   * @returns Promise that resolves when subscription is confirmed
   */
  async subscribeWithValidEmail(email: string): Promise<void> {
    await this.emailField.fill(email)
    await this.subscribeButton.click()
    await expect(this.subscribeSuccessAnnouncement).toBeVisible()
  }
}
