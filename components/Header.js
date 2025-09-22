'use client'

import Link from 'next/link'
import AudioToggle from './AudioToggle'

export default function Header() {
  return (
    <header>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href={'/'}>
          <h1>Gay|Sexy|Penis</h1>
        </Link>
        <AudioToggle />
      </div>
    </header>
  )
}