import { FaClock, FaMap, FaShip, FaThumbsUp } from "react-icons/fa"
import { FaBoxesPacking } from "react-icons/fa6"
import AnimateIntoView from './AnimateIntoView';


const Statistics = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <AnimateIntoView className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Milestones of Excellence in Logistics</AnimateIntoView>
          <AnimateIntoView delay={1} className="lg:w-2/3 mx-auto leading-relaxed text-base">Delivering seamless logistics solutions, year after year. From trusted partnerships to timely deliveries, we celebrate each achievement that drives us forward. Discover how our dedication to precision and service excellence makes an impact worldwide.</AnimateIntoView>
        </div>
        <AnimateIntoView delay={1.5} className="flex flex-wrap -m-4 text-center">
          <StatisticsItem icon={<FaBoxesPacking />} text={'Deliveries'} count={"+600k"} />
          <StatisticsItem icon={<FaThumbsUp />} text={'Satisfied Clients'} count={"+1M"} />
          <StatisticsItem icon={<FaClock />} text={'Years in Operation'} count={"+25"} />
          <StatisticsItem icon={<FaMap />} text={'Global Reach '} count={"50+"} />
        </AnimateIntoView>
      </div>
    </section>
  )
}

function StatisticsItem({ icon, text, count }) {
  return (
    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
      <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
        <div className="text-3xl text-primary flex justify-center items-center">{icon}</div>
        <h2 className="title-font font-medium text-3xl text-gray-900 font-grotesk mt-2">{count}</h2>
        <p className="leading-relaxed font-oswald mt-2">{text}</p>
      </div>
    </div>
  )
}

export default Statistics