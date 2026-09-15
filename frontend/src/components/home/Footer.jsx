import { Link } from 'react-router-dom'
import { PencilSparkles } from 'lucide-react'

function Footer() {
    return (
        <footer className="border-t border-border">
            <div className="max-w-7xl mx-auto px-4 tablet:px-8 py-10 flex flex-col mobile:flex-row items-start mobile:items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-purple-light flex items-center justify-center text-purple-dark">
                        <PencilSparkles size={15} />
                    </span>
                    <div>
                        <p className="font-poppins font-semibold text-[14.5px] text-heading leading-none">TidyNote</p>
                        <p className="text-[12.5px] text-muted font-poppins mt-1">A tidy space for your thoughts.</p>
                    </div>
                </div>

                <nav className="flex items-center gap-6">
                    <Link to="/" className="text-[13.5px] text-text hover:text-purple-dark font-poppins transition-colors">
                        Home
                    </Link>
                    <Link to="/login" className="text-[13.5px] text-text hover:text-purple-dark font-poppins transition-colors">
                        Log in
                    </Link>
                    <Link to="/signup" className="text-[13.5px] text-text hover:text-purple-dark font-poppins transition-colors">
                        Sign up
                    </Link>
                </nav>
            </div>
            <div className="max-w-7xl mx-auto px-4 tablet:px-8 pb-8">
                <p className="text-[12px] text-muted font-poppins">
                    © {new Date().getFullYear()} TidyNote. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer