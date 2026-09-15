import '../home.css'
import Navbar from '../components/home/Navbar.jsx'
import Hero from '../components/home/Hero.jsx'
import TrustStrip from '../components/home/Truststrip.jsx'
import Features from '../components/home/Features.jsx'
import ProductPreview from '../components/home/ProductPreview.jsx'
import ColorShowcase from '../components/home/ColorShowcase.jsx'
import CTASection from '../components/home/Ctasection.jsx'
import Footer from '../components/home/Footer.jsx'

function Home() {
    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-[radial-gradient(circle_at_top,#f5eefc_0%,#fdfbff_28%,#ffffff_60%)]">
            <Navbar />
            <Hero />
            <TrustStrip />
            <Features />
            <ProductPreview />
            <ColorShowcase />
            <CTASection />
            <Footer />
        </div>
    )
}

export default Home