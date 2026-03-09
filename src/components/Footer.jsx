import React from 'react'

export default function Footer() {
    return (
        <footer className='bg-gradient-to-r from-purple-700 to-blue-700 text-white py-5'>
            <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
                <h1 className='text-3xl font-bold italic mb-4 md:mb-0'>Portfolio</h1>
                <p className='text-sm text-center md:text-left'>2026 My Website. All rights reserved</p>
            </div>
        </footer>
    )
}