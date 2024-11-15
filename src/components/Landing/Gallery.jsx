import React from 'react'
import AnimateIntoView from './AnimateIntoView';

const Gallery = () => {
  return (
    <section className="text-gray-600 body-font" id='gallery'>
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex w-full mb-20 flex-wrap">
          <AnimateIntoView className="sm:text-5xl text-3xl font-medium title-font text-gray-900 lg:w-2/3 lg:mb-0 mb-4 font-grotesk">Delivering Results, One shipment at a time</AnimateIntoView>
        </div>
        <div className="flex flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-1/2">
              <img alt="gallery" className="w-full object-cover h-full object-center block" src="/public/assets/wp3714801.jpeg" />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img alt="gallery" className="w-full object-cover h-full object-center block" src="/public/assets/shipindus.jpeg" />
            </div>
            <div className="md:p-2 p-1 w-full">
              <img alt="gallery" className="w-full h-full object-cover object-center block" src="/public/assets/courier_girl.jpg" />
            </div>
          </div>
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-full">
              <img alt="gallery" className="w-full h-full object-cover object-center block" src="/public/assets/delivery_man.jpg" />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img alt="gallery" className="w-full object-cover h-full object-center block" src="/public/assets/image1.jpeg" />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img alt="gallery" className="w-full object-cover h-full object-center block" src="/public/assets/parcels.jpg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery