import React from 'react'
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby'
import { isAbsoluteURL } from '../utilities'

// There is a bug with {@link GatsbyLinkProps} which makes us have to omit the `ref` property https://github.com/gatsbyjs/gatsby/issues/16682.
type LinkComponent = <T extends {}>(...funcArgs: Parameters<React.FC<Omit<GatsbyLinkProps<T>, 'ref'>>>) => ReturnType<React.FC>

/**
 * Wrapper around Gatsby Link https://www.gatsbyjs.org/docs/gatsby-link/ to help make all links absolute as well as make sure only internal
 * links use Gatsby Link as per the docs.
 *
 * i.e. In order to have types for the state object described here https://www.gatsbyjs.org/docs/gatsby-link/#pass-state-as-props-to-the-linked-page
 * <li><Link<{ blah: string }> to='/' state={{ blah: 'someBlahValue' }}>Full Heap Developer</Link></li>
 *
 * @param gatsbyLinkProps - Properties for the Gatsby provided {@link GatsbyLink}.
 */
export const Link: LinkComponent = function Image (gatsbyLinkProps) {
  if (!process.env.GATSBY_DOMAIN) {
    throw new Error('Expected GATSBY_DOMAIN environment variable to not be empty.')
  }

  if (isAbsoluteURL(gatsbyLinkProps.to)) {
    return <a href={gatsbyLinkProps.to}>{gatsbyLinkProps.children}</a>
  }

  return (
    <GatsbyLink {...gatsbyLinkProps}>{gatsbyLinkProps.children}</GatsbyLink>
  )
}
