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
        <>
            <div className='text-black body-font w-screen flex justify-center flex-col items-center'>
                <BackButton />
                <TrackInfo />
                <Trackform setPackageDetails={setPackageDetails} />
                <PackageDetails packageDetails={packageDetails} />
                <TrackingAssistance />
            </div>
            <Footer />
        </>

    )
}

export default Track