import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PencilSparkles, Menu, X } from 'lucide-react'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navLinks = [
        { label: 'Features', href: '#features' },
        { label: 'How it works', href: '#how-it-works' },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 tablet:px-8 py-3.5">
                <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setIsMenuOpen(false)}>
                    <span className="w-8 h-8 rounded-lg bg-purple-light flex items-center justify-center text-purple-dark">
                        <PencilSparkles size={18} />
                    </span>
                    <span className="font-poppins font-semibold text-[18px] text-heading tracking-tight">
                        TidyNote
                    </span>
                </Link>

                <nav className="hidden tablet:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-[14.5px] text-text hover:text-purple-dark transition-colors font-poppins"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden tablet:flex items-center gap-3">
                    <Link
                        to="/login"
                        className="text-[14.5px] font-medium text-text hover:text-purple-dark transition-colors font-poppins px-3 py-2"
                    >
                        Log in
                    </Link>
                    <Link
                        to="/signup"
                        className="text-[14.5px] font-medium text-white bg-purple-dark hover:bg-purple-deep transition-colors font-poppins px-4 py-2.5 rounded-xl shadow-sm hover:shadow active:scale-[0.98]"
                    >
                        Get started
                    </Link>
                </div>

                <button
                    className="tablet:hidden text-text p-1.5 rounded-md hover:bg-black/5 transition-colors"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="tablet:hidden border-t border-border bg-white px-4 py-4 flex flex-col gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-[15px] text-text hover:text-purple-dark transition-colors font-poppins py-2.5 px-2 rounded-lg hover:bg-purple-light/40"
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-border">
                        <Link
                            to="/login"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-[15px] font-medium text-text text-center font-poppins py-2.5 rounded-xl border border-border"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/signup"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-[15px] font-medium text-white text-center bg-purple-dark font-poppins py-2.5 rounded-xl"
                        >
                            Get started
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Navbar