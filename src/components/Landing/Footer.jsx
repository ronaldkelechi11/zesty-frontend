import React from 'react'
import { FaFacebook, FaInstagram, FaYoast, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const date = new Date();
  let YYYY = date.getFullYear();
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <img src="/assets/logo.jpg" alt="" className="w-16 h-16 rounded-full" />
            <span className="ml-3 text-xl">Zesty Logistics</span>
          </a>
          <p className="mt-2 text-sm text-gray-500">The Number 1 Logistics company in Canada</p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">Home</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Our Services</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Gallery</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Contact</a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center flex flex-row gap-1 font-oswald sm:text-left">
            © {YYYY} <p className='text-primary'>ZESTY</p> <p className='text-black'>LOGISTICS</p>
          </p>
          <span className="sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start text-2xl flex flex-row gap-2">
            <FaFacebook className='hover:text-blue-500 hover:scale-110 transition-all cursor-pointer' />
            <FaInstagram className='hover:text-pink-500 hover:scale-110 transition-all cursor-pointer' />
            <FaXTwitter className='hover:text-black hover:scale-110 transition-all cursor-pointer' />
            <FaYoutube className='hover:text-red-500 hover:scale-110 transition-all cursor-pointer' />
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer