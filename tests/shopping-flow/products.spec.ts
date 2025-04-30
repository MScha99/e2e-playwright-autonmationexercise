import { test, expect, type Page } from '@playwright/test'
import { AppUrls } from '../../config/urls'
import { HeaderComponent } from '../../components/header.component'
import { ProductsPage } from '../../pages/products.page'
import { ProductDetailsPage } from '../../pages/productDetails.page'
import { products } from '../../config/test_data'


test.beforeEach(async ({ page }) => {
  await page.goto(AppUrls.BASE_URL)
})

test.describe('Products page and product details', () => {
  let productsPage: ProductsPage
  let headerComponent: HeaderComponent

  test.beforeEach(async ({ page }) => {
    headerComponent = new HeaderComponent(page)
    productsPage = new ProductsPage(page)
    await headerComponent.productPageLink.click()
    await expect(page).toHaveURL(AppUrls.PRODUCTS)
  })

  test('TC008 Verify all products and product detail page', async ({
    page,
  }) => {
    await test.step('Verify product list visibility, then move to details page of first product', async () => {
      await expect(productsPage.productsList).toBeVisible()
      await productsPage.viewFirstProduct.click()
      await expect(page).toHaveURL(AppUrls.PRODUCT_DETAILS)
    })

    await test.step('Verify visibility of: product name, category, price, availability, condition, brand', async () => {
      const productDetailsPage = new ProductDetailsPage(page)
      await expect(productDetailsPage.productName).toBeVisible()
      await expect(productDetailsPage.productCategory).toBeVisible()
      await expect(productDetailsPage.productPrice).toBeVisible()
      await expect(productDetailsPage.productAvailability).toBeVisible()
      await expect(productDetailsPage.productCondition).toBeVisible()
      await expect(productDetailsPage.brand).toBeVisible()
    })
  })
  test('TC009 Search product', async ({
    page,
  }) => {
    await productsPage.searchForProduct(products.queryForProductSearch)
    await expect(productsPage.searchedProductsHeading).toBeVisible()
    await productsPage.verifySearchResultsAgainstQuery(products.queryForProductSearch)
  })
})
