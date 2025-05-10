import { fullLists, PlaywrightBlocker } from '@ghostery/adblocker-playwright';
import fetch from 'cross-fetch';
import type { Page } from 'playwright';

let sharedBlocker: PlaywrightBlocker | null = null;

/**
 * Enables ad blocking functionality on the page.
 * This improves test reliability by preventing ad-related interruptions.
 *
 * @param page - The Playwright Page object to enable ad blocking on
 * @returns Promise that resolves when ad blocking is enabled
 */
export async function enableAdblock(page: Page) {
  if (!sharedBlocker) {
    sharedBlocker = await PlaywrightBlocker.fromLists(fetch, fullLists, { enableCompression: true });
  }
  await sharedBlocker.enableBlockingInPage(page);

  // Remove/hide ad elements forcibly
  // await page.addStyleTag({
  //   content: `
  //       ins.adsbygoogle,
  //       iframe[src*="doubleclick.net"],
  //       div[id^="aswift_"],
  //       [id^="google_ads_iframe"],
  //       [id^="aswift_"],
  //       [class*="adsbygoogle"] {
  //         display: none !important;
  //         visibility: hidden !important;
  //         height: 0 !important;
  //         width: 0 !important;
  //         position: absolute !important;
  //         z-index: -1 !important;
  //       }
  //     `,
  // })

  // Watch and remove dynamically added elements
  // await page.addInitScript(() => {
  //   const removeAds = () => {
  //     document
  //       .querySelectorAll('ins.adsbygoogle, iframe[src*="doubleclick.net"]')
  //       .forEach((el) => el.remove())
  //   }

  //   removeAds()

  //   const observer = new MutationObserver(removeAds)
  //   observer.observe(document.body, {
  //     childList: true,
  //     subtree: true,
  //   })
  // })
}
