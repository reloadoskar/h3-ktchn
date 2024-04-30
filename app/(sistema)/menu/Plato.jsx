import React from 'react'
import Image from 'next/image'
export default function Plato({ plato }) {
  return (
    <div className='p-3 bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-500 cursor-pointer'>
      <div className='font-bold text-2xl'>{plato.nombre}</div>
      <div className='font-semibold text-sm text-gray-600'>{plato.categoria}</div>
      <Image src={plato.filepath} alt={plato.nombre} width={300} height={250}
        // style={{ maxWidth: '300px', maxHeight: '300px' }} 
        className='w-full rounded-lg max-h-56 text-center '
      />
      <div>{plato.descripcion}</div>
      <div className='text-right'>$ {plato.precio}</div>
    </div>
  )
}
