'use client'
import { useEffect, useState } from 'react'
import Platos from './Platos'
import CrearPlato from './CrearPlato'
import { useMenu } from './MenuContext'
import { useCategorias } from './CategoriasContext'
import { useSubcategorias } from './SubcategoriasContext'
import Buscador from './Buscador'
import { useAuth } from '@/components/auth/AuthContext'

export default function Menu() {
  const { user, autenticado } = useAuth()
  const { menu, loadMenu } = useMenu()
  const { loadCategorias } = useCategorias()
  const { loadSubcategorias } = useSubcategorias()

  // useEffect(() => {
  //   if (session) {
  //     return setDatabase(session.user.database)
  //   }
  //   return setDatabase(null)
  // }, [session])

  useEffect(() => {
    if (user) {
      const loadAll = async () => {
        const res = await Promise.all([
          loadMenu(user.database),
          loadCategorias(user.database),
          loadSubcategorias(user.database)
        ])
        return res
      }
      loadAll()
    }
  }, [user])
  return (
    <div className='p-6 w-full flex flex-col gap-4'>
      <CrearPlato database={user?.database} />
      <Buscador />
      <Platos platos={menu} />
    </div>
  )
}
