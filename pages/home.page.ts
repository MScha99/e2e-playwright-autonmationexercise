import { type Locator, type Page } from '@playwright/test'

export class HomePage {
  readonly arrowJumpBackUP: Locator
  readonly copyrightInfo: Locator
  readonly automationExerciseCarouselSlider:  Locator

  constructor(page: Page) {
    this.arrowJumpBackUP = page.getByRole('link', { name: '' })
    this.copyrightInfo = page.getByText('Copyright © 2021 All rights')
    this.automationExerciseCarouselSlider = page.getByRole('heading', { name: 'Full-Fledged practice website' })
  }
}
