import Header from "../components/Header";
import ContractModal from "../components/ContractModel";
import styles from '../styles/Profile.module.css';
import { useAccount, useConnect } from 'wagmi';
import { useEffect, useState, useRef} from "react";
import { Container } from "@mui/material";
import {InjectedConnector} from "wagmi/connectors/injected";
import axios from "axios";

export default function Profile() {
    const [ connectWallet, makeConnect ] = useState(false);
    const { address, isConnected } = useAccount();
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    });
    const [event, setEvent] = useState([]);

    useEffect(() => {
        isConnected ? makeConnect(true) : makeConnect(false);
    }, [isConnected]);

    useEffect(() => {
        if (address) {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/event/admin?account=${address}`).then((res) => {
                setEvent(res.data);
            })
        } else {
            setEvent([]);
        }
        },[address]);
    console.log('event',event);
        return (
            <>
                <Header/>
                {
                    (!connectWallet) ? <button onClick={() => connect()}>Connect Wallet</button> :
                        (event.length === 0) ? <p>Loading...</p> :
                        <Container
                            sx={{
                                margin: 'auto',
                                marginTop: 10,
                                boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 5,
                                padding: 10,
                                width: '70%',
                                backgroundColor: '#fff',
                                ":hover": {
                                    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)',
                                },
                            }}
                        >
                            <h2 className={styles.h2}>Events Management</h2>
                            <ul>
                               <li className={styles.title}>
                                   <div className={styles.titleDiv}><span className={styles.titleName}>Name</span></div>
                                   <div className={styles.titleDiv}><span className={styles.titleName}>Start Time</span></div>
                                   <div className={styles.titleDiv}><span className={styles.titleName}>End Time</span></div>
                                   <div className={styles.titleDiv}><span className={styles.titleName}>Ticket Total Supply</span></div>
                                   <div className={styles.titleDiv}><span className={styles.titleName}>Sold</span></div>
                                   <div className={styles.titleDiv}><span className={styles.titleName}>Contract</span></div>
                               </li>
                                {
                                    event['data'].map((item, index) => {
                                        const startTime = new Date(parseInt(item['start_time'] * 1000));
                                        const endTime = new Date(parseInt(item['end_time'] * 1000));
                                        return (
                                            <li className={styles.entries} key={index}>
                                                <div className={styles.entriesDiv}><span className={styles.entriesName}>{item['name']}</span></div>
                                                <div className={styles.entriesDiv}><span className={styles.entriesName}>
                                                    {startTime.getFullYear()}/{startTime.getMonth()+1}/{startTime.getDate()}
                                                </span></div>
                                                <div className={styles.entriesDiv}><span className={styles.entriesName}>
                                                    {endTime.getFullYear()}/{endTime.getMonth()+1}/{endTime.getDate()}
                                                </span></div>
                                                <div className={styles.entriesDiv}><span className={styles.entriesName}>{item['ticket_total']}</span></div>
                                                <div className={styles.entriesDiv}><span className={styles.entriesName}>0</span></div>
                                                <div className={styles.entriesDiv}><ContractModal props={item} /></div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </Container>
                }

            </>
        );
}
