import React from 'react'
import PropTypes from 'prop-types'

interface ImageProps {
  src: string
  alt: string
}

export const Image: React.FC<ImageProps> = function Image ({ src, alt }) {
  return (
    <img src={ensureSrcAbsolutePath(src)} alt={alt}/>
  )

  function ensureSrcAbsolutePath (src: string): string {
    if (src.startsWith('http')) {
      return src
    }

    return src.startsWith('/') ? `https://www.${process.env.GATSBY_DOMAIN}/images${src}` : `https://www.${process.env.GATSBY_DOMAIN}/images/${src}`
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
}
