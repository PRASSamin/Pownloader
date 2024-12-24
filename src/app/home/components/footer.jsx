import React from 'react'
import Link from 'next/link'
import { Instagram, Facebook, Twitter, GitHub, LinkedIn } from '@mui/icons-material'
import { GmailIcon as Gmail } from '@/app/components/icons/gmail'

const Footer = () => {
    return (
        <footer className={`z-40 pb-5 md:pb-0 md:border-t md:border-[#333] md:bg-background`}>
            <div className={`container mx-auto px-1.5 md:px-0 py-[10px]`}>
                <div className=" flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between">
                    <div className="social flex items-center justify-center gap-4 text-gray-500">
                        <Link href={'https://github.com/PRASSamin'} target='_blank' className='hover:text-white transition-all duration-300'>
                            <GitHub fontSize='small' />
                        </Link>
                        <Link href={'https://www.linkedin.com/in/pras-samin-826421270/'} target='_blank' className='hover:text-blue-600 transition-all duration-300'>
                            <LinkedIn fontSize='small' />
                        </Link>
                        <Link href={'https://www.instagram.com/imprassamin/'} target='_blank' className='hover:text-pink-600 transition-all duration-300'>
                            <Instagram fontSize='small' />
                        </Link>
                        <Link href={'https://www.facebook.com/prassamin7/'} target='_blank' className='hover:text-blue-500 transition-all duration-300'>
                            <Facebook fontSize='small' />
                        </Link>
                        <Link href={'https://x.com/prassamin78/'} target='_blank' className='hover:text-blue-500 transition-all duration-300'>
                            <Twitter fontSize='small' />
                        </Link>
                        <Link href={'mailto:prassamin@gmail.com'} target='_blank' className='hover:grayscale-0 grayscale transition-all duration-300'>
                            <Gmail size={20} />
                        </Link>
                    </div>

                    <div>
                        <p className='text-gray-500 text-sm'>© {new Date().getFullYear()} <Link href={"https://pras.me/"} className='font-black hover:underline hover:text-purple-600'>PRAS</Link></p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
