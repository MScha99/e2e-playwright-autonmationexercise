import { type Locator, type Page } from '@playwright/test'
import path from 'path'

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

  async fillContactForm(
    nameField: string,
    emailField: string,
    subjectField: string,
    messageField: string
  ) {
    await this.nameField.fill(nameField)
    await this.emailField.fill(emailField)
    await this.subjectField.fill(subjectField)
    await this.messageField.fill(messageField)
    await this.uploadFile.setInputFiles(path.join(__dirname, 'sillyCat.jpg'))
  }
}
