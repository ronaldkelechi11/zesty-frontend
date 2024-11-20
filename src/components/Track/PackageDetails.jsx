import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toFloat } from "validator";

const PackageDetails = ({ packageDetails }) => {

    const [fetchedPackage, setFetchedPackage] = useState(
        {
            trackingId: "",
            senderName: "",
            senderAddress: "",
            senderEmailAddress: "",
            senderTelephone: "",
            receiverName: "",
            receiverAddress: "",
            receiverEmailAddress: "",
            receiverTelephone: "",
            originCountry: "",
            destinationCountry: "",
            shipingDate: "",
            expectedDeliveryDate: "",
            typeOfShipment: "",
            carrier: "",
            comments: "",
            status: true,
            currentLocation: "",
            shipingContent: [
                {
                    content: "",
                    quantity: "",
                    weight: ""
                }
            ],
            shipingTracking: [
                {
                    datetime: "",
                    activity: "",
                    location: ""
                }
            ]
        }
    )

    useEffect(() => {
        setFetchedPackage(packageDetails)
    }, [packageDetails])

    return (
        <div className="p-3">
            {
                packageDetails &&

                <div className="flex flex-col p-3 font-grotesk">
                    <div className="flex justify-center items-center ">
                        <img src="/assets/logo.jpg" alt="" className="w-48 h-52" />
                    </div>
                    <p className="text-center">{fetchedPackage.trackingId}</p>

                    <div className="mt-4">
                        <h1 className="font-bold border-b-black border-b mb-2 text-2xl">Shipper Information</h1>
                        <p>{fetchedPackage.senderName}</p>
                        <p>{fetchedPackage.senderEmailAddress}</p>
                        <p>{fetchedPackage.senderTelephone}</p>
                        <p>{fetchedPackage.senderAddress}</p>
                    </div>

                    <div className="mt-4">
                        <h1 className="font-bold border-b-black border-b mb-2 text-2xl">Reciver Information</h1>
                        <p>{fetchedPackage.receiverName}</p>
                        <p>{fetchedPackage.senderEmailAddress}</p>
                        <p>{fetchedPackage.senderTelephone}</p>
                        <p>{fetchedPackage.senderAddress}</p>
                    </div>


                    <div className="mt-4 flex flex-col gap-4">
                        <h1 className="font-bold border-b-black border-b mb-2 text-2xl">Shipment Information</h1>


                        <p className="font-bold">Current Location: <br />
                            <span className={"font-normal uppercase"}>{fetchedPackage.currentLocation}</span>
                        </p>

                        <p className="font-bold">Origin Country: <br />
                            <span className="font-normal">{fetchedPackage.originCountry}</span>
                        </p>

                        <p className="font-bold">Destination Country: <br />
                            <span className="font-normal">{fetchedPackage.destinationCountry}</span>
                        </p>

                        <p className="font-bold">Shipping Date: <br />
                            <span className="font-normal">{fetchedPackage.shipingDate}</span>
                        </p>


                        <p className="font-bold">Expected Arrival Date: <br />
                            <span className="font-normal">{fetchedPackage.expectedDeliveryDate}</span>
                        </p>

                        <p className="font-bold">Type of Shipment: <br />
                            <span className="font-normal">{fetchedPackage.typeOfShipment}</span>
                        </p>

                        <p className="font-bold">Carrier: <br />
                            <span className="font-normal">
                                ZESTY
                            </span>
                        </p>

                        <p className="font-bold">Carrier Reference No: <br />
                            <span className="font-normal uppercase">
                                045783021214-{fetchedPackage.originCountry}</span>
                        </p>

                        <p className="font-bold">Comments: <br />
                            <span className="font-normal">{fetchedPackage.comments}</span>
                        </p>

                        <p className="font-bold">Status: <br />
                            <span className={`font-normal ${fetchedPackage.status ? 'text-green-500' : 'text-red-500'}`}>{fetchedPackage.status ? 'On Transit' : 'On Hold'}</span>
                        </p>
                    </div>

                    {/* Shipment Content */}
                    <div className="my-8">
                        <div className="grid grid-cols-2 gap-4 text-center font-semibold text-gray-800 bg-indigo-50 p-4 rounded-md shadow">
                            <p>Content</p>
                            <p>Weight (Kg)</p>
                        </div>

                        <div className="text-center text-gray-700 mt-4">
                            {fetchedPackage.shipingContent?.map((item, index) => (
                                <div key={index} className="grid grid-cols-2 gap-4">
                                    <p>
                                        <strong> ({item.quantity}) </strong>
                                        {item.content}</p>
                                    <p>{item.weight}</p>
                                </div>
                            ))}
                        </div>

                    </div>


                    {/* Shipment Travel History */}
                    <div className="my-8">
                        <div className="grid grid-cols-3 gap-4 text-center font-semibold text-gray-800 bg-indigo-50 p-4 rounded-md shadow">
                            <p>Time</p>
                            <p>Activity</p>
                            <p>Location</p>
                        </div>
                        <div className="text-center flex flex-col gap-3 text-gray-700 mt-4">
                            {fetchedPackage.shipingTracking?.map((trackingItem, index) => (
                                <div key={index} className="grid grid-cols-3 gap-4 ">
                                    <p>{trackingItem.datetime}</p>
                                    <p>{trackingItem.activity}</p>
                                    <p
                                        className="underline cursor-pointer text-indigo-600 hover:text-indigo-400">
                                        {trackingItem.location}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default PackageDetails