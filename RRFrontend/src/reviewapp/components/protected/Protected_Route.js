import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Protected_route(props){
    const {Component} = props ;
    const navigate =useNavigate();
    useEffect(()=>{
        let user = localStorage.getItem("user");
        if(!user){
            navigate("/");
        }
    });
    return(
        <>
        <Component/>
        </>
    );
}