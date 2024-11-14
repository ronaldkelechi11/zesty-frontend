import { MenuHamburger } from "@iconsans/react/bold";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)

    function toggleNav() {
        setIsOpen(!isOpen)
    }

    return (
        <div className='h-auto bg-white z-50 w-full px-10 py-4 flex flex-wrap items-center justify-between sticky top-0'>
            

            <Link reloadDocument
                className="text-primary text-2xl md:text-3xl font-lato cursor-pointer uppercase">
                ZeSTY
            </Link>



            <div className="hidden md:flex flex-row gap-5 text-primary">
                <NavLinks />
            </div>
            <div className="hidden md:flex">
                <NavButtons />
            </div>

            <div className="md:hidden p-2 transition-all cursor-pointer text-primary" onClick={toggleNav}>
                {isOpen ? <MenuHamburger /> : <MenuHamburger  />}
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
    const navbarStyling = "hover:scale-[1.1] hover:text-primary font-poppins text-[16px] cursor-pointer transition-all"

    return (
        <div className='text-2xl font- text-black flex flex-col justify-center md:flex-row gap-4 items-center'>
            <Link end className={navbarStyling} to="#hero">Home</Link>
            <Link className={navbarStyling} to="#services">Our Services</Link>
            <Link className={navbarStyling} to="#gallery">Gallery</Link>
            <Link className={navbarStyling} to="#contact">Contact</Link>
        </div>
    )
}


function NavButtons() {
    return (
        <div className="flex flex-col md:flex-row items-center gap-5">
            <Link to={"login"} className="p-[10px_20px] text-sm text-white font-poppins cursor-pointer rounded-lg bg-gray-500">Login</Link>
        </div>
    )
}

export default Navbar
