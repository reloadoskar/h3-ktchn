'use client'
import Switch from '@/components/Switch'
import React, { useState } from 'react'

const reservas = [
    {
        nombre: "Carlos Gregorio", email: "carlogrego@mail.com",
        telefono: 5545457878,
        fecha: "2024-05-10",
        horario: "18:00",
        personas: 4,
        ocacion: "NE",
        comentario: "",
        status: "PENDIENTE"
    },
    {
        nombre: "Rodrigo Madrigal", email: "rodrigu@mail.com",
        telefono: 554457878,
        fecha: "2024-05-12",
        horario: "12:00",
        personas: 2,
        ocacion: "NE",
        comentario: "",
        status: "CONFIRMADA"
    },
    {
        nombre: "Mildred Embrosco", email: "mildred@mail.com",
        telefono: 5547487777,
        fecha: "2024-05-10",
        horario: "13:00",
        personas: 6,
        ocacion: "CUMPLEAÑOS",
        comentario: "",
        status: "PENDIENTE"
    },
    {
        nombre: "Mauro Moro", email: "maumo@mail.com",
        telefono: 554754444,
        fecha: "2024-05-10",
        horario: "10:00",
        personas: 2,
        ocacion: "ANIVERSARIO",
        comentario: "",
        status: "CANCELADO"
    },
    {
        nombre: "Mildred Bahara", email: "mildred@mail.com",
        telefono: 5550454777,
        fecha: "2024-05-10",
        horario: "20:00",
        personas: 2,
        ocacion: "",
        comentario: "",
        status: "TERMINADA"
    },
]
export default function Reservas() {
    const [verTerminadas, setVerterminadas] = useState(false)
    const handleVerTerminadas = () =>{
        return setVerterminadas(prevVer => prevVer === false ? true : false)
    }    
    return (
        <div className='flex flex-col mt-6'>
            <h1 className='titulo pb-4'>Reservas</h1>
            <div className='flex gap-2 p-4'>
                <p>Ver Terminadas</p>
                <Switch label="verterminadas" value={verTerminadas} action={handleVerTerminadas} />
            </div>
            <table className='bg-gray-300 dark:bg-gray-800 rounded-md'>
                <thead >
                    <tr className=''>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>Horario</th>
                        <th>Personas</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody className='px-4'>
                    {reservas.map(reserva => (
                        <tr key={reserva.nombre} 
                        className='hover:bg-gray-100 dark:hover:bg-gray-500 odd:bg-gray-50 dark:odd:bg-gray-700 cursor-pointer' >
                            <td className='px-4'>{reserva.nombre}</td>
                            <td>{reserva.fecha}</td>
                            <td>{reserva.horario}</td>
                            <td className='text-right px-4'>{reserva.personas}</td>
                            <td className="flex px-4 gap-2 items-center">
                                <svg className='fill-current' height="10" width="10" xmlns="http://www.w3.org/2000/svg" >
                                    <circle fill={reserva.status === "PENDIENTE" ? "rgb(254, 254, 100)" : reserva.status === "CANCELADO" ? "rgb(244, 63, 94)" : reserva.status === "CONFIRMADA"? "rgb(52, 211, 153)" : "rgb(160, 50, 160)"} r="5" cx="5" cy="5" />
                                </svg>
                                {reserva.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
