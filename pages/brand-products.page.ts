import { expect, type Locator, type Page } from '@playwright/test'
import { CategoryComponent } from '../components/category.component'

export class BrandProductsPage {
  readonly categoryComponent: CategoryComponent


  constructor(page: Page) {
    this.categoryComponent = new CategoryComponent(page)

  }


}
