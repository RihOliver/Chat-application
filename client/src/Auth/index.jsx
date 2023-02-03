import React from "react";
import { Navigate } from "react-router-dom"


export function PrivateRoute(props) {
    if (!localStorage.getItem('idUser'))
        return <Navigate to={'/'} />
    return <>
        {props.children}
    </>

}
