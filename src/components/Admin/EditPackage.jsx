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
                    remark: "",
                    location: ""
                }
            ]
        }
    )

    // Content
    const [content, setContent] = useState({ quantity: '', content: '', weight: '' });
    const addToContentArray = () => {
        if (!content.quantity || !content.content || !content.weight) {
            toast.error('All fields in shipping content are required');
            return;
        }
        setFetchedPackage((prev) => ({
            ...prev,
            shipingContent: [...prev.shipingContent, { ...content, weight: `${content.weight}Kg` }],
        }));
        setContent({ quantity: '', content: '', weight: '' });
    };

    // For tracking
    const [tracking, setTracking] = useState({ date: '', time: '', remark: '', location: '' });

    const addToTrackingArray = async () => {
        if (!tracking.date || !tracking.time || !tracking.remark || !tracking.location) {
            toast.error('All fields in tracking are required');
            return;
        }
        const datetime = `${tracking.date} ${tracking.time}`;

        await setFetchedPackage((prev) => ({
            ...prev,
            shipingTracking: [...prev.shipingTracking, { datetime, remark: tracking.remark, location: tracking.location }],
        }));
        setTracking({ date: '', time: '', remark: '', location: '' });
    };


    // Incase you pass an edit from the All packages layout
    useEffect(() => {
        if (location.state) {
            setFetchedPackage(location.state);
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
        console.log(fetchedPackage);

        setIsLoading(true)
        axios.put(API_URL + "/admin", { fetchedPackage })
            .then((result) => {
                setFetchedPackage({
                    trackingId: '',
                    senderName: '',
                    senderAddress: '',
                    senderEmailAddress: '',
                    senderTelephone: '',
                    receiverName: '',
                    receiverAddress: '',
                    receiverEmailAddress: '',
                    receiverTelephone: '',
                    originCountry: '',
                    destinationCountry: '',
                    shipingDate: '',
                    expectedDeliveryDate: '',
                    typeOfShipment: '',
                    carrier: '',
                    comments: '',
                    status: false,
                    shipingContent: [],
                    shipingTracking: [],
                });
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
                <ShippingContentSection content={content} setContent={setContent} addToContentArray={addToContentArray} fetchedPackage={fetchedPackage} setFetchedPackage={setFetchedPackage} />


                {/* Shiping Tracking Section */}
                <ShipmentTrackingSection tracking={tracking} setTracking={setTracking} addToTrackingArray={addToTrackingArray} fetchedPackage={fetchedPackage} setFetchedPackage={setFetchedPackage} />

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
        </div >
    )
}

const ShippingContentSection = ({
    content,
    setContent,
    addToContentArray,
    fetchedPackage,
    setFetchedPackage
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setContent((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditContent = (index) => {
        // Load the content to the input fields for editing
        const itemToEdit = fetchedPackage.shipingContent[index];
        setContent(itemToEdit);
        // Remove the item temporarily from the list for editing
        setFetchedPackage((prev) => ({
            ...prev,
            shipingContent: prev.shipingContent.filter((_, i) => i !== index),
        }));
    };

    const handleDeleteContent = (index) => {
        // Remove the selected content from the list
        setFetchedPackage((prev) => ({
            ...prev,
            shipingContent: prev.shipingContent.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="mt-5">
            <p className="font-extrabold">Shipping Content</p>
            <div className="flex flex-col md:flex-row gap-2 mt-2">
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={content.quantity || ""}
                    onChange={handleChange}
                    className="border border-black p-2 rounded"
                />
                <input
                    type="text"
                    name="content"
                    placeholder="Content"
                    value={content.content || ""}
                    onChange={handleChange}
                    className="border border-black p-2 rounded"
                />
                <input
                    type="number"
                    name="weight"
                    placeholder="Weight (Kg)"
                    value={content.weight || ""}
                    onChange={handleChange}
                    className="border border-black p-2 rounded"
                />
                <button
                    onClick={addToContentArray}
                    className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-all"
                >
                    {content.id !== undefined ? "Update" : "Add"}
                </button>
            </div>

            <div className="mt-3">
                <ul>
                    {fetchedPackage.shipingContent.map((item, index) => (
                        <div key={index} className="p-4 bg-gray-50 border rounded mb-2 flex justify-between items-center">
                            <div>
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                <p><strong>Content:</strong> {item.content}</p>
                                <p><strong>Weight:</strong> {item.weight}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEditContent(index)}
                                    className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition-all"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteContent(index)}
                                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};


const ShipmentTrackingSection = ({
    tracking,
    setTracking,
    addToTrackingArray,
    fetchedPackage,
    setFetchedPackage
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTracking((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditTracking = (index) => {
        // Load the tracking entry into input fields for editing
        const trackingToEdit = fetchedPackage.shipingTracking[index];
        setTracking(trackingToEdit);
        // Temporarily remove the item from the tracking list
        setFetchedPackage((prev) => ({
            ...prev,
            shipingTracking: prev.shipingTracking.filter((_, i) => i !== index),
        }));
    };

    const handleDeleteTracking = (index) => {
        // Remove the selected tracking record from the list
        setFetchedPackage((prev) => ({
            ...prev,
            shipingTracking: prev.shipingTracking.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="mt-5">
            <p className="font-extrabold">Shipment Tracking</p>
            <div className="flex flex-col md:flex-row gap-2 mt-2">
                <input
                    type="date"
                    name="date"
                    value={tracking.date || ""}
                    onChange={handleChange}
                    className="border border-black p-2 rounded"
                />
                <input
                    type="time"
                    name="time"
                    value={tracking.time || ""}
                    onChange={handleChange}
                    className="border border-black p-2 rounded"
                />
                <input
                    type="text"
                    name="remark"
                    placeholder="Remark"
                    value={tracking.remark || ""}
                    onChange={handleChange}
                    className="border border-black p-2 rounded"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={tracking.location || ""}
                    onChange={handleChange}
                    className="border border-black p-2 rounded"
                />
                <button
                    onClick={addToTrackingArray}
                    className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-green-600 transition-all"
                >
                    {tracking.id !== undefined ? "Update" : "Add"}
                </button>
            </div>
            <div className="mt-3">
                <ul>
                    {fetchedPackage.shipingTracking.map((item, index) => (
                        <div
                            key={index}
                            className="p-4 bg-gray-50 border rounded mb-2 flex justify-between items-center"
                        >
                            <div>
                                <p><strong>Date/Time:</strong> {item.datetime} {item.time}</p>
                                <p><strong>Remark:</strong> {item.remark}</p>
                                <p><strong>Location:</strong> {item.location}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEditTracking(index)}
                                    className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition-all"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteTracking(index)}
                                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default EditPackage