import React from 'react'
import Navbar from './Navbar'

export default function Hero() {
    return(
        <div className='relative overflow-hidden min-h-[550px] sm:min-h-[600px] flex flex-col items-center'>
            <div className='md:h-[550px] h-[500px] w-[450px] bg-gradient-to-r absolute from-[#6d2897] via-[#8e6cf5] to-[#bb61c5] transform rotate-45 z-0 right-2 top-28 rounded-3xl'></div>
            <Navbar />
        </div>
    )
}