import Modal from '@mui/material/Modal';
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useAccount, useSigner } from "wagmi";
import { ethers } from "ethers";
import { ticketABI } from "../constants";
import Ticket from "./Ticket";

export default function TicketModal(prop) {
    const [open, setOpen] = useState(false);
    const { address, isConnected } = useAccount();
    const { data: signer } = useSigner();
    const [ userTicket, setUserTicket ] = useState([]);
    const [ approveLoading, setApproveLoading ] = useState(false);
    const [ approveMarket, setApproveMarket ] = useState(false);
    const handleOpen = async () => {

        if (isConnected) {

            setOpen(true);
            const ticketContract = new ethers.Contract(prop.ticketAddress, ticketABI, signer);
            const approve = await ticketContract.isApprovedForAll(address, prop.marketAddress );
            setApproveMarket(approve);

            // Get NFT from ALCHEMY API
            const options = {
                method: 'GET',
                url: `${process.env.NEXT_PUBLIC_ALCEH_URL}/getNFTs`,
                params: {
                    owner: `${address}`,
                    'contractAddresses[]': `${prop.ticketAddress}`,
                    withMetadata: 'false'
                },
                headers: {accept: 'application/json'}
            };

            axios
                .request(options)
                .then(function (response) {
                    //setUserTicket(response.data);
                    console.log(response.data['ownedNfts']);
                    let temp = [];
                    response.data['ownedNfts'].forEach((item) => {
                        temp.push(parseInt(item['id']['tokenId'], 16));
                    });
                    setUserTicket(temp);
                })
                .catch(function (error) {
                    console.error(error);
                });

        } else {
            alert('Please connect your wallet first');
        }
    }
    const handleClose = () => setOpen(false);

    async function approveTicket() {
        try {
            setApproveLoading(true);
            const ticketContract = new ethers.Contract(prop.ticketAddress, ticketABI, signer);
            const tx = await ticketContract.setApprovalForAll(prop.marketAddress, true);
            await tx.wait();
            setApproveMarket(true);
            setApproveLoading(false);
        } catch (e) {
            console.log(e);
            setApproveLoading(false);
        }
    }

    return(
        <>
            <Button onClick={handleOpen} variant="outlined" sx={{fontSize:'12px'}}>Your Ticket</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <Typography variant="h6" sx={{textAlign:"center", fontStyle:"bold",borderBottom: '#F0F0F0 solid 1px' }} >{prop.name}</Typography>
                {
                    approveMarket ? null :
                        <div style={{display:"flex", flexDirection:'row', justifyContent:'center', alignItems:'center', margin:15 }}>
                            <LoadingButton variant="outlined" onClick={approveTicket} loading={approveLoading}>
                                Approve
                            </LoadingButton>
                            <Typography variant="body2" sx={{margin:'3px'}}>
                                (To operate your ticket, you need to approve the market first.)
                            </Typography>
                        </div>
                }
                    <Typography variant="body2" sx={{margin:'20px 0'}}>
                        Your tickets:
                    </Typography>
                    {
                        userTicket?.map((item) => {
                            return (
                                <Ticket key={item}
                                        id={item}
                                        marketAddress={prop.marketAddress}
                                        ticketAddress={prop.ticketAddress}
                                        refundRate={prop.refundRate}
                                        refundTime={prop.refundTime}
                                        royaltyRate={prop.royaltyRate}
                                />)
                        })
                    }
                </Box>
            </Modal>
        </>
    );
}

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '#F0F0F0 solid 1px',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};
