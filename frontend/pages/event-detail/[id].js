import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Container, Typography, Box, Grid, Alert } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';
import BuyModal from "../../components/BuyModel";
import TicketModal from "../../components/TicketModel";
import InsertLinkIcon from '@mui/icons-material/InsertLink';

export default function Id() {
    const router = useRouter();
    const [data, setData] = useState({});
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/event/ID?id=${id}`).then((res) => {
                console.log('res', res.data);
                setData(res.data['data'][0]);
            });
        }
    }, [id]);
    console.log('data', data);

    const startTime = new Date(parseInt(data['start_time']) * 1000);
    const endTime = new Date(parseInt(data['end_time']) * 1000);
    const refundTime = new Date(parseInt(data['refund_time']) * 1000);

    // style
    const containerStyle = {
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'column',
    }
    const contentStyle = {
        borderRadius: '0 0 10px 10px',
        boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1)',
        padding:5,
        background: 'white',
        marginBottom: '30px',
    }
    const placeTimeStyle = {
        display: 'flex',
        flexDirection:'column',
        boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        padding: '10px',
        margin: '20px 0 60px 0',
    }
    const sectionStyle = {
        margin: '20px 10px',
    }

    return (
        <>
            <Header/>
            {
                data &&
                    <Container maxWidth="md" fixed={true} disableGutters={true} sx={containerStyle}>
                        <img src={`/events/${data['cover_img']}`} style={{borderRadius: '10px 10px 0 0'}}/>
                        <Box sx={contentStyle}>
                            <Grid container >
                                <Grid item xs={6} md={8}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }} >{data['name']}</Typography>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <BuyModal/>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <TicketModal/>
                                </Grid>
                            </Grid>

                            <Box sx={placeTimeStyle}>
                                <Typography variant="overline" color="text.secondary">
                                    <AccessTimeIcon sx={{paddingTop:'10px'}}/>
                                    {startTime.getFullYear()}/{startTime.getMonth()+1}/{startTime.getDate()}-{endTime.getFullYear()}/{endTime.getMonth()+1}/{endTime.getDate()}
                                </Typography>
                                <Typography variant="overline" >
                                    <PlaceIcon sx={{paddingTop:'10px'}}/>
                                    {data['place']}
                                </Typography>
                                <div>
                                    <InsertLinkIcon sx={{paddingTop:'10px'}}/>
                                    <Typography variant="overline" sx={{":hover":{color:'#114DE0'}, display:'inline'}}>
                                        <a href={`https://goerli.etherscan.io/address/${data['ticket_address']}`}>Ticket Contract</a>
                                    </Typography>
                                    <Typography variant="overline" sx={{":hover":{color:'#114DE0'}, display:'inline', marginLeft:'10px'}}>
                                        <a href={`https://goerli.etherscan.io/address/${data['market_address']}`}>Market Contract</a>
                                    </Typography>
                                </div>
                            </Box>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }} >Information</Typography>
                                <div style={{margin:5}} dangerouslySetInnerHTML={{ __html: data['information']}}></div>
                            </Box>
                            <Box>
                                <Alert severity="warning" sx={{marginTop: '10px'}}>
                                    <Typography variant="body2" >
                                        You may get {data['refund_rate']}% of the ticket base price refund before
                                        <strong> {refundTime.getFullYear()}/{refundTime.getMonth()}/{refundTime.getDate()}</strong>
                                        .
                                    </Typography>
                                </Alert>
                            </Box>
                        </Box>
                    </Container>
            }
        </>
    );
}