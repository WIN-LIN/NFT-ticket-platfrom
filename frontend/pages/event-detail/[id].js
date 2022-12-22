import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Id() {

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/event/all`).then((res) => {
            console.log('res',res.data);
        });
    }, []);

    return (
        <>
            <Header/>
            <div>EventDetail</div>
        </>
    );
}