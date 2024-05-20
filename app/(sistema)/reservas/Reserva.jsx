import React from 'react'
import { useReservas } from './ReservasContext'

export default function Reserva({ reserva }) {
    const {selectReserva} = useReservas()
    
    return !reserva ? null :
        <tr key={reserva.nombre}
            className='hover:bg-gray-200 dark:hover:bg-gray-500 odd:bg-gray-50 dark:odd:bg-gray-700 cursor-pointer' 
            onClick={()=>selectReserva(reserva)}
        >
            <td className='px-4 text-nowrap'>{reserva.nombre}</td>
            <td className='text-nowrap'>{reserva.fecha}</td>
            <td className='text-right'>{reserva.horario}</td>
            <td className='text-right'>{reserva.personas}</td>
            <td className="flex px-4 gap-2 items-center">
                <svg className='fill-current' height="10" width="10" xmlns="http://www.w3.org/2000/svg" >
                    <circle fill={reserva.status === "PENDIENTE" ? "rgb(254, 254, 100)" : reserva.status === "CANCELADO" ? "rgb(244, 63, 94)" : reserva.status === "CONFIRMADA" ? "rgb(52, 211, 153)" : "rgb(160, 50, 160)"} r="5" cx="5" cy="5" />
                </svg>
                {reserva.status}
            </td>
        </tr>
}
