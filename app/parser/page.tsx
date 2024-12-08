import React from 'react'
import OrderParser from './parser'
import Link from 'next/link'

export default function page() {
  return (
    <>
        <Link href="/">На главную</Link>
        <OrderParser />
    </>

  )
}
