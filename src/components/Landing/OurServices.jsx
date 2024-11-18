/* eslint-disable react/prop-types */
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import AnimateIntoView from './AnimateIntoView'

const OurServices = () => {
  const services = [
    {
      "img": "/assets/dock and cargo shipping.jpg",
      "title": "Freight Forwarding",
      "subtitle": "Efficient and secure cargo handling",
      "description": "Manage and transport your goods with ease. Our freight forwarding services ensure your cargo moves seamlessly across air, sea, or land routes."
    },
    {
      "img": "/assets/female-delivery.jpg",
      "title": "Warehousing",
      "subtitle": "Secure storage solutions for all goods",
      "description": "Our warehousing facilities provide safe, climate-controlled environments, keeping your inventory organized, accessible, and protected."
    },
    {
      "img": "/assets/medium-shot-man-wearing-helmet.jpg",
      "title": "Last-Mile Delivery",
      "subtitle": "Swift, reliable deliveries to the final destination",
      "description": "From the warehouse to your customer's door, our last-mile delivery service guarantees timely, accurate, and secure deliveries."
    },
    {
      "img": "/assets/aerial-view-cargo-ship-cargo-container-harbor.jpg",
      "title": "Customs Brokerage",
      "subtitle": "Navigating global customs seamlessly",
      "description": "Our experienced customs brokers ensure all legal and regulatory requirements are met, helping you avoid delays and additional costs."
    },
    {
      "img": "/assets/trucks.jpg",
      "title": "Supply Chain Management",
      "subtitle": "Integrated solutions for efficient operations",
      "description": "Optimize your supply chain from start to finish with our customized solutions, reducing costs and improving time-to-market."
    },
    {
      "img": "/assets/3d-render-online-freight-order-tracking.jpg",
      "title": "E-commerce Fulfillment",
      "subtitle": "Reliable order processing and dispatch",
      "description": "We provide end-to-end fulfillment services, including packaging, labeling, and timely dispatch, helping your e-commerce business thrive."
    }
  ]
  const headline = useRef(null)
  const isInView = useInView(headline, { once: true })
  return (
    <section className="text-gray-600 body-font" id='services'>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <AnimateIntoView
              className="sm:text-5xl text-3xl font-medium title-font mb-2 text-gray-900">Our Services</AnimateIntoView>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
          <AnimateIntoView delay={1} className="lg:w-1/2 w-full leading-relaxed text-gray-500 mt-3">From reliable freight and shipping services to efficient last-mile delivery, our team ensures every package reaches its destination on time. We adapt to the demands of your business, offering solutions that keep you moving forward. Experience logistics that&apos;s built on trust, speed, and customer satisfaction.</AnimateIntoView>
        </div>
        <AnimateIntoView delay={1.5} className="flex flex-wrap -m-4">
          {
            services.map((service) => {
              return (
                <ServiceItem key={services.indexOf(service)} img={service.img} title={service.title} description={service.description} subtitle={service.subtitle} />
              )
            })
          }
        </AnimateIntoView>
      </div>
    </section >
  )
}

function ServiceItem(props) {
  return (
    <div className="xl:w-1/4 md:w-1/2 p-4">
      <div className="bg-gray-100 p-6 rounded-lg">
        <img className="h-40 rounded w-full object-cover object-center mb-6" src={props?.img} alt="content" />
        <h3 className="tracking-widest text-primary text-xs font-medium title-font">{props?.subtitle}</h3>
        <h2 className="text-lg text-gray-900 font-bold title-font mb-4">{props?.title}</h2>
        <p className="leading-relaxed text-base">{props?.description}</p>
      </div>
    </div>
  )
}

export default OurServices