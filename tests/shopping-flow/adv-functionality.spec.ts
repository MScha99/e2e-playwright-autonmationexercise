import { test, expect, type Page } from '@playwright/test'
import { AppUrls } from '../../config/urls'
import { HeaderComponent } from '../../components/header.component'
import { ProductsPage } from '../../pages/products.page'
import { ProductDetailsPage } from '../../pages/product-details.page'
import {
  products,
  AccountInformation,
  generateUniqueEmail,
  checkout,
} from '../../config/test_data'
import { HomePage } from '../../pages/home.page'
import { CartPage } from '../../pages/cart.page'
import { CartModalComponent } from '../../components/cart-modal.component'
import { deleteUserAccount, createUserAccount } from '../../utils/accountUtils'
import { enableAdblock } from '../../utils/adblock'
import { SignupLoginPage } from '../../pages/signup-login.page'
import { CheckoutPage } from '../../pages/checkout.page'
import { PaymentPage } from '../../pages/payment.page'
import { PaymentDonePage } from '../../pages/payment-done.page'
import { CheckoutModalComponent } from '../../components/checkout-modal.components'
import { AccountDeletedPage } from '../../pages/account-deleted.page'
import { Sign } from 'crypto'

test.beforeEach(async ({ page }) => {
  await enableAdblock(page)
  await page.goto(AppUrls.BASE_URL)
})

