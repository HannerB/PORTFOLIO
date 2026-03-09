import React from 'react'
import Navbar from './Navbar'
import imghero from '/imghero.png'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import Hanner from '/hanner.pdf'

export default function Hero() {
    return (
        <div className='relative overflow-hidden min-h-[550px] sm:min-h-[600px] flex flex-col items-center'>
            <div className='md:h-[550px] h-[500px] w-[450px] bg-gradient-to-r absolute from-[#6d2897] via-[#8e6cf5] to-[#bb61c5] transform rotate-45 z-0 right-2 top-28 rounded-3xl'></div>
            <Navbar />
            <main id='home' className='flex flex-col md:flex-row items-center justify-center w-full px-4 md:px-52 pb-4 md:pb-24 md:pt-32 pt-24 mt-14 md:mt-0 z-10'>
                <section className='flex-1 mr-28 md:text-left mt-10 md:md-0 relative' data-aos='fade-up' data-aos-delay='500'>
                    <div className='absolute -z-10 w-60 h-60 bg-[#cd3cf5] rounded-full blur-3xl opacity-50 -top-5 -left-12'></div>
                    <header>
                        <h1 className='text-4xl sm:text-4xl sm:text-4xl md:text-5xl front-bold text-white mb-4'>
                            Hanner Barros
                        </h1>
                        <h2 className='text-4xl sm:text-4xl md:text-2xl font-bold text-[#3e0f4a] md:text-[#c744ec] mb-2'>
                            FullStack Developer
                        </h2>
                    </header>
                    <p className='text-base sm:text-lg md:text-lg text-gray-200 mb-6'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates facilis illo at quia perferendis
                        nam dolor praesentium fugiat iusto a, delectus unde error vel quo et consequatur nostrum natus neque.
                    </p>
                    <div className='flex items-center space-x-4 mb-6'>
                        <a href="https://github.com/HannerB" target="_blank" rel="noopener noreferrer">
                            <FaGithub className='text-white hover:text-purple-400 transition-colors duration-300' size={28} />
                        </a>
                        <a href="https://www.linkedin.com/in/hannerb-undefined-95a3572a7/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className='text-white hover:text-purple-400 transition-colors duration-300' size={28} />
                        </a>
                        <a href="https://fiverr.com/tu-usuario" target="_blank" rel="noopener noreferrer" className='hover:opacity-70 transition-opacity duration-300'>
                            <img src="https://cdn.simpleicons.org/fiverr/ffffff" alt="Fiverr" className='w-7 h-7' />
                        </a>
                    </div>

                    <a href={Hanner} download>
                        <button className='inline-flex text-white border-2 py-2 px-6 focus:outline-none hover:bg-[#801B9C] hover:shadow-[0_0_40px_rgba(128,0,128,0.7)] rounded-full text-lg'>
                            Download CV
                        </button>
                    </a>
                </section>

                <figure data-aos='fade-up' data-aos-delays='500' className='flex-1 flex justify-center md:justify-end mt-0'>
                    <img src={imghero} alt="Hero Image" className='h-[300px] sm:h-[400px] md:h-[485px] w-[250px] sm:w-[480px] object-cover round' />
                </figure>
            </main>
        </div>
    )
}