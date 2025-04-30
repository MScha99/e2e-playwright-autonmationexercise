import { expect, type Locator, type Page } from '@playwright/test'

export class FooterComponent {
  readonly page: Page
  readonly emailField: Locator
  readonly subscribeButton: Locator

  readonly subscriptionHeading: Locator
  readonly subscribeSuccessAnnouncement: Locator

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

  async subscribeWithValidEmail(email: string) {
    await this.emailField.fill(email)
    await this.subscribeButton.click()
    await expect(this.subscribeSuccessAnnouncement).toBeVisible()
  }
}
