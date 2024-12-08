import React from 'react'
import Link from 'next/link'


function Board() {
  return (
    <>
     <div>Board</div>
     <Link href="/parser" >Ссылка на парсер</Link>
    </>
   
  )
}

export default Board