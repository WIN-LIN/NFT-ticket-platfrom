import Modal from '@mui/material/Modal';
import {useEffect, useState} from "react";
import {Button, Typography, Box, cardHeaderClasses} from "@mui/material";
import { ticketABI, marketByteCode, marketABI } from "../constants";
import { ethers } from "ethers";
import { useSigner } from "wagmi";
import { LoadingButton } from '@mui/lab';

export default function ContractModal(prop) {
    const [open, setOpen] = useState(false);
    const [ ticketIssued, setTicketIssued ] = useState('');
    const { data: signer, isError, isLoading } = useSigner();
    const ticketContract = new ethers.Contract(prop.props.ticket_address, ticketABI, signer);
    const marketContract = new ethers.Contract(prop.props.market_address, marketABI, signer);
    const [ numOfTicket, setNumOfTicket ] = useState(0);
    const [ price, setPrice ] = useState(0);
    const [ fromID, setFromID ] = useState(0);
    const [ toID, setToID ] = useState(0);
    const [approveMarket, setApproveMarket] = useState(false);
    const [mintLoading, setMintLoading] = useState(false);
    const [approveLoading, setApproveLoading] = useState(false);
    const [sellLoading, setSellLoading] = useState(false);

    const handleOpen = async () => {
        setOpen(true);
        const number = await ticketContract.ticketCounts();
        const approve = await ticketContract.isApprovedForAll(prop.props.host, prop.props.market_address );
        setTicketIssued(number.toString());
        setApproveMarket(approve);
    }
    const handleClose = () => setOpen(false);

    function handleTicketIssue(e) {
        setNumOfTicket(parseInt(e.target.value) || 0);
    }
    function increNumOfTicket() {
        setNumOfTicket(numOfTicket + 1);
    }
    function decreNumOfTicket() {
        if (numOfTicket > 0) {
            setNumOfTicket(numOfTicket - 1);
        }
    }

    async function setApprove() {
        setApproveLoading(true);
        const tx = await ticketContract.setApprovalForAll(prop.props.market_address, true);
        await tx.wait();
        setApproveMarket(true);
        setApproveLoading(false);
    }

    async function issueTicket() {
        try{
            if (numOfTicket > 0) {
                setMintLoading(true);
                const tx = await ticketContract.bulkMintTickets(numOfTicket);
                await tx.wait();
                let total = parseInt(ticketIssued) + parseInt(numOfTicket);
                setTicketIssued(total.toString());
                setNumOfTicket(0);
                alert('Ticket Issued');
                setMintLoading(false);
            }
            else {
                alert('Please enter a number greater than 0');
            }
        } catch (e) {
            setMintLoading(false);
            console.log(e);
        }
    }

    function handlePrice(e) {
        setPrice(parseInt(e.target.value) || 0);
    }
    function handleFromID(e) {
        setFromID(parseInt(e.target.value) || 0);
    }
    function handleToID(e) {
        setToID(parseInt(e.target.value) || 0);
    }

    async function sellTickets(){
        try{
            if (price > 0 && fromID > 0 && toID > 0) {
                setSellLoading(true);
                const tx = await marketContract.sellBulkTickets(fromID,toID, price);
                await tx.wait();
                setSellLoading(false);
                alert('Ticket Listed');
            }
            else {
                alert('Please enter a price greater than 0');
            }
        } catch (e) {
            setSellLoading(false);
            console.log(e);
        }
    }

    return (
        <div style={{
            marginTop: -10,
        }}>
            <Button onClick={handleOpen}>Setting</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={eventNameStyle}>
                            {prop.props.name}
                        </Typography>
                    {
                        approveMarket ? null:
                            <div>
                                <h3>Approve to Market Contract</h3>
                                <LoadingButton
                                    sx={approveButtonStyle} onClick={setApprove} loading={approveLoading}>Approve</LoadingButton>
                            </div>
                    }
                        <div>
                            <h3>Issue Ticket</h3>
                            <Button sx={numButtonStyle} onClick={decreNumOfTicket}>-</Button>
                            <input style={inputStyle} value={numOfTicket} onChange={handleTicketIssue}/>
                            <Button sx={numButtonStyle} onClick={increNumOfTicket}>+</Button>
                            <LoadingButton sx={txButtonStyle}
                                           onClick={issueTicket} loading={mintLoading}>Mint</LoadingButton>
                            {ticketIssued ? <span style={{padding:"10px"}}>(Already issued: {ticketIssued})</span> : null}
                        </div>
                        <div>
                        <h3>Sell Tickets (in Wei)</h3>
                            <span style={{padding:"5px"}}>From ID  </span>
                            <input style={inputStyle1} value={fromID} onChange={handleFromID} placeholder={'From ID'}/>
                            <span style={{padding:"5px"}}>To ID  </span>
                            <input style={inputStyle1} value={toID} onChange={handleToID} placeholder={'To ID '}/>
                            <span style={{padding:"5px"}}>sell at  </span>
                            <input style={inputStyle} value={price} onChange={handlePrice}/>
                        <LoadingButton sx={txButtonStyle}
                                       onClick={sellTickets} loading={sellLoading}>Sell</LoadingButton>
                        </div>
                </Box>
            </Modal>
        </div>
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

const eventNameStyle = {
    textAlign:'center',
    borderBottom: '#F0F0F0 solid 1px',
}

const inputStyle = {
    background: 'white',
    color: 'black',
    textAlign: 'center',
    border: '#ddd 1px solid',
    width: '5rem',
    height: '2rem'
}

const inputStyle1 = {
    background: 'white',
    color: 'black',
    textAlign: 'center',
    border: '#ddd 1px solid',
    width: '5rem',
    height: '2rem',
    marginRight: '0.5rem'
}


const numButtonStyle = {
    height: '2rem',
    border: '1px solid #ddd',
}

const approveButtonStyle = {
    background: '#62BDFF',
    color: '#FFFFFF',
    ':over': {color: 'black', background: '#429FFC'}
}

const txButtonStyle = {
    background:'#62BDFF',
    color:'#FFFFFF',
    marginLeft: '10px',
    ':hover':{color: 'black',background: '#429FFC'}
}