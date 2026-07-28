import React from 'react'
import MagicButton2 from './ui/MagicButton2'
import { FaLocationArrow } from 'react-icons/fa'
import { FaFileArrowDown } from 'react-icons/fa6'
import { socialMedia, contact } from '@/data'
import ContactForm from './ContactForm'

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 relative" id="contact">
        <div className="w-full absolute left-0 bottom-0 min-h-96">
            <img
            src="/footer-grid.svg"
            alt=""
            aria-hidden="true"
            className="w-full h-full opacity-50 overflow-hidden"
            />
        </div>
        <div className="flex flex-col items-center">
            <h2 className="heading lg:max-w-[45vw]">
                Looking for someone who <span className="text-purple">ships</span>?
            </h2>
            <p className="text-center text-white-200 md:mt-10 my-5 text-lg max-w-2xl">
                I&apos;m in {contact.location} and open to full-stack roles, on site or remote.
                I&apos;m currently working while I look, so I can start with reasonable notice.
                The fastest way to reach me is email &mdash; I answer everything.
            </p>
            {/* Both actions are the same height and width and sit on one
                baseline. MagicButton2 ships with md:mt-10 and md:w-60 baked in,
                which pushed the email button 40px below its neighbour and made
                the pair mismatched, so both are overridden here. */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full max-w-xl">
                <a
                    href={`mailto:${contact.email}`}
                    className="w-full sm:w-56 shrink-0"
                >
                    <MagicButton2
                    title="Email me"
                    icon={<FaLocationArrow />}
                    position="right"
                    containerClasses="md:mt-0 w-full md:w-full"
                    >
                    </MagicButton2>
                </a>
                {/* Recruiters are the primary audience, so the CV gets the same
                    visual weight as the email button rather than reading as a
                    footnote beside it. */}
                <a
                    href={contact.cv}
                    download
                    className="w-full sm:w-56 shrink-0 inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-[#161a31] border border-white/[0.15] text-white text-sm font-medium hover:border-purple/60 hover:bg-[#1b2040] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple transition-colors"
                >
                    <FaFileArrowDown />
                    Download my CV
                </a>
            </div>
            <ContactForm />
            <p className="text-white-200 text-sm mt-6">
                <a href={`mailto:${contact.email}`} className="hover:text-purple transition-colors">
                    {contact.email}
                </a>
                <span className="mx-2 text-white/30">&middot;</span>
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-purple transition-colors">
                    {contact.phone}
                </a>
            </p>
        </div>
        <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
            <p className="md:text-base text-sm md:font-normal font-light">
                Copyright &copy; {new Date().getFullYear()} Amr Eldeeb
            </p>
            <div className="flex items-center md:gap-3 gap-6">
                {socialMedia.map((profile) => (
                    <a
                        key={profile.id}
                        href={profile.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={profile.name}
                        title={profile.name}
                        className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
                    >
                        <img src={profile.img} alt="" aria-hidden="true" width={20} height={20} />
                    </a>
                ))}
            </div>
        </div>
    </footer>
  )
}

export default Footer
