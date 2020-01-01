import React from 'react'
import { Image } from '../components/image'

const IndexPage: React.FC = function IndexPage () {
  return (
    <div>
      <ul>
        <li>Hello Tommy</li>
        <li>Hello Tommy</li>
      </ul>
      <Image src='hello.png' alt='it works'/>
    </div>
  )
}

export default IndexPage
