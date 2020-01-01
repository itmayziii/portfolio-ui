import React from 'react'
import { childrenPropType } from '../prop-types/children'
import { Link } from '../components/link'
import { Image } from '../components/image'

/**
 * Provides a consistent layout experience including spacing, navigation, etc...
 *
 * @param children - {@link childrenPropType}.
 */
export const AppLayout: React.FC = function AppLayout ({ children }) {
  return (
    <React.Fragment>
      <nav>
        <ul>
          <li><Link to='/'>Full Heap Developer</Link></li>
          <li><Link to='/blah'>Blah</Link></li>
        </ul>
        <Image src='testing' alt='some alt'/>
      </nav>
      <main className='h-full w-full'>
        {children}
      </main>
    </React.Fragment>
  )
}

AppLayout.propTypes = {
  children: childrenPropType
}
