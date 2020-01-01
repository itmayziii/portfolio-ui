/**
 * Makes a path absolute if it is not already, optionally prepending a prefix to the path.
 *
 * @param domain - Domain without suffix i.e. fullheapdeveloper.com.
 * @param path - Relative or absolute path.
 * @param prefix - Optional prefix to add before path. Prefix is ignored if the path is empty.
 * @throws When path is an empty string as this is likely a mistake, use '/' if your trying to access to root.
 */
export function makeAbsolutePath (domain: string, path: string, prefix?: string): string {
  if (path === '') {
    throw new Error('makeAbsolutePath - Expected a non empty string for path but it was empty')
  }

  if (isAbsolutePath(path)) {
    return path
  }

  if (path === '/') {
    return `https://www.${domain}`
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
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
 * Checks if a path is absolute.
 *
 * @param path - Relative or absolute path.
 */
export function isAbsolutePath (path: string): boolean {
  return path.startsWith('http')
}
