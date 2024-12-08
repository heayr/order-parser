import React from 'react'

export default function ParserLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
    <>
    <nav> Навигация в парсере </nav>
    <main>
      {children}
    </main>
    </>
  )
}
