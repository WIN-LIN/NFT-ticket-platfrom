import styles from '../styles/HostEvent.module.css'
import Header from "../components/Header";
import { useAccount, useConnect } from 'wagmi';
import { useEffect, useState, useRef } from "react";
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Box, Button, TextField, Typography, Container} from "@mui/material";
import { usFormControl } from '@mui/material';

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
    const fileInputRef = useRef();
    const [image, setImg] = useState('');
    const [preview, setPreview] = useState('');

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
            const reader = new FileReader();
            reader.onloadend = (e) => {
                setPreview(e.target.result);
            }
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
        }
    }, [image]);

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
                                <button className={styles.inputImg} onClick={ (event) => {
                                    event.preventDefault();
                                    fileInputRef.current.click();
                                }}>
                                    { preview ? <img src={preview} alt="image upload" /> : 'Upload Image' }
                                </button>
                            </Container>

                            <input style={{display: 'none'}} type="file" id="event-img" name="event-img" accept="image/*" ref={fileInputRef} onChange={(event) => {
                                const file = event.target.files[0];
                                if (file && file.type.substring(0,5) === "image") {
                                    setImg(file);
                                } else {
                                    setImg(null);
                                }
                            }}/>
                            <h2>Basic Information</h2>
                            <label className={styles.inputLabel} htmlFor="event-name">Event Name</label>
                            <TextField id="event-name" fullWidth type="text" variant="outlined" margin="normal" required />
                            <label className={styles.inputLabel} htmlFor="event-start-time">Start Time</label>
                            <TextField id="event-start-time" fullWidth type="datetime-local" variant="outlined" margin="normal" required />
                            <label className={styles.inputLabel} htmlFor="event-end-time">End Time</label>
                            <TextField id="event-end-time" fullWidth type="datetime-local" variant="outlined" margin="normal" required />
                            <label className={styles.inputLabel} htmlFor="place">Location</label>
                            <TextField id="place" fullWidth type="text" variant="outlined" margin="normal" />
                            <label className={styles.inputLabel} htmlFor="description">Description</label>
                            <CKEditor
                                id="description"
                                editor={ClassicEditor}
                                data={text}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setText(data);
                                }}
                            />
                            <h2>Contract Setting</h2>
                            <label className={styles.inputLabel} htmlFor="ticket-price">Ticket Base Price (in ETH)</label>
                            <TextField id="ticket-price" fullWidth type="number" variant="outlined" margin="normal" required
                                       inputProps={{min: 0}}
                            />
                            <label className={styles.inputLabel} htmlFor="total-ticket-supply"
                            >Total Ticket Supply</label>
                            <TextField id="total-ticket-supply" fullWidth type="number" variant="outlined" margin="normal" required
                                       inputProps={{min: 1}}
                            />
                            <label className={styles.inputLabel} htmlFor="ticket-supply-amount">Royalty Rate (%)</label>
                            <TextField id="royalty-rate" fullWidth type="number" variant="outlined" margin="normal" required
                                       inputProps={{min: 0 , max: 100}}
                            />
                            <label className={styles.inputLabel} htmlFor="refund-time">Refund Time</label>
                            <TextField id="refund-time" fullWidth type="datetime-local"  variant="outlined" margin="normal" required />
                            <label className={styles.inputLabel} htmlFor="refund-rate">Refund Rate (%)</label>
                            <TextField id="refund-rate" fullWidth type="number" variant="outlined" margin="normal" required
                                       inputProps={{min: 0 , max: 100}}
                            />
                            <div className={styles.confirm}>
                                <Button  id="event-submit" variant="contained">Confirm</Button>
                            </div>

                        </form>

                    </Container>:
                    <div>Loading...</div>
            }
        </>
    )

}

