import { test, expect, type Page } from '@playwright/test'
import { AppUrls } from '../../config/urls'
import { HeaderComponent } from '../../components/header.component'
import { ProductsPage } from '../../pages/products.page'
import { ProductDetailsPage } from '../../pages/product-details.page'
import { products } from '../../config/test_data'
import { HomePage } from '../../pages/home.page'

test.beforeEach(async ({ page }) => {
  await page.goto(AppUrls.BASE_URL)
})

test.describe('Browsing products', () => {
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
  test('TC009 Search product', async ({ page }) => {
    await productsPage.searchForProduct(products.queryForProductSearch)
    await expect(productsPage.searchedProductsHeading).toBeVisible()
    await productsPage.verifySearchResultsAgainstQuery(
      products.queryForProductSearch
    )
  })
})

test('TC-018 View Category Products from Homepage', async ({ page }) => {
  const homepage = new HomePage(page)

  await test.step('Click on category (Women), then on a subcategory (dress), and verify that correct heading is displayed', async () => {
    const categoryName = await homepage.selectNthProductCategory(0)
    const subcategoryName = await homepage.selectNthProductSubcategory(0)
    await homepage.verifySelectedCategoryAndSubcategory(
      categoryName,
      subcategoryName
    )
  })
  await test.step('click on a different category (men) and subcategory (tshirts), then verify that correct heading is displayed', async () => {
    const categoryName = await homepage.selectNthProductCategory(1)
    const subcategoryName = await homepage.selectNthProductSubcategory(0)
    await homepage.verifySelectedCategoryAndSubcategory(
      categoryName,
      subcategoryName
    )
  })
})

test.describe('Cart functionality', () => {
  test.beforeEach(async ({ page }) => {})

  test('TC002 Login User with correct email and password', async ({ page }) => {
    await test.step('todo', async () => {})
    await test.step('todo', async () => {})

    await test.step('todo', async () => {})
  })
  test('TC003 Login User with incorrect email and password', async ({
    page,
  }) => {
    await test.step('todo', async () => {})
    await test.step('todo', async () => {})

    await test.step('todo', async () => {})
  })
})
