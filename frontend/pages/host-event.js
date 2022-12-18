import styles from '../styles/HostEvent.module.css'
import Header from "../components/Header";
import { useAccount, useConnect, useSigner } from 'wagmi';
import { useEffect, useState, useRef} from "react";
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button, Container, Input, FormLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import { ethers, BigNumber } from "ethers";
import { ticketByteCode,ticketDeployedBytecode, ticketABI, marketByteCode, marketDeployByteCode, marketABI } from "../constants";

export default function HostEvent() {
    const { address, isConnected } = useAccount();
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    });

    const [ connectWallet, makeConnect ] = useState(false);
    const editorRef = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false)
    const { CKEditor, ClassicEditor } = editorRef.current || {}
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [preview, setPreview] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm({criteriaMode: "all"});

    const { data: signer, isError, isLoading } = useSigner();
    const [ticketButton, setTicketButton] = useState(false);
    const [marketButton, setMarketButton] = useState(true);
    const [ticketAddress, setTicketAddress] = useState('');
    const [marketAddress, setMarketAddress] = useState('');



    useEffect(() => {
        isConnected ? makeConnect(true) : makeConnect(false);
    }, [isConnected]);

    useEffect(() => {
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
        }
        setEditorLoaded(true)
    }, [])

    useEffect(() => {
        if (image) {
            console.log("1");
            const reader = new FileReader();
            reader.onloadend = (e) => {
                console.log("2");
                setPreview(e.target.result);
                console.log("preview",preview);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
        }
    }, [image]);

    function handleImage(e) {
        const file = e.target.files[0];
        if (file && file.type.substring(0,5) === "image") {
            // console.log(file);
            setImage(file);
        } else {
            setImage(null);
        }
    }

    async function deployTicket(data) {
        console.log("data",data);

        try {
            if (isConnected) {
                console.log("Deploying...");

                if (!signer) {
                    return alert("Signer not found");
                }

                // Check the required fields
                if (data.eventName.length == 0 || data.eventSymbol.length == 0 || data.ticketSupply.length == 0 ||
                    data.ticketPrice.length == 0 || data.startTime.length == 0 || data.royaltyRate.length == 0 ||
                    data.refundTime.length == 0 || data.refundRate.length == 0) {
                    return alert("Please fill in all the fields");
                }

                // Convert local time to Unix time
                const startTime = new Date(data.startTime).getTime();
                const refundTime = new Date(data.refundTime).getTime();
                let endTime;
                if (data.endTime.length != 0) {
                    endTime = new Date(data.endTime).getTime();
                } else {
                    endTime = startTime;
                }

                // Check time
                const now = new Date().getTime();
                if (startTime < now || refundTime < now ) {
                    return alert("Invalid time");
                }
                setTicketButton(true);
                const Ticket = new ethers.ContractFactory(ticketABI, ticketByteCode, signer);
                const ticket = await Ticket.deploy(data.eventName, data.eventSymbol, data.ticketSupply);
                await ticket.deployed();

                setTicketAddress(ticket.address);
                setMarketButton(false);
            } else {
                return alert("Please connect your wallet");
            }
        } catch (e){
            setTicketButton(false);
            return alert("Transaction rejected");
        }

    }

    async function deployMarket(data) {
        console.log("data",data);
        try {
            if (isConnected) {

                if (!signer) {
                    return alert("Signer not found");
                }

                // Convert local time to Unix time
                const startTime = new Date(data.startTime).getTime();
                const refundTime = new Date(data.refundTime).getTime();
                let endTime;
                if (data.endTime.length != 0) {
                    endTime = new Date(data.endTime).getTime();
                } else {
                    endTime = startTime;
                }

                const Market = new ethers.ContractFactory(marketABI, marketByteCode, signer);
                setMarketButton(true);
                const market = await Market.deploy(
                    ticketAddress,
                    startTime,
                    data.ticketPrice,
                    data.royaltyRate,
                    refundTime,
                    data.refundRate);
                await market.deployed();
                console.log("Market deployed to:", market.address);
            } else {
                return alert("Please connect your wallet");
            }
        } catch (e) {
            setMarketButton(false);
        }
    }

    return (
        <>
            <Header/>
            {
                (!connectWallet) ? <button onClick={() => connect()}>Connect Wallet</button> :
                    (editorLoaded) ?
                    <Container
                        sx={{
                            margin: 'auto',
                            marginTop: 10,
                            boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            padding: 10,
                            width: '60%',
                            ":hover": {
                                boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)',
                            },
                        }}
                    >
                        <div>Connected to {address}</div>
                        <h1>Create Event</h1>
                        <form>
                            <Container className={styles.preview}>
                                { preview ? <img className={styles.uploadImage} src={preview}/>
                                    : <label className={styles.inputImg} htmlFor="event-img">Upload Event Cover Image</label>
                                }
                                <input  style={{display: "none"}} type="file" id="event-img" name="event-img" accept="image/*" onChange={handleImage} />
                            </Container>

                            <h2>Basic Information</h2>
                            <FormLabel className={styles.inputLabel} htmlFor="eventName">Event Name</FormLabel>
                            <Input id="eventName" name="eventName" className={styles.input} type="text" {...register("eventName", {required: true, maxLength:50})} />
                            {errors.eventName?.type === 'required' && <p className={styles.alert} role="alert">Event name is required</p>}

                            <FormLabel className={styles.inputLabel} htmlFor="startTime">Start Time</FormLabel>
                            <Input id="startTime" name="startTime" className={styles.input} type="datetime-local" {...register("startTime", {required: true})} />
                            {errors.startTime?.type === 'required' && <p className={styles.alert} role="alert">Start time is required</p>}

                            <FormLabel className={styles.inputLabel} htmlFor="endTime">End Time</FormLabel>
                            <Input id="endTime" name="endTime" className={styles.input} type="datetime-local" {...register("endTime")} />

                            <FormLabel className={styles.inputLabel} htmlFor="location">Location</FormLabel>
                            <Input id="location" name="location" className={styles.input} type="text" {...register("location")} />

                            <FormLabel className={styles.inputLabel} htmlFor="description">Description</FormLabel>
                            <CKEditor
                                id="description"
                                className={styles.input}
                                editor={ClassicEditor}
                                data={text}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setText(data);
                                }}
                            />
                            <h2>Contract Setting</h2>
                            <FormLabel className={styles.inputLabel} htmlFor="eventSymbol">Event Symbol</FormLabel>
                            <Input id="eventSymbol" name="eventSymbol" className={styles.input} type="text" {...register("eventSymbol",{required: true, maxLength: 10})} />
                            {errors.eventSymbol?.type === 'required' && <p className={styles.alert} role="alert">Symbol is required.</p>}
                            {errors.eventSymbol?.type === 'maxLength' && <p className={styles.alert} role="alert">Max length is 10.</p>}

                            <FormLabel className={styles.inputLabel} htmlFor="ticketPrice">Ticket Base Price (in ETH)</FormLabel>
                            <Input id="ticketPrice" name="ticketPrice" className={styles.input} type="number" inputProps={{min:0}} {...register("ticketPrice",{required:true, min:0})} />
                            {errors.ticketPrice?.type === 'required' && <p className={styles.alert} role="alert">Ticket price is required.</p>}
                            {errors.ticketPrice?.type === 'min' && <p className={styles.alert} role="alert">Ticket price should not be negative.</p>}

                            <FormLabel className={styles.inputLabel} htmlFor="ticketSupply">Total Ticket Supply</FormLabel>
                            <Input id="ticketSupply" name="ticketSupply" className={styles.input} type="number" inputProps={{min:1}} {...register("ticketSupply", {required:true, min:1})} />
                            {errors.ticketSupply?.type === 'required' && <p className={styles.alert} role="alert">Ticket supply amount is required.</p>}
                            {errors.ticketSupply?.type === 'min' && <p className={styles.alert} role="alert">Ticket supply amount at least should be 1.</p>}

                            <FormLabel className={styles.inputLabel} htmlFor="royaltyRate">Royalty Rate (%)</FormLabel>
                            <Input id="royaltyRate" name="royaltyRate" className={styles.input} type="number" inputProps={{min:0, max:100}} {...register("royaltyRate",{required:true, min:0, max:100})} />
                            {errors.royaltyRate?.type === 'required' && <p className={styles.alert} role="alert">Royalty Rate is required.</p>}
                            {errors.royaltyRate?.type === 'min' && <p className={styles.alert} role="alert">Royalty Rate should not be negative.</p>}
                            {errors.royaltyRate?.type === 'max' && <p className={styles.alert} role="alert">Royalty Rate should not be greater than 100.</p>}

                            <FormLabel className={styles.inputLabel} htmlFor="refundTime">Refund Time</FormLabel>
                            <Input id="refundTime" name="refundTime" className={styles.input} type="datetime-local" {...register("refundTime", {required:true})} />
                            {errors.refundTime?.type === 'required' && <p className={styles.alert} role="alert">Refund Time is required.</p>}

                            <FormLabel className={styles.inputLabel} htmlFor="refundRate">Refund Rate (%)</FormLabel>
                            <Input id="refundRate" name="refundRate" className={styles.input} type="number" inputProps={{min:0, max:100}} {...register("refundRate")} />
                            {errors.refundRate?.type === 'required' && <p className={styles.alert} role="alert">Refund Rate is required.</p>}
                            {errors.refundRate?.type === 'min' && <p className={styles.alert} role="alert">Refund Rate should not be negative.</p>}
                            {errors.refundRate?.type === 'max' && <p className={styles.alert} role="alert">Refund Rate should not be greater than 100.</p>}

                            <div className={styles.confirm}>
                                <Button  id="event-submit" variant="contained" type="submit" disabled={ticketButton} onClick={handleSubmit(deployTicket)}>Deploy Ticket Contract</Button>
                            </div>
                            {ticketAddress? <p className={styles.tip}>Ticket contract deployed successfully. Address: {ticketAddress}</p>: null}
                            <div className={styles.confirm}>
                                <Button  id="event-submit" variant="contained" type="submit" disabled={marketButton} onClick={handleSubmit(deployMarket)}>Deploy Market Contract</Button>
                            </div>
                            {marketAddress? <p className={styles.tip}>market contract deployed successfully. Address: {marketAddress}</p>: null}
                        </form>

                    </Container>:
                    <div>Loading...</div>
            }
        </>
    )

}

