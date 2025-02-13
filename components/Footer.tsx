import React from 'react'
import MagicButton2 from './ui/MagicButton2'
import { FaLocationArrow } from 'react-icons/fa'
import { socialMedia } from '@/data'

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 relative" id="contact">
        <div className="w-full absolute left-0 bottom-0 min-h-96">
            <img
            src="/footer-grid.svg"
            alt="grid"
            className="w-full h-full opacity-50 overflow-hidden"
            />
        </div>
        <div className="flex flex-col items-center">
            <h1 className="heading lg:max-w-[45vw]">
                Want to elevate <span className="text-purple">your</span> online presence to the next level?
            </h1>
            <p className="text-center text-white-200 md:mt-10 my-5 text-lg">Get in contact with me today to discuss your project and how I can help you reach your goals.</p>
            <a href="mailto:amr.eldeeb172@gmail.com">
                <MagicButton2
                title="Let's get in touch"
                icon={<FaLocationArrow />}
                position="right"
                >
                </MagicButton2>
            </a>
        </div>
        <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
            <p className="md:text-base text-sm md:font-normal font-light">
                Copyright © 2025 Amr Eldeeb
            </p>
            <div className="flex items-center md:gap-3 gap-6">
                {socialMedia.map((profile) => (
                    <div key={profile.id.toString()} className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300">
                        <img src={profile.img} alt={profile.id.toString()} width={20} height={20} />
                    </div>
                ))}
            </div>
        </div>
    </footer>
  )
}

export default Footer