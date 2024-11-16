import { useState } from 'react';
import BackButton from '../components/basic/BackButton';
import Footer from '../components/Landing/Footer';
import PackageDetails from '../components/Track/PackageDetails';
import Trackform from '../components/Track/Trackform';
import TrackInfo from '../components/Track/TrackInfo';
import TrackingAssistance from '../components/Track/TrackingAssistance';

const Track = () => {
    const [packageDetails, setPackageDetails] = useState("")

    return (
        <div className='text-black body-font w-screen h-screen'>
            <BackButton />
            <TrackInfo />
            <Trackform setPackageDetails={setPackageDetails} />
            <PackageDetails packageDetails={packageDetails} />
            <TrackingAssistance />
            <Footer />
        </div>
    )
}

export default Track