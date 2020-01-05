/**
 * Makes a URL absolute if it is not already, optionally prepending a prefix to the URL.
 *
 * @param domain - Domain without suffix i.e. fullheapdeveloper.com.
 * @param URL - Relative or absolute URL.
 * @param prefix - Optional prefix to add before URL. Prefix is ignored if the URL is empty.
 * @throws When URL is an empty string as this is likely a mistake, use '/' if your trying to access to root.
 */
export function makeAbsoluteURL (domain: string, URL: string, prefix?: string): string {
  if (URL === '') {
    throw new Error('makeAbsolutePath - Expected a non empty string for URL but it was empty')
  }

  if (isAbsoluteURL(URL)) {
    return URL
  }

  if (URL === '/') {
    return `https://www.${domain}`
  }

  const normalizedPath = URL.startsWith('/') ? URL : `/${URL}`
  if (!prefix) {
    return `https://www.${domain}${normalizedPath}`
  }

  let normalizedPrefix = prefix
  if (!normalizedPrefix.startsWith('/')) {
    normalizedPrefix = `/${normalizedPrefix}`
  }
  if (!normalizedPrefix.endsWith('/')) {
    normalizedPrefix = `${normalizedPrefix}/`
  }

  return `https://www.${domain}${normalizedPrefix}${normalizedPath}`
}

/**
 * Checks if a URL is absolute.
 *
 * @param url - Relative or absolute url.
 */
export function isAbsoluteURL (url: string): boolean {
  return url.startsWith('http')
}
