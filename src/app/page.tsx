'use client'

import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Header from './components/Header'
import ProgressBar from './components/ProgressBar'
import { motion } from 'framer-motion'
import useImagesLoader from './hooks/useImagesLoader'

const imagesH = [
  '/images/h/RaulBenua_geographiesofwater_ph1.jpg',
  '/images/h/RaulBenua_geographiesofwater_ph2.jpg',
  '/images/h/RaulBenua_geographiesofwater_ph3.jpg',
  '/images/h/RaulBenua_geographiesofwater_ph4.jpg',
  '/images/h/RaulBenua_geographiesofwater_ph5.jpg',
  '/images/h/RaulBenua_geographiesofwater_ph6.jpg',
  '/images/h/RaulBenua_geographiesofwater_ph7.jpg',
]

const imagesV = [
  '/images/v/RaulBenua_geographiesofwater_pv1.jpg',
  '/images/v/RaulBenua_geographiesofwater_pv2.jpg',
  '/images/v/RaulBenua_geographiesofwater_pv3.jpg',
  '/images/v/RaulBenua_geographiesofwater_pv4.jpg',
  '/images/v/RaulBenua_geographiesofwater_pv5.jpg',
  '/images/v/RaulBenua_geographiesofwater_pv6.jpg',
  '/images/v/RaulBenua_geographiesofwater_pv7.jpg',
]

export default function Home() {
  const { loadedImages, loadingProgress } = useImagesLoader([...imagesH, ...imagesV])

  if (!loadedImages) {
    return <ProgressBar loadingProgress={loadingProgress} />
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: 'easeInOut' }}>
      <Header />
      <Gallery imagesH={imagesH} imagesV={imagesV} />
      <Footer />
    </motion.div>
  )
}
