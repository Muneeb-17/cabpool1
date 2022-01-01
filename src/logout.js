import React, { useEffect } from 'react';
import { useHistory } from 'react-router';


const Logout = () => {
    const history = useHistory();
    const callLogout = async() => {
        const res = await fetch('/logout', {
            method:"GET",
                 headers:{
                     Accept: "application/json",
                     "Content-Type": "application/json"
             },
                 credentials:"include"
             });
             const data = await res.body;
             if(res.status!== 200)
             {
                history.push('/home');
             }
            
             
            }

        useEffect(()=> {
            callLogout();
        },[]);

    
    return (
    <h1>Logout</h1>
    );
}



export default Logout;