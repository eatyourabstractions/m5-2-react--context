import {useState, useEffect} from "react";
//import { items } from "../components/data";



export default function useWhileAwayCookies(setNumCookies, purchasedItems, calculateCookiesPerSecond){
    
    const itemsPerSec = calculateCookiesPerSecond(purchasedItems);
    const [myDate, setMyDate] = useState(() =>{
        const lastTime = localStorage.getItem('lastTime')
        if(lastTime){
            const aDate =  Date.parse(JSON.parse(lastTime))
            localStorage.setItem('lastTime', undefined)
            return aDate
        } else{
            return 'INIT_DATE'
        }
    })

    const onTabClose = (ev) =>{
        localStorage.setItem('lastTime', JSON.stringify(new Date()))
    }


    useEffect(() =>{
    window.addEventListener("beforeunload", onTabClose);
        return () =>{
            window.removeEventListener("beforeunload", onTabClose)
        }
    }, [])

    const initializeIT = () =>{
        if(myDate !== 'INIT_DATE'){
            const endDate = new Date()
            const seconds = Math.ceil((endDate.getTime() - myDate) / 1000) ;
            
            setNumCookies((curr) => curr + (itemsPerSec * seconds))
            
        } 
    }
    
    useEffect( initializeIT,[])
    

}