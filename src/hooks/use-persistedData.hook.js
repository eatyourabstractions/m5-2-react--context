import {useState, useEffect} from "react";

export default function usePersistedState(initialVal, nameOfStorage){
    const [data, setData] = useState(() => {
        const prospectVal = localStorage.getItem(nameOfStorage)
        if(prospectVal){
            return JSON.parse(prospectVal)
        } else{
            return initialVal
        }
    })

    // update the storage everytime numCookies changes
    useEffect(() =>{
        localStorage.setItem(nameOfStorage, JSON.stringify(data))
        
    }, [data, nameOfStorage])

    return [data, setData]

}