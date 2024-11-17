import { useState } from "react";
import { motion } from 'framer-motion';
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

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
                className={`fixed top-0 left-0 h-full bg-gray-500 text-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out w-64 shadow-lg`}
            >
                <div className="p-6 mt-16">
                    <h2 className="text-xl font-bold mb-4 border-b border-gray-100">Administrator</h2>
                    <ul className="space-y-3 flex flex-col">
                        <Link to={''} className="hover:underline cursor-pointer">Home</Link>
                        <Link to={'add'} className="hover:underline cursor-pointer">Add Package</Link>
                        <Link to={'edit'} className="hover:underline cursor-pointer">Edit Package</Link>
                        <a href="#" className="hover:underline cursor-pointer">Log Out</a>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
