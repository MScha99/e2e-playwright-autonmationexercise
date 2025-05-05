import { expect, type Locator, type Page } from '@playwright/test'
import { CategoryComponent } from '../components/category.component'

export class HomePage {
  readonly arrowJumpBackUP: Locator
  readonly copyrightInfo: Locator
  readonly automationExerciseCarouselSlider: Locator
  readonly categoryComponent: CategoryComponent
  

  constructor(page: Page) {
    this.categoryComponent = new CategoryComponent(page)
    this.arrowJumpBackUP = page.getByRole('link', { name: '' })
    this.copyrightInfo = page.getByText('Copyright © 2021 All rights')
    this.automationExerciseCarouselSlider = page.getByRole('heading', {
      name: 'Full-Fledged practice website',
    })
  

  }

  
}
