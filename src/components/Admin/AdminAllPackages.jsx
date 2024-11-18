import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const AdminAllPackages = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [fetchedPackages, setFetchedPackages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPackages = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(API_URL + '/admin');
            setFetchedPackages(data.allPackages);
        } catch (err) {
            toast.error(`Error: ${err?.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    return (
        <div className="p-3">
            <p className="mt-12 font-extrabold text-2xl border-b border-b-black">All Packages</p>
            <ToastContainer position="top-right" limit={2} hideProgressBar closeOnClick={true} />

            {isLoading ? (
                <div className="flex p-2">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-3xl text-primary"
                    >
                        <CgSpinner />
                    </motion.div>
                </div>
            ) : fetchedPackages.length > 0 ? (
                <div className="flex flex-col">
                    {fetchedPackages.map((item, index) => (
                        <PackageItem
                            item={item}
                            key={index}
                            onDeleteSuccess={fetchPackages} // Pass the refetch function
                        />
                    ))}
                </div>
            ) : (
                <p>No packages found.</p>
            )}
        </div>
    );
};

function PackageItem({ item, onDeleteSuccess }) {
    const [isLoading, setIsLoading] = useState(false);
    const trackingId = item.trackingId;
    const navigate = useNavigate();

    function handleDelete() {
        setIsLoading(true);

        axios
            .delete(`${import.meta.env.VITE_API_URL}/admin`, {
                data: { trackingId: trackingId },
            })
            .then(() => {
                setIsLoading(false);
                toast.success('Package has been deleted');
                onDeleteSuccess(); // Refetch the packages
            })
            .catch((err) => {
                setIsLoading(false);
                toast.error(`Error: ${err?.message}`);
            });
    }

    return (
        <div className="bg-gray-100 p-3 mt-3 rounded-lg font-grotesk">
            <p className="mb-3">{item?.trackingId}</p>
            <p className="font-extrabold">
                Sender Name: <span className="font-normal">{item?.senderName}</span>
            </p>
            <p className="font-extrabold">
                Receiver Name: <span className="font-normal">{item?.receiverName}</span>
            </p>
            <p className="font-extrabold">
                Receiver Email: <span className="font-normal">{item?.receiverEmailAddress}</span>
            </p>
            <p className="font-extrabold">
                Origin Country: <span className="font-normal">{item?.originCountry}</span>
            </p>
            <p className="font-extrabold">
                Destination Country: <span className="font-normal">{item?.destinationCountry}</span>
            </p>
            <div className="flex flex-row justify-between mt-3">
                <button
                    className="bg-primary text-white px-4 py-2 rounded-md"
                    onClick={handleDelete}
                >
                    {isLoading ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <CgSpinner />
                        </motion.div>
                    ) : (
                        'Delete'
                    )}
                </button>

                <button
                    className="bg-purple-500 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                        navigate('edit', { state: item });
                    }}
                >
                    Edit
                </button>
            </div>
        </div>
    );
}

export default AdminAllPackages;
