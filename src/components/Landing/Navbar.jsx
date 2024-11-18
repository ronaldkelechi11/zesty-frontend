import { motion } from "framer-motion";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)

    function toggleNav() {
        setIsOpen(!isOpen)
    }

    return (
        <div className='h-auto bg-white z-50 w-full px-10 py-4 flex flex-wrap items-center justify-between sticky top-0 border-b-2 border-b-gray-500'>


            <Link reloadDocument
                className="text-primary w-16 h-16 font-lato cursor-pointer uppercase">
                <img src="/assets/logo.jpg" alt="Zesty Logistics Logo" />
            </Link>



            <div className="hidden md:flex flex-row gap-5 text-primary">
                <NavLinks />
            </div>
            <div className="hidden md:flex">
                <NavButtons />
            </div>

            <div className="md:hidden p-2 transition-all cursor-pointer text-primary text-2xl" onClick={toggleNav}>
                {isOpen ?
                    <motion.div
                        key="close"
                        initial={{ opacity: 0, rotate: 90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -90 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FiX />
                    </motion.div>
                    :
                    <motion.div
                        key="menu"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FiMenu />
                    </motion.div>
                }
            </div>

            {/* When mobile isOpen it should display this */}
            {isOpen &&
                <>
                    <div className="text-primary basis-full md:hidden">
                        <NavLinks />
                        <NavButtons />
                    </div>
                </>
            }
        </div>
    )
}

function NavLinks() {
    const navbarStyling = "hover:scale-[1.1] hover:text-primary font-grotesk text-[16px] cursor-pointer transition-all"

    return (
        <div className='text-2xl font- text-black flex flex-col justify-center md:flex-row gap-4 items-center'>
            <Link className={navbarStyling} to="#hero">Home</Link>
            <Link className={navbarStyling} to="#services">Our Services</Link>
            <Link className={navbarStyling} to='track'>Track</Link>
            <Link className={navbarStyling} to="#gallery">Gallery</Link>
            <Link className={navbarStyling} to="#contact">Contact</Link>
        </div >
    )
}


function NavButtons() {
    return (
        <div className="flex flex-col md:flex-row items-center gap-5">
            <Link to={"login"} className="p-[10px_20px] text-sm text-white font-grotesk cursor-pointer rounded-lg bg-primary">Login</Link>
        </div>
    )
}

export default Navbar
