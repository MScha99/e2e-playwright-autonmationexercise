// import { test, expect } from '@playwright/test'
// import { enableAdblock } from '../../utils/adblock'
// import { HomePage } from '../../pages/home.page'
// import { ProductsPage } from '../../pages/products.page'
// import { AppUrls } from '../../config/urls'
// import { HeaderComponent } from '../../components/header.component'

// test('homepage', async ({ page }) => {
//   await page.goto(AppUrls.BASE_URL)
//   await enableAdblock(page)
// })

// test('homepage2', async ({ page }) => {
//   await enableAdblock(page)
//   await page.goto(AppUrls.BASE_URL)
// })

// test('products', async ({ page }) => {
//   await page.goto(AppUrls.BASE_URL)
//   await enableAdblock(page)
//   const headerComponent = new HeaderComponent(page)
//   await headerComponent.productPageLink.click()
// })

// test('products2', async ({ page }) => {
//   await enableAdblock(page)
//   await page.goto(AppUrls.BASE_URL)
//   const headerComponent = new HeaderComponent(page)
//   await headerComponent.productPageLink.click()
// })

// test('has title', async ({ page }) => {})
