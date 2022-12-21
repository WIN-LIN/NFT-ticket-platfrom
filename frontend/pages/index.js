import styles from '../styles/Home.module.css'
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import { Container, Box } from "@mui/material";
export default function Home() {
    const slides = [
        {url: '/slide1.png', title: 'Slide 1'},
        {url: '/slide2.png', title: 'Slide 2'},
        {url: '/slide3.png', title: 'Slide 3'},
    ]
  return (
    <>
        <Header/>
        <Container maxWidth="md" fixed={true} disableGutters={true} sx={{background:'#E5F2FF', marginTop:'10px'}}>
            <Box className={styles.carouselContainerStyle}>
                <Carousel slides={slides}/>
            </Box>
            <Box>Index</Box>
        </Container>

    </>

  )
}