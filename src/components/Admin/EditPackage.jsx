import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import InputField from './InputField';
import { motion } from 'framer-motion';
import { CgSpinner } from "react-icons/cg";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'
import axios from "axios";

const EditPackage = () => {
    const location = useLocation()
    const [isLoading, setIsLoading] = useState()
    const API_URL = import.meta.env.VITE_API_URL
    const [searchTrackingId, setSearchTrackingId] = useState()
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

    // For tracking
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [activity, setActivity] = useState("");
    const [itemLocation, setItemLocation] = useState("");
    const addToTrackingArray = async () => {
        const dt = `${date} ${time}`;
        fetchedPackage.shipingTracking.push(
            { datetime: dt, activity, itemLocation }
        )
        setDate("");
        setTime("");
        setActivity("");
        setItemLocation("");
    };


    // Incase you pass an edit from the All packages layout
    useEffect(() => {
        if (location.state) {
            setFetchedPackage(location.state)
        }
    }, [])

    function searchForPackage() {
        axios.post(API_URL, { trackingId: searchTrackingId })
            .then((result) => {
                setFetchedPackage(result.data.trackingPackage)
                toast.success('Package Found')
            }).catch((err) => {
                toast.error(`${err?.message}`)
            });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFetchedPackage((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    function handleSubmit() {
        setIsLoading(true)
        console.log(fetchedPackage);
        axios.put(API_URL + "/admin", { fetchedPackage })
            .then((result) => {
                toast.success(`Package Updated`)
                setIsLoading(false)
            }).catch((err) => {
                toast.error(`${err?.message}`)
                setIsLoading(false)
            });
    }

    return (
        <div className="p-3">
            <ToastContainer position='top-right' limit={2} hideProgressBar closeOnClick={true} />
            <p className='mt-12 font-extrabold text-2xl border-b border-b-black'>Edit Package</p>
            <div className="w-full">
                <InputField placeholder={'Search Tracking Code'} value={searchTrackingId}
                    onChange={({ target }) => { setSearchTrackingId(target.value) }} />
                <button className="bg-purple-500 text-white px-3 py-3 rounded-md" onClick={searchForPackage}>Search</button>
            </div>

            <div className="flex flex-col py-3">
                <p className="font-extrabold text-xl text-center">{fetchedPackage.trackingId}</p>
                <InputField label={'Sender Name'} placeholder={fetchedPackage.senderName} name={"senderName"} value={fetchedPackage.senderName} type={'text'} onChange={handleChange} />

                <InputField label={'Sender Address'} placeholder={fetchedPackage.senderAddress} name={"senderAddress"} value={fetchedPackage.senderAddress} type={'text'} onChange={handleChange} />

                <InputField label={'Sender Email'} placeholder={fetchedPackage.senderEmailAddress} name={"senderEmailAddress"} value={fetchedPackage.senderEmailAddress} type={'text'} onChange={handleChange} />

                <InputField label={'Sender Telephone'} placeholder={fetchedPackage.senderTelephone} name={"senderTelephone"} value={fetchedPackage.senderTelephone} type={'text'} onChange={handleChange} />

                <InputField label={'Receiver Name'} placeholder={fetchedPackage.receiverName} name={"receiverName"} value={fetchedPackage.receiverName} type={'text'} onChange={handleChange} />

                <InputField label={'Receiver Address'} placeholder={fetchedPackage.receiverAddress} name={"receiverAddress"} value={fetchedPackage.receiverAddress} type={'text'} onChange={handleChange} />

                <InputField label={'Receiver Email'} placeholder={fetchedPackage.receiverEmailAddress} name={"receiverEmailAddress"} value={fetchedPackage.receiverEmailAddress} type={'text'} onChange={handleChange} />

                <InputField label={'Receiver Telephone'} placeholder={fetchedPackage.receiverTelephone} name={"receiverTelephone"} value={fetchedPackage.receiverTelephone} type={'text'} onChange={handleChange} />


                <InputField label={'Origin Country'} placeholder={fetchedPackage.originCountry} name={"originCountry"} value={fetchedPackage.originCountry} type={'text'} onChange={handleChange} />

                <InputField label={'Destination Country'} placeholder={fetchedPackage.destinationCountry} name={"destinationCountry"} value={fetchedPackage.destinationCountry} type={'text'} onChange={handleChange} />


                <InputField label={'Shipment Date'} placeholder={fetchedPackage.shipingDate} name={"shipingDate"} value={fetchedPackage.shipingDate} type={'text'} onChange={handleChange} />

                <InputField label={'Due Date'} placeholder={fetchedPackage.expectedDeliveryDate} name={"expectedDeliveryDate"} value={fetchedPackage.expectedDeliveryDate} type={'text'} onChange={handleChange} />


                <InputField label={'Type of Shipment'} placeholder={fetchedPackage.typeOfShipment} name={"typeOfShipment"} value={fetchedPackage.typeOfShipment} type={'text'} onChange={handleChange} />

                <InputField label={'Comments'} placeholder={fetchedPackage.comments} name={"comments"} value={fetchedPackage.comments} type={'text'} onChange={handleChange} />

                <div className="mt-3 flex flex-col gap-2">
                    <label className="font-bold">Status</label>
                    <select
                        name={"status"}
                        value={fetchedPackage.status}
                        onChange={handleChange}
                        className="bg-transparent text-sm border border-black text-black rounded-lg p-3 hover:scale-105 transition-all"
                    >
                        <option value={false}>On Hold</option>
                        <option value={true}>On Transit</option>
                    </select>
                </div>


                {/* Shipping Content Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipping Content</h3>
                    <div className="space-y-4">
                        {fetchedPackage.shipingContent.map((item, index) => (
                            <div key={index} className="p-4 bg-gray-50 border rounded">
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                <p><strong>Content:</strong> {item.content}</p>
                                <p><strong>Weight:</strong> {item.weight}</p>
                            </div>
                        ))}
                    </div>
                    {/* <div className="mt-4">
                        <div className="md:grid grid-cols-3 gap-4 flex flex-col">
                            <input
                                type="text"
                                placeholder="Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="p-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="p-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Weight (KG)"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="p-2 border rounded"
                            />
                        </div>
                        <button
                            onClick={addToArray}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                            Add Content
                        </button>
                    </div> */}
                </div>


                {/* Shipment Tracking */}
                <div className="mt-8">
                    <h3 className="font-bold">Shipment Tracking</h3>
                    <div className="space-y-4">
                        {fetchedPackage.shipingTracking.map((item, index) => (
                            <div key={index} className="p-4 bg-gray-50 border rounded">
                                <p><strong>Date/Time:</strong> {item.datetime}</p>
                                <p><strong>Activity:</strong> {item.activity}</p>
                                <p><strong>Location:</strong> {item.location}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 md:grid grid-cols-4 gap-4 flex flex-col">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="p-2 border rounded text-gray-400 w-full"
                        />
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="p-2 border rounded text-gray-400 w-full"
                        />
                        <input
                            type="text"
                            placeholder="Activity"
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={itemLocation}
                            onChange={(e) => setItemLocation(e.target.value)}
                            className="p-2 border rounded"
                        />
                    </div>
                    <button
                        onClick={addToTrackingArray}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Add Tracking
                    </button>
                </div>


                <button className="bg-primary text-white text-center px-4 py-2 mt-4 rounded-md flex justify-center items-center"
                    onClick={handleSubmit}>
                    {isLoading ?
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <CgSpinner />
                        </motion.div>
                        : 'Update'}
                </button>
            </div>
        </div>
    )
}

export default EditPackage