test('TC-020 Search Products and Verify Cart After Login', async ({ page }) => {
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

test.describe('Placing order', () => {
  test('TC-014 Place Order: Register while Checkout', async ({ page }) => {
    const headerComponent = new HeaderComponent(page)
    const cartPage = new CartPage(page)
    const productsPage = new ProductsPage(page)
    const checkoutPage = new CheckoutPage(page)
    const paymentPage = new PaymentPage(page)
    const paymentDonePage = new PaymentDonePage(page)
    const checkoutModalComponent = new CheckoutModalComponent(page)
    const accountDeletedPage = new AccountDeletedPage(page)
    let itemAddedToCart: { description: string; price: string }

    await test.step('Add a product to cart, proceed to cart page, proceed to checkout, click "register/login" on the modal popup, ', async () => {
      await headerComponent.productPageLink.click()
      itemAddedToCart = await productsPage.addNthItemToCart(0)
      await productsPage.cartModalComponent.viewCartLink.click()
      await expect(async () => {
        await cartPage.proceedToCheckoutButton.click()
        await checkoutModalComponent.registerLoginLink.click()
      }).toPass()
    })
    await test.step('Create account', async () => {
      const uniqueEmail = generateUniqueEmail()
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

      await expect(headerComponent.loggedInAsUsername).toBeVisible()
    })

    await test.step('Go to cart page, nad proceed to checkout once again', async () => {
      await headerComponent.cartPageLink.click()
      await expect(async () => {
        await cartPage.proceedToCheckoutButton.click()
        await expect(checkoutPage.deliveryAddressHeading).toBeVisible()
      }).toPass()
    })

    await test.step('Verify address and order details. Add comment and proceed', async () => {
      await expect(
        checkoutPage.verifyAddressDetails(
          AccountInformation.valid.title,
          AccountInformation.valid.address.company,
          AccountInformation.valid.address.firstName,
          AccountInformation.valid.address.lastName,
          AccountInformation.valid.address.address1,
          AccountInformation.valid.address.address2,
          AccountInformation.valid.address.city,
          AccountInformation.valid.address.state,
          AccountInformation.valid.address.zipcode,
          AccountInformation.valid.address.country,
          AccountInformation.valid.address.mobileNumber
        )
      ).toBeTruthy()

      await expect
        .poll(
          async () => {
            return await cartPage.verifyItemsExistInCart(
              itemAddedToCart.description
            )
          },
          { timeout: 5_000 }
        )
        .toBeTruthy()

      await checkoutPage.commentField.fill(checkout.comment)
      await checkoutPage.placeOrderLink.click()

      await paymentPage.fillPaymentDetails(
        checkout.cardDetails.nameOnCard,
        checkout.cardDetails.cardNumber,
        checkout.cardDetails.cvc,
        checkout.cardDetails.expirationMonth,
        checkout.cardDetails.expirationYear
      )

      await expect(async () => {
        await paymentPage.payAndConfirmButton.click()
        await expect(paymentDonePage.orderConfirmed).toBeVisible()
      }).toPass()
    })

    await test.step('Delete account', async () => {
      await headerComponent.deleteAccountButton.click()
      await expect(accountDeletedPage.accountDeletedConfirmation).toBeVisible()
    })
  })

  test('TC-015: Place Order: Register before Checkout', async ({ page }) => {
    const headerComponent = new HeaderComponent(page)
    const cartPage = new CartPage(page)
    const productsPage = new ProductsPage(page)
    const checkoutPage = new CheckoutPage(page)
    const paymentPage = new PaymentPage(page)
    const paymentDonePage = new PaymentDonePage(page)
    const accountDeletedPage = new AccountDeletedPage(page)
    let itemAddedToCart: { description: string; price: string }

    await test.step('Create account', async () => {
      await headerComponent.signupLoginPageLink.click()
      const uniqueEmail = generateUniqueEmail()
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

      await expect(headerComponent.loggedInAsUsername).toBeVisible()
    })

    await test.step('Add a product to cart, proceed to cart page, proceed to checkout, click "register/login" on the modal popup, ', async () => {
      await headerComponent.productPageLink.click()
      itemAddedToCart = await productsPage.addNthItemToCart(0)
      await productsPage.cartModalComponent.viewCartLink.click()
      await expect(async () => {
        await cartPage.proceedToCheckoutButton.click()
        await expect(checkoutPage.deliveryAddressHeading).toBeVisible()
      }).toPass()
    })

    await test.step('Verify address and order details. Add comment and proceed', async () => {
      await expect(
        checkoutPage.verifyAddressDetails(
          AccountInformation.valid.title,
          AccountInformation.valid.address.company,
          AccountInformation.valid.address.firstName,
          AccountInformation.valid.address.lastName,
          AccountInformation.valid.address.address1,
          AccountInformation.valid.address.address2,
          AccountInformation.valid.address.city,
          AccountInformation.valid.address.state,
          AccountInformation.valid.address.zipcode,
          AccountInformation.valid.address.country,
          AccountInformation.valid.address.mobileNumber
        )
      ).toBeTruthy()

      await expect
        .poll(
          async () => {
            return await cartPage.verifyItemsExistInCart(
              itemAddedToCart.description
            )
          },
          { timeout: 5_000 }
        )
        .toBeTruthy()

      await checkoutPage.commentField.fill(checkout.comment)
      await checkoutPage.placeOrderLink.click()

      await paymentPage.fillPaymentDetails(
        checkout.cardDetails.nameOnCard,
        checkout.cardDetails.cardNumber,
        checkout.cardDetails.cvc,
        checkout.cardDetails.expirationMonth,
        checkout.cardDetails.expirationYear
      )

      await expect(async () => {
        await paymentPage.payAndConfirmButton.click()
        await expect(paymentDonePage.orderConfirmed).toBeVisible()
      }).toPass()
    })

    await test.step('Delete account', async () => {
      await headerComponent.deleteAccountButton.click()
      await expect(accountDeletedPage.accountDeletedConfirmation).toBeVisible()
    })
  })

  test('TC-016: Place Order: Login before Checkout', async ({ page }) => {
    const headerComponent = new HeaderComponent(page)
    const cartPage = new CartPage(page)
    const productsPage = new ProductsPage(page)
    const checkoutPage = new CheckoutPage(page)
    const paymentPage = new PaymentPage(page)
    const paymentDonePage = new PaymentDonePage(page)
    const accountDeletedPage = new AccountDeletedPage(page)
    const signupLoginPage = new SignupLoginPage(page)
    let itemAddedToCart: { description: string; price: string }

    await test.step('Create account', async () => {
      await headerComponent.signupLoginPageLink.click()
      const uniqueEmail = generateUniqueEmail()
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

    await test.step('Add a product to cart, proceed to cart page, proceed to checkout, click "register/login" on the modal popup, ', async () => {
      await headerComponent.productPageLink.click()
      itemAddedToCart = await productsPage.addNthItemToCart(0)
      await productsPage.cartModalComponent.viewCartLink.click()
      await expect(async () => {
        await cartPage.proceedToCheckoutButton.click()
        await expect(checkoutPage.deliveryAddressHeading).toBeVisible()
      }).toPass()
    })

    await test.step('Verify address and order details. Add comment and proceed', async () => {
      await expect(
        checkoutPage.verifyAddressDetails(
          AccountInformation.valid.title,
          AccountInformation.valid.address.company,
          AccountInformation.valid.address.firstName,
          AccountInformation.valid.address.lastName,
          AccountInformation.valid.address.address1,
          AccountInformation.valid.address.address2,
          AccountInformation.valid.address.city,
          AccountInformation.valid.address.state,
          AccountInformation.valid.address.zipcode,
          AccountInformation.valid.address.country,
          AccountInformation.valid.address.mobileNumber
        )
      ).toBeTruthy()

      await expect
        .poll(
          async () => {
            return await cartPage.verifyItemsExistInCart(
              itemAddedToCart.description
            )
          },
          { timeout: 5_000 }
        )
        .toBeTruthy()

      await checkoutPage.commentField.fill(checkout.comment)
      await checkoutPage.placeOrderLink.click()

      await paymentPage.fillPaymentDetails(
        checkout.cardDetails.nameOnCard,
        checkout.cardDetails.cardNumber,
        checkout.cardDetails.cvc,
        checkout.cardDetails.expirationMonth,
        checkout.cardDetails.expirationYear
      )

      await expect(async () => {
        await paymentPage.payAndConfirmButton.click()
        await expect(paymentDonePage.orderConfirmed).toBeVisible()
      }).toPass()
    })

    await test.step('Delete account', async () => {
      await headerComponent.deleteAccountButton.click()
      await expect(accountDeletedPage.accountDeletedConfirmation).toBeVisible()
    })
  })

  test('TC-023: Verify address details in checkout page', async ({ page }) => {
    const headerComponent = new HeaderComponent(page)
    const cartPage = new CartPage(page)
    const productsPage = new ProductsPage(page)
    const checkoutPage = new CheckoutPage(page)
    const paymentPage = new PaymentPage(page)
    const paymentDonePage = new PaymentDonePage(page)
    const accountDeletedPage = new AccountDeletedPage(page)
    let itemAddedToCart: { description: string; price: string }

    await test.step('Create account', async () => {
      await headerComponent.signupLoginPageLink.click()
      const uniqueEmail = generateUniqueEmail()
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

      await expect(headerComponent.loggedInAsUsername).toBeVisible()
    })

    await test.step('Add a product to cart, proceed to cart page, proceed to checkout, click "register/login" on the modal popup, ', async () => {
      await headerComponent.productPageLink.click()
      itemAddedToCart = await productsPage.addNthItemToCart(0)
      await productsPage.cartModalComponent.viewCartLink.click()
      await expect(async () => {
        await cartPage.proceedToCheckoutButton.click()
        await expect(checkoutPage.deliveryAddressHeading).toBeVisible()
      }).toPass()
    })

    await test.step('Verify address and order details.', async () => {
      await expect(
        checkoutPage.verifyAddressDetails(
          AccountInformation.valid.title,
          AccountInformation.valid.address.company,
          AccountInformation.valid.address.firstName,
          AccountInformation.valid.address.lastName,
          AccountInformation.valid.address.address1,
          AccountInformation.valid.address.address2,
          AccountInformation.valid.address.city,
          AccountInformation.valid.address.state,
          AccountInformation.valid.address.zipcode,
          AccountInformation.valid.address.country,
          AccountInformation.valid.address.mobileNumber
        )
      ).toBeTruthy()

      await expect
        .poll(
          async () => {
            return await cartPage.verifyItemsExistInCart(
              itemAddedToCart.description
            )
          },
          { timeout: 5_000 }
        )
        .toBeTruthy()
    })

    await test.step('Delete account', async () => {
      await headerComponent.deleteAccountButton.click()
      await expect(accountDeletedPage.accountDeletedConfirmation).toBeVisible()
    })
  })

  test('TC-024: Download Invoice after purchase order', async ({ page }) => {
    const headerComponent = new HeaderComponent(page)
    const cartPage = new CartPage(page)
    const productsPage = new ProductsPage(page)
    const checkoutPage = new CheckoutPage(page)
    const paymentPage = new PaymentPage(page)
    const paymentDonePage = new PaymentDonePage(page)
    const checkoutModalComponent = new CheckoutModalComponent(page)
    const accountDeletedPage = new AccountDeletedPage(page)
    let itemAddedToCart: { description: string; price: string }

    await test.step('Add a product to cart, proceed to cart page, proceed to checkout, click "register/login" on the modal popup, ', async () => {
      await headerComponent.productPageLink.click()
      itemAddedToCart = await productsPage.addNthItemToCart(0)
      await productsPage.cartModalComponent.viewCartLink.click()
      await expect(async () => {
        await cartPage.proceedToCheckoutButton.click()
        await checkoutModalComponent.registerLoginLink.click()
      }).toPass()
    })
    await test.step('Create account', async () => {
      const uniqueEmail = generateUniqueEmail()
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

      await expect(headerComponent.loggedInAsUsername).toBeVisible()
    })

    await test.step('Go to cart page, nad proceed to checkout once again', async () => {
      await headerComponent.cartPageLink.click()
      await expect(async () => {
        await cartPage.proceedToCheckoutButton.click()
        await expect(checkoutPage.deliveryAddressHeading).toBeVisible()
      }).toPass()
    })

    await test.step('Verify address and order details. Add comment and proceed', async () => {
      await expect(
        checkoutPage.verifyAddressDetails(
          AccountInformation.valid.title,
          AccountInformation.valid.address.company,
          AccountInformation.valid.address.firstName,
          AccountInformation.valid.address.lastName,
          AccountInformation.valid.address.address1,
          AccountInformation.valid.address.address2,
          AccountInformation.valid.address.city,
          AccountInformation.valid.address.state,
          AccountInformation.valid.address.zipcode,
          AccountInformation.valid.address.country,
          AccountInformation.valid.address.mobileNumber
        )
      ).toBeTruthy()

      await expect
        .poll(
          async () => {
            return await cartPage.verifyItemsExistInCart(
              itemAddedToCart.description
            )
          },
          { timeout: 5_000 }
        )
        .toBeTruthy()

      await checkoutPage.commentField.fill(checkout.comment)
      await checkoutPage.placeOrderLink.click()

      await paymentPage.fillPaymentDetails(
        checkout.cardDetails.nameOnCard,
        checkout.cardDetails.cardNumber,
        checkout.cardDetails.cvc,
        checkout.cardDetails.expirationMonth,
        checkout.cardDetails.expirationYear
      )

      await expect(async () => {
        await paymentPage.payAndConfirmButton.click()

        await expect(paymentDonePage.orderConfirmed).toBeVisible()
      }).toPass()
    })

    await test.step('Download invoice and delete account', async () => {
      const downloadPromise = page.waitForEvent('download')
      await paymentDonePage.downloadInvoiceButton.click()
      const download = await downloadPromise
      expect(download.suggestedFilename()).toMatch('invoice.txt')
      await headerComponent.deleteAccountButton.click()
      await expect(accountDeletedPage.accountDeletedConfirmation).toBeVisible()
    })
  })
})
