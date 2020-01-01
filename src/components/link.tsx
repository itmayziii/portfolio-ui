import React from 'react'
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby'
import { isAbsolutePath } from '../utilities'

// interface LinkProps extends GatsbyLinkProps<any> {}

/**
 * Wrapper around Gatsby Link https://www.gatsbyjs.org/docs/gatsby-link/ to help make all links absolute as well as make sure only internal
 * links use Gatsby Link as per the docs.
 *
 * There is a bug with {@link GatsbyLinkProps} which makes us have to omit the `ref` property https://github.com/gatsbyjs/gatsby/issues/16682.
 *
 * @param gatsbyLinkProps - Properties for the Gatsby provided {@link GatsbyLink}.
 */
export const Link: React.FC<Omit<GatsbyLinkProps<{}>, 'ref'>> = function Image (gatsbyLinkProps) {
  if (!process.env.GATSBY_DOMAIN) {
    throw new Error('Expected GATSBY_DOMAIN environment variable to not be empty.')
  }

  if (isAbsolutePath(gatsbyLinkProps.to)) {
    return <a href={gatsbyLinkProps.to}>{gatsbyLinkProps.children}</a>
  }

  return (
    <GatsbyLink {...gatsbyLinkProps}>{gatsbyLinkProps.children}</GatsbyLink>
  )
}
