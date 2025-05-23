import Image from "../components/home/image"
import FeaturedCollection from "../components/home/feature"
import Selling from "../components/home/selling"
import Category from "../components/home/category"
import FeaturesSection from "../components/home/method"
import Video from "../components/home/video"
import InstagramGallery from "../components/home/moreinformation"

const Home = () => {
  return (
    <div className="bg-amber-50">
      <Image />
      <FeaturedCollection />
      <Selling />
      <Category />
      <FeaturesSection />
      <Video />
      <InstagramGallery />
    </div>
  )
}

export default Home
