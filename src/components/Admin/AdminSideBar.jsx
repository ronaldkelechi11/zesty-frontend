import { useState } from "react";
import { motion } from 'framer-motion';
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ArrowRight } from "@iconsans/react/linear";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {/* Toggle Button */}
            <button
                className={`p-4 text-white bg-primary rounded-md fixed top-3 left-3 z-50 ${isOpen ? 'border-white border' : ''}`}
                onClick={toggleSidebar}
            >

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
                    </motion.div>}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-white text-black transform ${isOpen ? "translate-x-0 z-[51]" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out w-64 shadow-lg`}
            >
                <div className="mt-16">
                    <img src="/public/assets/logo.jpg" className="h-36" alt="" />
                    <div className="space-y-3 flex flex-col gap-1 font-grotesk">
                        <Link to={''} className="hover:bg-primary cursor-pointer h-full p-3 hover:text-white ">Home </Link>
                        <Link to={'add'} className="hover:bg-primary cursor-pointer h-full p-3 hover:text-white">Add Package</Link>
                        <Link to={'edit'} className="hover:bg-primary cursor-pointer h-full p-3 hover:text-white">Edit Package</Link>
                        <Link to={'/'} className="hover:bg-primary cursor-pointer h-full p-3 hover:text-white">Log Out</Link>
                    </div>
                </div>
            </div>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
};

export default Sidebar;
