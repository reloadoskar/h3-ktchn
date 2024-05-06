'use client'
import { createContext, useState, useCallback, useContext, useEffect } from "react"

export const MenuContext = createContext()

export const useMenu = () => {
    return useContext(MenuContext)
}
export const MenuContextProvider = (props) => {
    const [menu, setMenu] = useState([])
    const [plato, setPlato] = useState(null)
    const [platoSeleccionado, setPlatosel] = useState(null)

    const loadMenu = useCallback(async (database) => {
        if (database) {
            const response = await fetch("/api/menu/load", {
                method: 'POST',
                body:  JSON.stringify({db: database}) ,
            })
            const data = await response.json()
            setMenu(data.platos)
            return response;
        }
    }, [])

    const crearPlato = async (data) => {
        if (data) {
            const res = await fetch("/api/menu/plato", {
                method: "POST",
                body: data
            })
            const dt = await res.json()
            setMenu([dt.plato, ...menu])
            return dt
        }
    }

    const editarPlato = async (data) => {
        if(data){
            const res = await fetch("/api/menu/plato",{
                method:'PUT',
                body: JSON.stringify(data)
            })
            const dt = await res.json()
            // console.log(dt)
            let platosSinOriginal = menu.filter(plt=>plt._id!==data._id)
            platosSinOriginal.push(dt.plato)
            setMenu(platosSinOriginal)
            return dt
        }
    }

    const eliminarPlato = async (database, plato) =>{
        if(database){
            const res = await fetch("/api/menu/plato",{
                method: 'DELETE',
                body: JSON.stringify({database, plato})
            })
            const dt = await res.json()
            if(dt){
                setMenu(menu.filter(plt=>plt._id !== plato._id))
            }
            return dt
        }
    }

    const selectPlato = (plt) =>{
        setPlatosel(plt)
    }

    return (
        <MenuContext.Provider value={{
            menu,
            loadMenu, crearPlato, selectPlato, platoSeleccionado,
            editarPlato, eliminarPlato,
        }}>
            {props.children}
        </MenuContext.Provider>
    )
}

export default MenuContextProvider