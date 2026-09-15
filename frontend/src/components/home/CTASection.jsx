import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function CTASection() {
    return (
        <section className="max-w-7xl mx-auto px-4 tablet:px-8 pb-16 laptop:pb-24">
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#f3e8ff] via-[#fdf2f8] to-[#ddeef9] px-6 py-14 laptop:px-16 laptop:py-20 text-center">
                <h2 className="font-playfair font-semibold text-[1.9rem] laptop:text-[2.4rem] text-heading leading-tight max-w-xl mx-auto">
                    Ready to clear the clutter?
                </h2>
                <p className="text-[15.5px] text-text/80 font-poppins mt-3 max-w-md mx-auto leading-relaxed">
                    Create your TidyNote workspace and keep your thoughts organized,
                    starting today.
                </p>

                <div className="flex flex-col mobile:flex-row items-center justify-center gap-3 mt-8">
                    <Link
                        to="/signup"
                        className="inline-flex items-center justify-center gap-2 bg-purple-dark hover:bg-purple-deep text-white font-poppins font-medium text-[15px] px-6 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] w-full mobile:w-auto"
                    >
                        Create your free account
                        <ArrowRight size={17} />
                    </Link>
                    <Link
                        to="/login"
                        className="text-[14.5px] font-medium text-text hover:text-purple-dark font-poppins transition-colors px-4 py-3.5"
                    >
                        Already have an account? Log in
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default CTASection