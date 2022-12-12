import styles from '../styles/Home.module.css'
import Header from "../components/Header";
import { useAccount, useConnect } from 'wagmi';
import { useEffect, useState } from "react";
import { InjectedConnector } from 'wagmi/connectors/injected'
export default function Home() {
    const { address, isConnected } = useAccount()
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })

    //const [ connectWallet, makeConnect ] = useState();

    useEffect(() => {
        if (isConnected) return
        connect();
    }, [isConnected]);

    return (
        <>
            <Header/>
            {(isConnected) ?
                <div>Connected to {address}</div> :
                <button onClick={() => connect()}>Connect Wallet</button>
            }
        </>
    )
}
