import { Clipboard } from '@iconsans/react/linear';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import InputField from './InputField';
import { motion } from 'framer-motion';
import { CgSpinner } from 'react-icons/cg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPackage = () => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const [isLoading, setIsLoading] = useState(false);
    const [trackingCode, setTrackingCode] = useState('0000000000000000-CARGO');
    const [fetchedPackage, setFetchedPackage] = useState({
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
        currentLocation: '',
        shipingContent: [],
        shipingTracking: [],
    });

    // For shipping content
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

    const addToTrackingArray = () => {
        if (!tracking.date || !tracking.time || !tracking.remark || !tracking.location) {
            toast.error('All fields in tracking are required');
            return;
        }
        const datetime = `${tracking.date} ${tracking.time}`;
        setFetchedPackage((prev) => ({
            ...prev,
            shipingTracking: [...prev.shipingTracking, { datetime, remark: tracking.remark, location: tracking.location }],
        }));
        setTracking({ date: '', time: '', remark: '', location: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFetchedPackage((prev) => ({ ...prev, [name]: value }));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(trackingCode).then(
            () => toast.success('Tracking Code copied to Clipboard'),
            () => toast.error('Failed to Copy')
        );
    };

    const generateTrackingCode = () => {
        const alphanum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 16; i++) {
            code += alphanum[Math.floor(Math.random() * alphanum.length)];
        }
        const newCode = `${code}-CARGO`
        setTrackingCode(newCode);
        setFetchedPackage((prev) => ({
            ...prev,
            trackingId: newCode, // Updates trackingId in fetchedPackage
        }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        // Validation
        if (!fetchedPackage.senderName || !fetchedPackage.receiverName || !fetchedPackage.originCountry || !fetchedPackage.destinationCountry) {
            toast.error('Required fields are missing');
            setIsLoading(false);
            return;
        }

        try {
            await axios.post(`${API_URL}/admin`, fetchedPackage);
            toast.success('New Package Added');
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
                currentLocation: '',
                shipingContent: [],
                shipingTracking: [],
            });
            setTrackingCode('0000000000000000-CARGO');
            navigate('/admin');
        } catch ({ response }) {
            toast.error(response?.data?.message || 'Error adding package');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-3">
            <ToastContainer position="top-right" limit={2} hideProgressBar closeOnClick />
            <p className="mt-12 font-extrabold text-2xl border-b border-b-black">Add Packages</p>

            <div className="flex flex-col">
                {/* Dynamic Input Fields */}
                {[
                    { label: 'Sender Name', name: 'senderName', type: 'text' },
                    { label: 'Sender Address', name: 'senderAddress', type: 'text' },
                    { label: 'Sender Email', name: 'senderEmailAddress', type: 'email' },
                    { label: 'Sender Telephone', name: 'senderTelephone', type: 'text' },
                    { label: 'Receiver Name', name: 'receiverName', type: 'text' },
                    { label: 'Receiver Address', name: 'receiverAddress', type: 'text' },
                    { label: 'Receiver Email', name: 'receiverEmailAddress', type: 'email' },
                    { label: 'Receiver Telephone', name: 'receiverTelephone', type: 'text' },
                    { label: 'Origin Country', name: 'originCountry', type: 'text' },
                    { label: 'Destination Country', name: 'destinationCountry', type: 'text' },
                    { label: 'Shipment Date', name: 'shipingDate', type: 'date' },
                    { label: 'Expected Delivery Date', name: 'expectedDeliveryDate', type: 'date' },
                    { label: 'Type of Shipment', name: 'typeOfShipment', type: 'text' },
                    { label: 'Carrier', name: 'carrier', type: 'text' },
                    { label: 'Comments', name: 'comments', type: 'text' },
                    { label: 'Current Location', name: 'Current Location', type: 'text' },
                ].map((input) => (
                    <InputField key={input.name} label={input.label} name={input.name} value={fetchedPackage[input.name]} type={input.type} onChange={handleChange} placeholder={input.label} />
                ))}

                <div className="mt-3 flex flex-col gap-2">
                    <label className="font-bold">Status</label>
                    <select
                        name="status"
                        value={fetchedPackage.status}
                        onChange={handleChange}
                        className="bg-transparent text-sm border border-black text-black rounded-lg p-3 hover:scale-105 transition-all">
                        <option value={false}>On Hold</option>
                        <option value={true}>On Transit</option>
                    </select>
                </div>

                {/* Shipping Content Section */}
                <ShippingContentSection content={content} setContent={setContent} addToContentArray={addToContentArray} fetchedPackage={fetchedPackage} setFetchedPackage={setFetchedPackage} />

                {/* Shipment Tracking Section */}
                <ShipmentTrackingSection tracking={tracking} setTracking={setTracking} addToTrackingArray={addToTrackingArray} fetchedPackage={fetchedPackage} setFetchedPackage={setFetchedPackage} />

                {/* Generate Tracking Code */}
                <div className="w-full flex flex-col gap-2 mt-12">
                    <p className="border border-gray-200 p-2 flex flex-row items-center justify-between">
                        {trackingCode}
                        <Clipboard onClick={copyToClipboard} />
                    </p>
                    <button className="bg-blue-500 text-white px-3 py-3 rounded-md" onClick={generateTrackingCode}>
                        Generate
                    </button>
                </div>

                <button
                    className="bg-primary text-white px-4 py-3 rounded-md flex justify-center items-center mt-3"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                            <CgSpinner />
                        </motion.div>
                    ) : (
                        'Add Package'
                    )}
                </button>
            </div>
        </div>
    );
};

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
                                <p><strong>Date/Time:</strong> {item.date} {item.time}</p>
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


export default AddPackage;
