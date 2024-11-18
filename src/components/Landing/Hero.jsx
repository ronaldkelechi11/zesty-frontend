import { motion } from "framer-motion"
import { Link } from "react-router-dom"


const Hero = () => {

  return (
    <section className="text-gray-600 body-font bg-white" id="hero">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <motion.div
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-5xl font-oswald text-3xl mb-4 font-extrabold text-gray-900">
            Delivering Trust, Every Mile of the Way
          </h1>
          <p className="mb-8 leading-relaxed font-poppins">Dependable logistics for businesses of all sizes.
            Efficient delivery solutions you can trust.
            Connecting you from local routes to global destinations..</p>
          <Link to={'/track'} className="flex justify-center">
            <button className="inline-flex text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg font-grotesk">Track</button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ x: 500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img className="object-cover object-center rounded" alt="hero" src="/assets/logo.jpg" />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
