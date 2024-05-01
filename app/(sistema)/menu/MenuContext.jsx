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
                body: JSON.stringify({data:data})
            })
            const dt = await res.json()
            return setPlatosel(dt.plato)
        }
    }

    const selectPlato = (plt) =>{
        setPlatosel(plt)
    }

    return (
        <MenuContext.Provider value={{
            menu,
            loadMenu, crearPlato, selectPlato, platoSeleccionado,
            editarPlato,
        }}>
            {props.children}
        </MenuContext.Provider>
    )
}

export default MenuContextProvider