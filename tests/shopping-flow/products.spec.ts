import { test, expect, type Page } from '@playwright/test'
import { AppUrls } from '../../config/urls'
import { HeaderComponent } from '../../components/header.component'
import { ProductsPage } from '../../pages/products.page'
import { ProductDetailsPage } from '../../pages/product-details.page'
import { products } from '../../config/test_data'
import { HomePage } from '../../pages/home.page'
import { CartPage } from '../../pages/cart.page'
import { enableAdblock } from '../../utils/adblock'

test.beforeEach(async ({ page }) => {
  await page.goto(AppUrls.BASE_URL)
})

test.describe('Browsing, inspecting and reviewing products', () => {
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
  test('TC-009 Search product', async ({ page }) => {
    await productsPage.searchForProduct(products.queryForProductSearch)
    await expect(productsPage.searchedProductsHeading).toBeVisible()
    await productsPage.verifySearchResultsAgainstQuery(
      products.queryForProductSearch
    )
  })
  test('TC-021 Add a review on product', async ({ page }) => {
    await test.step('Verify product list visibility, then move to details page of first product', async () => {
      await expect(productsPage.productsList).toBeVisible()
      await productsPage.viewFirstProduct.click()
      await expect(page).toHaveURL(AppUrls.PRODUCT_DETAILS)
    })
    await test.step('Verify Review form is visible, then fill it out and submit it', async () => {
      const productDetailsPage = new ProductDetailsPage(page)
      await expect(productDetailsPage.writeYourReviewHeading).toBeVisible()
      await productDetailsPage.reviewNameField.fill(products.reviewForm.name)
      await productDetailsPage.reviewEmailField.fill(products.reviewForm.email)
      await productDetailsPage.reviewTextField.fill(products.reviewForm.review)
      await productDetailsPage.submitReviewButton.click()
      await expect(
        productDetailsPage.reviewSubmitConfirmationText
      ).toBeVisible()
    })
  })
})

test('TC-018 View Category Products from Homepage', async ({ page }) => {
  const homepage = new HomePage(page)

  await test.step('Click on category (Women), then on a subcategory (dress), and verify that correct heading is displayed', async () => {
    await expect(homepage.categoryComponent.categoryList).toBeVisible()
    const categoryName =
      await homepage.categoryComponent.selectNthProductCategory(0)
    const subcategoryName =
      await homepage.categoryComponent.selectNthProductSubcategory(0)
    await homepage.categoryComponent.verifySelectedCategoryAndSubcategory(
      categoryName,
      subcategoryName
    )
  })
  await test.step('click on a different category (men) and subcategory (tshirts), then verify that correct heading is displayed', async () => {
    const categoryName =
      await homepage.categoryComponent.selectNthProductCategory(1)
    const subcategoryName =
      await homepage.categoryComponent.selectNthProductSubcategory(0)
    await homepage.categoryComponent.verifySelectedCategoryAndSubcategory(
      categoryName,
      subcategoryName
    )
  })
})

test('TC-019 View Brand Products from Products page', async ({ page }) => {
  const productsPage = new ProductsPage(page)
  const headerComponent = new HeaderComponent(page)

  await test.step('Click on brand (polo), and verify that correct heading is displayed', async () => {
    await headerComponent.productPageLink.click()
    const brandName = await productsPage.brandComponent.selectNthProductBrand(0)
    await productsPage.brandComponent.verifySelectedBrand(brandName)
  })
  await test.step('click on a different brand (babyhug), then verify that correct heading is displayed', async () => {
    const brandName = await productsPage.brandComponent.selectNthProductBrand(4)
    await productsPage.brandComponent.verifySelectedBrand(brandName)
  })
})

test.describe('Cart functionality', () => {
  test.beforeEach(async ({ page }) => {
    // await enableAdblock(page)
  })

  test('TC-012 Add product in cart', async ({ page }) => {
    const headerComponent = new HeaderComponent(page)
    const productsPage = new ProductsPage(page)
    const cartPage = new CartPage(page)
    let firstItemAddedToCart: { description: string; price: string }
    let secondItemAddedToCart: { description: string; price: string }
    // let itemInsideCart

    await test.step('Head to products page, add first displayed product to cart, and continue shopping', async () => {
      await headerComponent.productPageLink.click()
      firstItemAddedToCart = await productsPage.addNthItemToCart(0)
      await productsPage.cartModalComponent.continueShoppingButton.click()
    })
    await test.step('Add  second displayed product to cart and view cart content', async () => {
      secondItemAddedToCart = await productsPage.addNthItemToCart(1)
      await productsPage.cartModalComponent.viewCartLink.click()
    })

    await test.step('verify both products were added to cart with correct details', async () => {
      let { description: nameOfItemInsideCart } =
        await cartPage.checkCartItemDetails(firstItemAddedToCart.description)

      expect(nameOfItemInsideCart).toBe(firstItemAddedToCart.description)

      let { description: nameOfAnotherItemInsideCart } =
        await cartPage.checkCartItemDetails(secondItemAddedToCart.description)

      expect(nameOfAnotherItemInsideCart).toBe(
        secondItemAddedToCart.description
      )
    })
  })
  test('TC003 Login User with incorrect email and password', async ({
    page,
  }) => {
    await test.step('todo', async () => {})
    await test.step('todo', async () => {})

    await test.step('todo', async () => {})
  })
})
