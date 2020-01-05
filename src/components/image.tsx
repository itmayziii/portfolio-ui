import React from 'react'
import PropTypes from 'prop-types'
import { makeAbsoluteURL } from '../utilities'

interface ImageProps {
  src: string
  alt: string
}

/**
 * Wrapper around the basic HTML <img> element to ensure all images get an absolute src attribute. Also helps us follow best practices like
 * always using an alt attribute.
 *
 * @param src - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes.
 * @param alt - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes.
 */
export const Image: React.FC<ImageProps> = function Image ({ src, alt }) {
  if (!process.env.GATSBY_DOMAIN) {
    throw new Error('Expected GATSBY_DOMAIN environment variable to not be empty.')
  }

  return (
    <img src={makeAbsoluteURL(process.env.GATSBY_DOMAIN, src, 'images')} alt={alt}/>
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
}
