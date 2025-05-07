import { test, expect, type Page } from '@playwright/test'
import { AppUrls } from '../../config/urls'
import { HeaderComponent } from '../../components/header.component'
import { ProductsPage } from '../../pages/products.page'
import { ProductDetailsPage } from '../../pages/product-details.page'
import { products } from '../../config/test_data'
import { HomePage } from '../../pages/home.page'
import { CartPage } from '../../pages/cart.page'
import { CartModalComponent } from '../../components/cart-modal.component'

test.beforeEach(async ({ page }) => {
  await page.goto(AppUrls.BASE_URL)
})

test('TC-020 Add to cart from recommended items on homepage', async ({
  page,
}) => {
  const productsPage = new ProductsPage(page)
  const cartPage = new CartPage(page)
  const headerComponent = new HeaderComponent(page)

  await test.step('Search for product on All Products page, and verify search results', async () => {
    await headerComponent.productPageLink.click()
    await productsPage.searchForProduct(products.queryForProductSearch)
    await expect(productsPage.searchedProductsHeading).toBeVisible()
    await productsPage.verifySearchResultsAgainstQuery(
      products.queryForProductSearch
    )
  })

  await test.step('Add all products in search result to cart, and verify cart contents ', async () => {
    const searchResultCount = await productsPage.singleProductCell.count()
    const itemsAddedToCart: string[] = []

    for (let i = 0; i < searchResultCount; i++) {
      const { description } = await productsPage.addNthItemToCart(i)
      itemsAddedToCart.push(description)
      if (i != searchResultCount - 1) {
        await productsPage.cartModalComponent.continueShoppingButton.click()
      } else {
        await productsPage.cartModalComponent.viewCartLink.click()
      }
    }
    // console.log('Added items:', itemsAddedToCart)

    for (const desc of itemsAddedToCart) {
      expect(await cartPage.verifyItemsExistInCart(desc)).toBeTruthy()
    }
  })

  await test.step('Login to account with correct credentials, then go back to cart and verify its contents again', async () => {})
})
