import {Grid, Popover, Typography} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { ethers } from "ethers";
import {useAccount, useSigner} from "wagmi";
import { ticketABI, marketABI } from "../constants";

export default function Ticket(prop) {
    const [ price, setPrice ] = useState(0);
    const [ toID, setToID ] = useState();
    const [ refundLoading, setRefundLoading ] = useState(false);
    const [ transferLoading, setTransferLoading ] = useState(false);
    const [ sellLoading, setSellLoading ] = useState(false);
    const refundTime = new Date(parseInt(prop.refundTime) * 1000);
    const { data: signer, isError, isLoading } = useSigner();
    const { address, isConnected } = useAccount();
    const marketContract = new ethers.Contract(prop.marketAddress, marketABI, signer);
    const ticketContract = new ethers.Contract(prop.ticketAddress, ticketABI, signer);

    // Popover
    const [refundAnchorEl, setRefundAnchorEl] = useState(null);
    const [transferAnchorEl, setTransferAnchorEl] = useState(null);
    const [sellAnchorEl, setSellAnchorEl] = useState(null);

    const handleRefundPopoverOpen = (event) => {
        setRefundAnchorEl(event.currentTarget);
    };
    const handleRefundPopoverClose = () => {
        setRefundAnchorEl(null);
    };
    const handleTransferPopoverOpen = (event) => {
        setTransferAnchorEl(event.currentTarget);
    }
    const handleTransferPopoverClose = () => {
        setTransferAnchorEl(null);
    }
    const handleSellPopoverOpen = (event) => {
        setSellAnchorEl(event.currentTarget);
    }
    const handleSellPopoverClose = () => {
        setSellAnchorEl(null);
    }
    const refundOpen = Boolean(refundAnchorEl);
    const transferOpen = Boolean(transferAnchorEl);
    const sellOpen = Boolean(sellAnchorEl);

    function handlePriceChange(e) {
        setPrice(e.target.value || 0);
    }

    function handleToIDChange(e) {
        setToID(e.target.value);
    }

    async function refundTicket() {
        try {
            if (isConnected) {
                setRefundLoading(true);
                const tx = await marketContract.refundTicket(prop.id);
                await tx.wait();
                setRefundLoading(false);

            } else {
                setRefundLoading(false);
                alert("Please connect your wallet first");
            }
        } catch (e) {
            setRefundLoading(false);
            console.log(e);
        }
    };

    async function transferTicket() {
        try {
            if (isConnected && toID) {
                setTransferLoading(true);
                const tx = await ticketContract.transferFrom(address, toID, prop.id);
                await tx.wait();
                setTransferLoading(false);
            } else {
                setTransferLoading(false);
                alert("Please connect your wallet first or enter the ID");
            }
        } catch (e) {
            setTransferLoading(false);
            console.log(e);
        }
    }

    async function sellTicket() {
        try {
            if (isConnected) {
                setSellLoading(true);
                const tx = await marketContract.sellTicket(prop.id, ethers.utils.parseEther(price.toString()));
                await tx.wait();
                setPrice(0);
                setSellLoading(false);
                alert("Ticket is now on sale");
            } else {
                setSellLoading(false);
                alert("Please connect your wallet first");
            }
        } catch (e) {
            setSellLoading(false);
            console.log(e);
        }
    }

    return (
        <Grid container sx={userTicketStyle}>
            <Grid item sx={ticketStyle} xs={12}>
                <Grid item xs={6} style={{display:"flex", alignItems:"center", padding:10, justifyContent:"center", flexDirection:"column", fontFamily:'Chivo Mono, monospace' }}>
                    <div style={{fontSize:'2rem'}}>Ticket ID</div>
                    { prop.id < 10 ? <div style={{fontSize:'5rem'}}>0{prop.id}</div> : <div style={{fontSize:'5rem'}}>{prop.id}</div> }
                </Grid>
                <Grid item xs={6} style={{display:"flex", flexDirection:"column", margin:'10px'}}>
                    <Grid container style={functionStyle}>
                        <Grid item xs={2}>
                            <InfoIcon
                                aria-owns={open ? 'refund-mouse-over-popover' : undefined}
                                aria-haspopup="true"
                                onMouseEnter={handleRefundPopoverOpen}
                                onMouseLeave={handleRefundPopoverClose}
                                sx={{color:'#C5C7CD'}}
                            />
                            <Popover
                                id="refund-mouse-over-popover"
                                sx={{
                                    pointerEvents: 'none',
                                }}
                                open={refundOpen}
                                anchorEl={refundAnchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                onClose={handleRefundPopoverClose}
                                disableRestoreFocus
                            >
                                <Typography sx={{ p: 1 }}>You can get {prop.refundRate}% refund before {refundTime.getFullYear()}/{refundTime.getMonth()}/{refundTime.getDate()}.</Typography>
                            </Popover>
                        </Grid>
                        <Grid item xs={10} sx={buttonContainer}>
                            <LoadingButton sx={txButtonStyle} style={{background:'#EA1C12', width:"100%"}} onClick={refundTicket} loading={refundLoading}>Refund</LoadingButton>
                        </Grid>
                    </Grid>
                    <Grid container style={functionStyle}>
                        <Grid item xs={2}>
                            <InfoIcon
                                aria-owns={open ? 'transfer-mouse-over-popover' : undefined}
                                aria-haspopup="true"
                                onMouseEnter={handleTransferPopoverOpen}
                                onMouseLeave={handleTransferPopoverClose}
                                sx={{color:'#C5C7CD'}}
                            />
                            <Popover
                                id="transfer-mouse-over-popover"
                                sx={{
                                    pointerEvents: 'none',
                                }}
                                open={transferOpen}
                                anchorEl={transferAnchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                onClose={handleTransferPopoverClose}
                                disableRestoreFocus
                            >
                                <Typography sx={{ p: 1 }}>You can transfer this ticket to others.</Typography>
                            </Popover>
                        </Grid>
                        <Grid item xs={10} sx={buttonContainer}>
                            <input
                                style={{textAlign:"center", width:"100px", border: '#ddd 1px solid'}} placeholder={"To address"}
                                value={toID} onChange={handleToIDChange}
                            />
                            <LoadingButton sx={txButtonStyle} style={{background:'#31B457', width:"100%"}} onClick={transferTicket} loading={transferLoading}>Transfer</LoadingButton>
                        </Grid>
                    </Grid>
                    <Grid container style={functionStyle}>
                        <Grid item xs={2}>
                            <InfoIcon
                                aria-owns={open ? 'sell-mouse-over-popover' : undefined}
                                aria-haspopup="true"
                                onMouseEnter={handleSellPopoverOpen}
                                onMouseLeave={handleSellPopoverClose}
                                sx={{color:'#C5C7CD'}}
                            />
                            <Popover
                                id="sell-mouse-over-popover"
                                sx={{
                                    pointerEvents: 'none',
                                }}
                                open={sellOpen}
                                anchorEl={sellAnchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                onClose={handleSellPopoverClose}
                                disableRestoreFocus
                            >
                                <Typography sx={{ p: 1 }}>You can set this ticket on sale, but the event host will take {prop.royaltyRate}% cut of this sale.</Typography>
                            </Popover>
                        </Grid>
                        <Grid item xs={10} sx={buttonContainer}>
                            <input
                                style={{textAlign:"center", width:"100px", border: '#ddd 1px solid'}} placeholder={"price in ETH"}
                                value={price} onChange={handlePriceChange}
                            />
                            <LoadingButton sx={txButtonStyle} style={{width:'100%'}} onClick={sellTicket} loading={sellLoading}>Sell</LoadingButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

const userTicketStyle = {
    display: 'flex',
    border: '#F0F0F0 solid 1px',
    height: '100%',
    background: 'aliceblue',
    margin: '10px',
}
const ticketStyle = {
    display: 'flex',
    flexDirection: 'row',
}
const functionStyle = {
    display:"flex",
    alignItems:"center",
    margin:"10px 0"
}
const buttonContainer = {
    display:"flex",
    justifyContent:"center",
}
const txButtonStyle = {
    background:'#62BDFF',
    color:'#FFFFFF',
    margin: '0',
    ':hover':{color: 'black',background: '#429FFC'}
}