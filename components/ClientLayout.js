'use client'

import AudioProvider from './AudioProvider'
import Header from './Header'

export default function ClientLayout({ children }) {
  return (
    <AudioProvider>
      <Header />
      {children}
      <footer>
        <p>XXXXXXXX</p>
      </footer>
    </AudioProvider>
  )
}