import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import api from '../../api/api'
import { toast } from 'sonner'

function LoginForm() {
    const navigate = useNavigate()

    const [isLoading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))

        // User dobara type kare to us field ka error remove ho jaye
        setErrors(prev => ({
            ...prev,
            [name]: "",
            submit: "",
        }))
    }

    const validateForm = () => {
        const newErrors = {}

        // Email
        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = "Please enter a valid email"
        }

        // Password
        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters"
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // API call se pehle validation
        if (!validateForm()) return

        setLoading(true)

        try {
            const res = await api.post("/users/login", formData)

            if (res.data.success) {
                navigate("/dashboard")
                toast.success("Login Successful")
            }
        } catch (err) {
            console.log("Error: ", err)
            toast.error(err.response?.data?.message || "Login failed. Please try again.")

            const message =
                err.response?.data?.message ||
                "Unable to log in. Please try again."

            setErrors({
                submit: message
            })
        } finally {
            setLoading(false)
        }
    }

    const inputClasses = (hasError) =>
        `w-full border rounded-xl px-3.5 py-2.5 text-[14.5px] font-poppins text-heading placeholder:text-muted outline-none transition-colors focus:border-purple-dark focus:ring-2 focus:ring-purple-light/60 ${
            hasError ? "border-red-400" : "border-border"
        }`

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-120 w-full flex flex-col justify-center items-center gap-4 px-6 py-4 font-poppins"
        >
            {/* Email */}
            <div className="w-full max-w-100 flex flex-col justify-center items-start gap-1.5">
                <label
                    htmlFor="email"
                    className="text-[13.5px] font-medium text-text after:content-['*'] after:text-red-500 after:ml-0.5"
                >
                    Email
                </label>

                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    autoComplete="email"
                    onChange={handleChange}
                    className={inputClasses(errors.email)}
                />

                {errors.email && (
                    <p className="text-[12.5px] text-red-600">
                        {errors.email}
                    </p>
                )}
            </div>

            {/* Password */}
            <div className="w-full max-w-100 flex flex-col justify-center items-start gap-1.5">
                <label
                    htmlFor="password"
                    className="text-[13.5px] font-medium text-text after:content-['*'] after:text-red-500 after:ml-0.5"
                >
                    Password
                </label>

                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    className={inputClasses(errors.password)}
                />

                {errors.password && (
                    <p className="text-[12.5px] text-red-600">
                        {errors.password}
                    </p>
                )}
            </div>

            {/* Backend error */}
            {errors.submit && (
                <p className="text-[13.5px] text-red-600 text-center">
                    {errors.submit}
                </p>
            )}

            <p className="text-[14.5px] text-center text-text">
                Don't have an account?{" "}
                <NavLink
                    to="/signup"
                    className="text-purple-dark font-medium hover:text-purple-deep transition-colors"
                >
                    Sign Up
                </NavLink>
            </p>

            <button
                type="submit"
                disabled={isLoading}
                className="flex justify-center items-center bg-purple-dark hover:bg-purple-deep rounded-xl w-full py-3 text-[15px] font-medium text-white shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-70"
            >
                {isLoading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                    "Log In"
                )}
            </button>
        </form>
    )
}

export default LoginForm