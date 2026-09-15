import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, PencilSparkles } from 'lucide-react'
import LoginForm from '../components/auth/LoginForm'

function LoginPage() {
    return (
        <div className="min-h-screen w-full flex flex-col bg-[radial-gradient(circle_at_top,#f5eefc_0%,#fdfbff_28%,#ffffff_60%)] px-4 py-6 tablet:py-8">
            <div className="flex-1 flex items-center justify-center">
                <div className="max-w-5xl w-full mx-auto flex flex-col items-stretch tablet:flex-row justify-center rounded-3xl overflow-hidden bg-linear-to-br from-purple-light via-pink-light to-blue-light">
                    <div className="max-w-xl w-full flex justify-center items-center">
                        <div className="w-full flex flex-col justify-center items-start md:gap-4 p-8 ml-3">
                            <span className="inline-flex items-center gap-1.5 bg-white/70 text-purple-dark text-[13px] font-medium font-poppins pl-2.5 pr-3 py-1.5 rounded-full mb-1">
                                <Sparkles size={14} />
                                Welcome back
                            </span>

                            <h1 className="text-[2rem] sm:text-[2.4rem] md:text-[3.2rem] text-heading font-playfair font-semibold leading-12 flex flex-col justify-center items-start mobile:flex-row mobile:gap-2 md:gap-0 tablet:flex-col tablet:leading-16">
                                <span>Continue</span>
                                <span>Your Journey</span>
                            </h1>

                            <p className="text-[16px] text-text font-poppins max-w-[90%] w-full mt-1.5 leading-relaxed">
                                Sign in to pick up where you left off and keep exploring.
                            </p>
                        </div>
                    </div>

                    <div className="max-w-xl w-full flex flex-col justify-center items-center gap-1.5 bg-white py-12 m-4 rounded-2xl overflow-hidden border border-border shadow-[0_20px_50px_-20px_rgba(24,24,27,0.18)]">
                        <h2 className="text-[2rem] font-playfair font-semibold text-center text-heading">Log In</h2>
                        <p className="text-[15px] text-center text-description font-poppins mb-2">
                            Sign in and pick up where you left off.
                        </p>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage