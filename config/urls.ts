/**
 * Application URLs used throughout the test suite.
 * Centralizes URL management to make maintenance easier.
 */
export class AppUrls {
  /** Base URL of the application */
  static readonly BASE_URL = 'https://automationexercise.com/'
  /** Login page URL */
  static readonly LOGIN = `${AppUrls.BASE_URL}login`
  /** Products page URL */
  static readonly PRODUCTS = `${AppUrls.BASE_URL}products`
  /** Product details page URL */
  static readonly PRODUCT_DETAILS = new RegExp(`${AppUrls.BASE_URL}product_details/\\d+$`)
  /** Contact page URL */
  static readonly CONTACT = `${AppUrls.BASE_URL}contact_us`
  /** Test cases page URL */
  static readonly TEST_CASES = `${AppUrls.BASE_URL}test_cases`
  /** Category products page URL */
  static readonly CATEGORY_PRODUCTS = new RegExp(`${AppUrls.BASE_URL}category_products/\\d+$`)
}
