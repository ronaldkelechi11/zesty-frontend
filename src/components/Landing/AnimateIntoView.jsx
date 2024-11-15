import { useInView, motion } from 'framer-motion'
import { useRef } from 'react'

const AnimateIntoView = ({ children, delay = 0.5, ...props }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut", delay: delay }}
            ref={ref} {...props}
        >
            {children}
        </motion.div>
    )
}

export default AnimateIntoView