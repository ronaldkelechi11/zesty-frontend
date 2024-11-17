import React from 'react'

const ProtectedRoutes = () => {
    const navigate = useNavigate()

    useEffect(() => {
        console.log(!sessionStorage.getItem('loggedIn'));
        if (!sessionStorage.getItem('loggedIn')) {
            navigate("/")
        }
    }, [])

    return (
        <div>ProtectedRoutes</div>
    )
}

export default ProtectedRoutes