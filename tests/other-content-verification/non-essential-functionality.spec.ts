import { test, expect, type Page } from '@playwright/test'
import { ContactUsPage } from '../../pages/contact-us.page'
import { contactUsInformation } from '../../config/test_data'
import { AppUrls } from '../../config/urls'
import { HeaderComponent } from '../../components/header.component'
import { FooterComponent } from '../../components/footer.component'
import { HomePage } from '../../pages/home.page'
import { enableAdblock } from '../../utils/adblock'

/**
 * Test suite for secondary site features.
 * Covers contact form functionality, page navigation,
 * subscription features and scrolling behavior.
 */

//TC-006 contact us form
//TC-007 test cases page
test.beforeEach(async ({ page }) => {
  await enableAdblock(page)
  await page.goto(AppUrls.BASE_URL)
})

test('TC006 Contact Us Form functionality', async ({ page }) => {
  const contactUsPage = new ContactUsPage(page)

  page.on('dialog', (dialog) => dialog.accept())

  await page.goto(AppUrls.CONTACT)
  await expect(contactUsPage.contactUsHeading).toBeVisible()
  await contactUsPage.fillContactForm(
    contactUsInformation.name,
    contactUsInformation.email,
    contactUsInformation.subject,
    contactUsInformation.message
  )
  await contactUsPage.submitButton.click()

  await expect(contactUsPage.successMessage).toBeVisible()
  await contactUsPage.homeLink.click()
  await expect(page).toHaveURL(AppUrls.BASE_URL)
})

test('TC007 Verify that test cases page can be opened', async ({ page }) => {
  const headerComponent = new HeaderComponent(page)
  await headerComponent.testCasesPageLink.click()
  await expect(page).toHaveURL(AppUrls.TEST_CASES)
})

test.describe('Subscription functionality', () => {
  test('TC-010 Verify Subscription in Home page footer', async ({ page }) => {
    const footerComponent = new FooterComponent(page)
    await expect(footerComponent.subscriptionHeading).toBeVisible()
    await footerComponent.subscribeWithValidEmail(contactUsInformation.email)
  })

  test('TC-011 Verify Subscription in Cart page footer', async ({ page }) => {
    const footerComponent = new FooterComponent(page)
    const headerComponent = new HeaderComponent(page)
    await headerComponent.cartPageLink.click()
    await expect(footerComponent.subscriptionHeading).toBeVisible()
    await footerComponent.subscribeWithValidEmail(contactUsInformation.email)
  })
})

test.describe('Scrolling functionality', () => {
  // test.beforeEach(async ({ page }) => {
  //   await enableAdblock(page)
  // })
  test('TC-025 Verify Scroll Up using Arrow button and Scroll Down functionality', async ({
    page,
  }) => {
    const homePage = new HomePage(page)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))    
    await expect(homePage.copyrightInfo).toBeInViewport()
    await homePage.arrowJumpBackUP.click()
    await expect(homePage.automationExerciseCarouselSlider).toBeInViewport()
  })

  test('TC-026 Verify Scroll Up without Arrow button and Scroll Down functionality', async ({
    page,
  }) => {
    const homePage = new HomePage(page)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))    
    await expect(homePage.copyrightInfo).toBeInViewport()
    await page.evaluate(() => window.scrollTo(0, 0)) 
    await expect(homePage.automationExerciseCarouselSlider).toBeInViewport()
  })
})
