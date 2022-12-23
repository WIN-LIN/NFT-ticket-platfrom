import Modal from '@mui/material/Modal';
import {useState} from "react";
import { Button, Box, Typography, MenuItem, Select, InputLabel } from "@mui/material";
import axios from "axios";
import { LoadingButton } from '@mui/lab';
import { useAccount, useSigner } from "wagmi";
import { ethers } from "ethers";
import { marketABI } from "../constants";

export default function BuyModal(prop) {
    const [open, setOpen] = useState(false);
    const [ ticket, setTicket ] = useState([]);
    const { address, isConnected } = useAccount();
    const [ itemIndex, setItemIndex ] = useState(null);
    const [ buyLoading, setBuyLoading ] = useState(false);
    const { data: signer, isError, isLoading } = useSigner();
    const marketContract = new ethers.Contract('0xd592c9B9B594991051b738210A364471d0da3f57', marketABI, signer);

    const handleOpen = async () => {
        if (isConnected) {
            setOpen(true);
            await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/ticket?eventId=${prop.eventId}`)
                .then((res) => {
                    setTicket(res.data['data']);
                })
        } else {
            alert('Please connect your wallet first');
        }
    }
    const handleClose = () => setOpen(false);
    const handleBuyItem = (e) => setItemIndex(e.target.value);

    async function buyTicket() {
        try {
            if (itemIndex != null) {
                setBuyLoading(true);
                // Contract
                const price = ethers.utils.parseUnits(JSON.stringify(ticket[itemIndex].selling_price), 'ether');
                const tx = await marketContract.buyTicket(ticket[itemIndex].token_id, {value: price});
                await tx.wait();
                // Backend
                const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/buyTicket`, {
                    eventId: prop.eventId,
                    ticketId: ticket[itemIndex].token_id,
                })
                if (result.status === 200) {
                    alert('Buy ticket success');
                    setBuyLoading(false);
                    setItemIndex(null);
                    handleClose();
                } else {
                    alert('Buy ticket failed');
                    setBuyLoading(false);
                }
            } else {
                alert('Please select a ticket');
            }

        } catch (e) {
            alert(e);
            setBuyLoading(false);
        }

    }

    return(
        <>
            <Button onClick={handleOpen} variant="contained" sx={{fontSize:'12px'}}>Buy Ticket</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <Typography variant="h6" sx={{textAlign:"center", fontStyle:"bold",borderBottom: '#F0F0F0 solid 1px' }} >{prop.name}</Typography>
                    <Typography variant="body2" sx={{marginTop:5}}>
                        Please select the ticket:
                    </Typography>
                    <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
                        <Select
                            labelId="select-label"
                            id="select"
                            value={itemIndex}
                            onChange={handleBuyItem}
                            sx={{width: '100%', height:'40px', margin:'10px'}}
                        >
                            {
                                ticket.map((item, index) => {
                                    return(
                                        <MenuItem sx={{textAlign:'center'}} value={index} key={index}>Ticket ID: {item.token_id}, Price: {item.selling_price} ETH</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        <LoadingButton sx={txButtonStyle} onClick={buyTicket} loading={buyLoading}>Buy Ticket</LoadingButton>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

const boxStyle = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '#F0F0F0 solid 1px',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};

const txButtonStyle = {
    background:'#62BDFF',
    color:'#FFFFFF',
    marginLeft: '10px',
    ':hover':{color: 'black',background: '#429FFC'}
}