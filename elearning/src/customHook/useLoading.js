
import { useState } from 'react'
import { useEffect } from 'react'
const useLoading = () => {
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        setTimeout(()=> {
            setLoading(!loading)
        }, 1000)
    }, [])
    return {loading}
}
export default useLoading
