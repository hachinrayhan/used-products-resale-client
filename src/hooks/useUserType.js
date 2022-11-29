import { useEffect, useState } from "react"

const useUserType = email => {
    const [userType, setUserType] = useState('');
    const [isUserTypeLoading, setIsUserTypeLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/type/${email}`)
                .then(res => res.json())
                .then(data => {
                    setUserType(data.user_type);
                    setIsUserTypeLoading(false);
                })
        }
    }, [email])
    return [userType, isUserTypeLoading];
}

export default useUserType;