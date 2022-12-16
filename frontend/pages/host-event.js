import styles from '../styles/HostEvent.module.css'
import Header from "../components/Header";
import { useAccount, useConnect } from 'wagmi';
import { useEffect, useState, useRef } from "react";
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button, TextField, Container, Input, FormLabel} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

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
    const { register, handleSubmit, control } = useForm();

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

    function submit(data) {
        console.log(data);
    }


    // async function deploy() {
    //     if (isConnected) {
    //         console.log("Deploying...");
    //     } else {
    //         alert("Please connect your wallet first");
    //     }
    // }

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
                        <form onSubmit={handleSubmit(submit)}>
                            <Container className={styles.preview}>
                                { preview ? <img className={styles.uploadImage} src={preview}/>
                                    : <label className={styles.inputImg} htmlFor="event-img">Upload Event Cover Image</label>
                                }
                                <input  style={{display: "none"}} type="file" id="event-img" name="event-img" accept="image/*" onChange={handleImage} />
                            </Container>

                            <h2>Basic Information</h2>
                            <FormLabel className={styles.inputLabel} htmlFor="eventName">Event Name</FormLabel>
                            <Input id="eventName" name="eventName" className={styles.input} type="text" {...register("eventName")} />
                            <FormLabel className={styles.inputLabel} htmlFor="startTime">Start Time</FormLabel>
                            <Input id="startTime" name="startTime" className={styles.input} type="datetime-local" {...register("startTime")} />
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
                            <FormLabel className={styles.inputLabel} htmlFor="ticketPrice">Ticket Base Price (in ETH)</FormLabel>
                            <Input id="ticketPrice" name="ticketPrice" className={styles.input} type="number" inputProps={{min:0}} {...register("ticketPrice")} />
                            <FormLabel className={styles.inputLabel} htmlFor="ticketSupply">Total Ticket Supply</FormLabel>
                            <Input id="ticketSupply" name="ticketSupply" className={styles.input} type="number" inputProps={{min:1}} {...register("ticketSupply")} />
                            <FormLabel className={styles.inputLabel} htmlFor="royaltyRate">Royalty Rate (%)</FormLabel>
                            <Input id="royaltyRate" name="royaltyRate" className={styles.input} type="number" inputProps={{min:0, max:100}} {...register("royaltyRate")} />
                            <FormLabel className={styles.inputLabel} htmlFor="refundTime">Refund Time</FormLabel>
                            <Input id="refundTime" name="refundTime" className={styles.input} type="datetime-local" {...register("refundTime")} />
                            <FormLabel className={styles.inputLabel} htmlFor="refundRate">Refund Rate (%)</FormLabel>
                            <Input id="refundRate" name="refundRate" className={styles.input} type="number" inputProps={{min:0, max:100}} {...register("refundRate")} />
                            <div className={styles.confirm}>
                                <Button  id="event-submit" variant="contained" type="submit" onClick={handleSubmit(submit)}>Submit</Button>
                            </div>

                        </form>

                    </Container>:
                    <div>Loading...</div>
            }
        </>
    )

}

