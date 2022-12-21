import styles from '../styles/Home.module.css'
import Header from "../components/Header";
import Carousel from "../components/Carousel";
export default function Home() {
    const slides = [
        {url: '/slide1.png', title: 'Slide 1'},
        {url: '/slide2.png', title: 'Slide 2'},
        {url: '/slide3.png', title: 'Slide 3'},
    ]
  return (
    <>
        <Header/>
        <div className={styles.carouselContainerStyle}>
            <Carousel slides={slides}/>
        </div>
        Index
    </>

  )
}