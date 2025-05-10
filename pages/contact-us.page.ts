import { type Locator, type Page } from '@playwright/test'
import path from 'path'

/**
 * Represents the Contact Us page.
 * Handles user feedback submission and file upload functionality.
 */
export class ContactUsPage {
  readonly page: Page
  readonly contactUsHeading: Locator
  readonly nameField: Locator
  readonly emailField: Locator
  readonly subjectField: Locator
  readonly messageField: Locator
  readonly uploadFile: Locator
  readonly submitButton: Locator
  readonly successMessage: Locator
  readonly homeLink: Locator

  /**
   * Creates an instance of ContactUsPage.
   * @param page - The Playwright Page object
   */
  constructor(page: Page) {
    this.page = page
    this.contactUsHeading = page.getByRole('heading', { name: 'Get In Touch' })
    this.nameField = page.getByRole('textbox', { name: 'Name' })
    this.emailField = page.getByRole('textbox', { name: 'Email', exact: true })
    this.subjectField = page.getByRole('textbox', { name: 'Subject' })
    this.messageField = page.getByRole('textbox', { name: 'Your Message Here' })
    this.uploadFile = page.getByRole('button', { name: 'Choose File' })
    this.submitButton = page.getByRole('button', { name: 'Submit' })
    this.successMessage = page
      .locator('#contact-page')
      .getByText('Success! Your details have')
    this.homeLink = page.getByRole('link', { name: ' Home' })
  }

  /**
   * Fills out and submits the contact form.
   * @param name - User's name
   * @param email - User's email
   * @param subject - Message subject
   * @param message - Message content
   */
  async fillContactForm(
    name: string,
    email: string,
    subject: string,
    message: string
  ): Promise<void> {
    await this.nameField.fill(name)
    await this.emailField.fill(email)
    await this.subjectField.fill(subject)
    await this.messageField.fill(message)
    await this.uploadFile.setInputFiles(path.join(__dirname, 'sillyCat.jpg'))
  }
}
