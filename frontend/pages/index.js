import styles from '../styles/Home.module.css'
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import { Container, Box, Grid } from "@mui/material";
import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
    const slides = [
        {url: '/slide1.png', title: 'Slide 1'},
        {url: '/slide2.png', title: 'Slide 2'},
        {url: '/slide3.png', title: 'Slide 3'},
    ]
    const [event, setEvent] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/event/all`).then((res) => {
            setEvent(res.data);
            console.log('res',res.data);
        });
    }, []);
  return (
    <>
        <Header/>
        {
            (event.length === 0) ? <p>Loading...</p> :
                <Container maxWidth="md" fixed={true} disableGutters={true} sx={{background:'#E5F2FF', marginTop:'10px'}}>
                    <Box className={styles.carouselContainerStyle}>
                        <Carousel slides={slides}/>
                    </Box>
                    <h2 style={{margin:'30px 0'}}>精選活動</h2>
                    <Grid container className={styles.itemContainerStyle}>
                        {
                            event['data'].map((item, index) => {
                                return (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <EventCard props={item}/>
                                    </Grid>
                                )
                            })
                        }

                        {/*Fake Data*/}
                        <Grid item xs={12} sm={6} md={4}>
                            <EventCard props={event['data'][0]}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <EventCard props={event['data'][0]}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <EventCard props={event['data'][0]}/>
                        </Grid>

                    </Grid>
                </Container>
        }
    </>

  )
}