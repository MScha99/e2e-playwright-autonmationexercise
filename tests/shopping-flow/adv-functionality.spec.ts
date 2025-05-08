import { test, expect, type Page } from '@playwright/test'
import { AppUrls } from '../../config/urls'
import { HeaderComponent } from '../../components/header.component'
import { ProductsPage } from '../../pages/products.page'
import { ProductDetailsPage } from '../../pages/product-details.page'
import {
  products,
  AccountInformation,
  generateUniqueEmail,
} from '../../config/test_data'
import { HomePage } from '../../pages/home.page'
import { CartPage } from '../../pages/cart.page'
import { CartModalComponent } from '../../components/cart-modal.component'
import { deleteUserAccount, createUserAccount } from '../../utils/accountUtils'
import { enableAdblock } from '../../utils/adblock'

test.beforeEach(async ({ page }) => {
    await enableAdblock(page)
  await page.goto(AppUrls.BASE_URL)
})

test('TC-020 Search Products and Verify Cart After Login', async ({
  page,
}) => {
  const productsPage = new ProductsPage(page)
  const cartPage = new CartPage(page)
  const headerComponent = new HeaderComponent(page)
  const itemsAddedToCart: string[] = []
  const uniqueEmail = generateUniqueEmail()

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
  await test.step('Create account, then login to account with correct credentials', async () => {
    const signupLoginPage = await headerComponent.openSignupLoginPage()

    await createUserAccount(
      page,
      AccountInformation.valid.name,
      uniqueEmail,
      AccountInformation.valid.title,
      // AccountInformation.valid.name,
      AccountInformation.valid.password,
      AccountInformation.valid.dateOfBirth.day,
      AccountInformation.valid.dateOfBirth.month,
      AccountInformation.valid.dateOfBirth.year,
      AccountInformation.valid.newsletter,
      AccountInformation.valid.specialOffers,
      AccountInformation.valid.address.firstName,
      AccountInformation.valid.address.lastName,
      AccountInformation.valid.address.company,
      AccountInformation.valid.address.address1,
      AccountInformation.valid.address.address2,
      AccountInformation.valid.address.country,
      AccountInformation.valid.address.state,
      AccountInformation.valid.address.city,
      AccountInformation.valid.address.zipcode,
      AccountInformation.valid.address.mobileNumber
    )
    await page.goto(AppUrls.BASE_URL)
    await headerComponent.logoutButton.click()
    await expect(signupLoginPage.loginHeading).toBeVisible()
    await signupLoginPage.fillLoginFormAndSubmit(
      uniqueEmail,
      AccountInformation.valid.password
    )
    await expect(headerComponent.loggedInAsUsername).toBeVisible()
  })
  await test.step(' go back to cart and verify its contents again', async () => {
    await headerComponent.cartPageLink.click()
    for (const desc of itemsAddedToCart) {
      expect(await cartPage.verifyItemsExistInCart(desc)).toBeTruthy()
    }

    await headerComponent.deleteAccountButton.click()
  })
})

// test('TC-014 Place Order: Register while Checkout', async ({ page }) => {

// })
