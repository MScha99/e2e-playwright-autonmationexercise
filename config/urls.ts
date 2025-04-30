export class AppUrls {
  static readonly BASE_URL = 'https://automationexercise.com/'
  static readonly LOGIN = `${AppUrls.BASE_URL}login`
  static readonly CONTACT = `${AppUrls.BASE_URL}contact_us`
  static readonly TEST_CASES = `${AppUrls.BASE_URL}test_cases`
  static readonly PRODUCTS = `${AppUrls.BASE_URL}products`
  static readonly PRODUCT_DETAILS = new RegExp(`${AppUrls.BASE_URL}product_details/\\d+$`)
}
