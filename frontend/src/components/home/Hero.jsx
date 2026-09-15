import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, Star, Search, CircleCheckBig, Circle } from 'lucide-react'

function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 tablet:px-8 pt-14 pb-20 laptop:pt-20 laptop:pb-28 grid grid-cols-1 laptop:grid-cols-[1.05fr_1fr] gap-14 laptop:gap-10 items-center">
                {/* Copy */}
                <div className="flex flex-col items-start tn-fade-up">
                    <span className="inline-flex items-center gap-1.5 bg-purple-light text-purple-dark text-[13px] font-medium font-poppins pl-2.5 pr-3 py-1.5 rounded-full mb-6">
                        <Sparkles size={14} />
                        A simpler way to organize your thoughts
                    </span>

                    <h1 className="font-playfair font-semibold text-[2.4rem] mobile:text-[2.75rem] laptop:text-[3.4rem] leading-[1.1] text-heading max-w-xl">
                        Give your thoughts a tidy home.
                    </h1>

                    <p className="mt-5 text-[16px] laptop:text-[17px] text-description font-poppins max-w-md leading-relaxed">
                        Capture ideas the moment they hit, organize them your way, star what
                        matters, and turn plans into todos — all in one calm workspace.
                    </p>

                    <div className="flex flex-col mobile:flex-row items-stretch mobile:items-center gap-3 mt-8 w-full mobile:w-auto">
                        <Link
                            to="/signup"
                            className="inline-flex items-center justify-center gap-2 bg-purple-dark hover:bg-purple-deep text-white font-poppins font-medium text-[15px] px-6 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                        >
                            Get started
                            <ArrowRight size={17} />
                        </Link>
                        <Link
                            to="/login"
                            className="inline-flex items-center justify-center gap-2 border border-border text-text hover:bg-black/[0.03] font-poppins font-medium text-[15px] px-6 py-3.5 rounded-xl transition-colors"
                        >
                            Log in
                        </Link>
                    </div>

                    <p className="text-[13px] text-muted font-poppins mt-5">
                        Free to use. No credit card needed.
                    </p>
                </div>

                {/* Product preview mockup */}
                <div className="relative w-full max-w-[460px] mx-auto laptop:mx-0 laptop:justify-self-end">
                    <div
                        className="absolute -top-10 -right-6 w-44 h-44 rounded-full bg-blue-light/70 blur-3xl tn-glow-drift"
                        aria-hidden="true"
                    />
                    <div
                        className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-pink-light/70 blur-3xl tn-glow-drift"
                        style={{ animationDelay: '2s' }}
                        aria-hidden="true"
                    />

                    <div className="relative bg-white rounded-3xl border border-border shadow-[0_20px_50px_-15px_rgba(109,47,176,0.25)] p-4 tn-fade-up" style={{ animationDelay: '0.15s' }}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-1.5 bg-[#f4f4f5] rounded-full px-3 py-1.5 text-muted flex-1 max-w-[65%]">
                                <Search size={13} />
                                <span className="text-[12px] font-poppins">Search notes</span>
                            </div>
                            <div className="w-7 h-7 rounded-full bg-purple-light shrink-0" />
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                            <div className="bg-purple-light rounded-2xl p-3 flex flex-col gap-1.5">
                                <p className="text-[12.5px] font-medium text-heading font-poppins">Morning pages</p>
                                <p className="text-[11px] text-text/70 font-poppins leading-snug">A few lines before the day starts.</p>
                                <span className="text-[10px] text-purple-dark/70 font-poppins mt-1">Sep 10</span>
                            </div>

                            <div className="bg-pink-light rounded-2xl p-3 flex flex-col gap-1.5 relative">
                                <Star size={13} className="absolute top-3 right-3 fill-pink-dark text-pink-dark" />
                                <p className="text-[12.5px] font-medium text-heading font-poppins pr-4">Book list</p>
                                <p className="text-[11px] text-text/70 font-poppins leading-snug">Non-fiction to get through this year.</p>
                                <span className="text-[10px] text-pink-dark/70 font-poppins mt-1">Sep 8</span>
                            </div>

                            <div className="bg-blue-light rounded-2xl p-3 flex flex-col gap-1.5 col-span-2">
                                <p className="text-[12.5px] font-medium text-heading font-poppins mb-0.5">Trip packing</p>
                                <div className="flex items-center gap-1.5">
                                    <CircleCheckBig size={13} className="text-blue-dark" />
                                    <span className="text-[11px] text-text/80 font-poppins">Passport & tickets</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Circle size={13} className="text-blue-dark/50" />
                                    <span className="text-[11px] text-text/80 font-poppins">Book a taxi</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden mobile:flex absolute -top-5 -right-5 items-center gap-2 bg-white rounded-xl shadow-lg border border-border px-3 py-2 tn-float">
                        <Star size={14} className="fill-pink-dark text-pink-dark" />
                        <span className="text-[11.5px] font-poppins font-medium text-heading whitespace-nowrap">Added to favourites</span>
                    </div>

                    <div className="hidden mobile:flex absolute -bottom-5 -left-6 items-center gap-2 bg-white rounded-xl shadow-lg border border-border px-3 py-2 tn-float-slow">
                        <CircleCheckBig size={14} className="text-blue-dark" />
                        <span className="text-[11.5px] font-poppins font-medium text-heading whitespace-nowrap">Todo completed</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero