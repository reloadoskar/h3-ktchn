import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
<section className='m-auto'>
    <h1 className='text-2xl text-center'>404</h1>
    <p className='titulo'>Página no encontrada.</p>
    <Link className='text-center' href="/">Volver</Link>
</section>
  )
}
