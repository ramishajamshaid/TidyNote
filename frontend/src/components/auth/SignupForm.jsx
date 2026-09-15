import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import api from '../../api/api'
import { PenLine, User } from 'lucide-react'

function SignupForm() {
    const navigate = useNavigate()

    const [isLoading, setLoading] = useState(false)
    const [preview, setPreview] = useState("")
    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        username: "",
        password: "",
        avatar: null,
    })

    const handleChange = (e) => {
        const { name, value, type, files } = e.target

        if (type === "file") {
            const file = files[0]

            if (file) {
                setFormData(prev => ({
                    ...prev,
                    avatar: file
                }))

                setPreview(URL.createObjectURL(file))
            }

            return
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Field type karte waqt uska error hata do
        setErrors(prev => ({
            ...prev,
            [name]: ""
        }))
    }

    const validateForm = () => {
        const newErrors = {}

        // Full Name
        if (!formData.fullname.trim()) {
            newErrors.fullname = "Full name is required"
        } else if (formData.fullname.trim().length < 3) {
            newErrors.fullname = "Full name must be at least 3 characters"
        }

        // Username
        if (!formData.username.trim()) {
            newErrors.username = "Username is required"
        } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
            newErrors.username =
                "Username must be 3-20 characters and contain only letters, numbers or _"
        }

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
        } else if (!/[A-Z]/.test(formData.password)) {
            newErrors.password =
                "Password must contain at least one uppercase letter"
        } else if (!/[a-z]/.test(formData.password)) {
            newErrors.password =
                "Password must contain at least one lowercase letter"
        } else if (!/[0-9]/.test(formData.password)) {
            newErrors.password =
                "Password must contain at least one number"
        }

        // Avatar
        if (formData.avatar) {
            if (!formData.avatar.type.startsWith("image/")) {
                newErrors.avatar = "Please select a valid image"
            } else if (formData.avatar.size > 2 * 1024 * 1024) {
                newErrors.avatar = "Image size must be less than 2MB"
            }
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Pehle validation
        if (!validateForm()) return

        setLoading(true)

        const data = new FormData()

        Object.entries(formData).forEach(([key, val]) => {
            if (val !== null) {
                data.append(key, val)
            }
        })

        try {
            const res = await api.post("/users/register", data)

            if (res.data.success) {
                navigate("/login")
            }
        } catch (err) {
            console.log("Error: ", err)
            console.log("Error REsponse: ", err.response?.data)

            // Backend se error aaye to show kar sakti ho
            const message =
                err.response?.data?.message || "Something went wrong"

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
            className="max-w-120 w-full flex flex-col justify-center items-center gap-4 px-6 font-poppins"
        >
            {/* Avatar */}
            <div className="w-full max-w-100 flex flex-col justify-center items-center gap-1.5">
                <input
                    type="file"
                    accept="image/*"
                    name="avatar"
                    id="avatar"
                    onChange={handleChange}
                    className="hidden"
                />

                <div className="relative z-10 w-28 h-28 rounded-full bg-linear-to-b from-blue-light via-white to-purple-light flex items-center justify-center text-purple-dark/60">
                    <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User size={30} strokeWidth={1.75} />
                        )}
                    </div>

                    <label
                        htmlFor="avatar"
                        className="absolute bottom-1 right-2 z-20 text-purple-dark cursor-pointer bg-purple-light border border-white rounded-full p-1.5 shadow-sm"
                    >
                        <PenLine size={13} />
                    </label>
                </div>

                {errors.avatar && (
                    <p className="text-[12.5px] text-red-600">
                        {errors.avatar}
                    </p>
                )}
            </div>

            {/* Full Name */}
            <div className="w-full max-w-100 flex flex-col items-start gap-1.5">
                <label
                    htmlFor="fullname"
                    className="text-[13.5px] font-medium text-text after:content-['*'] after:text-red-500 after:ml-0.5"
                >
                    Full Name
                </label>

                <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={formData.fullname}
                    autoComplete="name"
                    onChange={handleChange}
                    className={inputClasses(errors.fullname)}
                />

                {errors.fullname && (
                    <p className="text-[12.5px] text-red-600">
                        {errors.fullname}
                    </p>
                )}
            </div>

            {/* Username */}
            <div className="w-full max-w-100 flex flex-col items-start gap-1.5">
                <label
                    htmlFor="username"
                    className="text-[13.5px] font-medium text-text after:content-['*'] after:text-red-500 after:ml-0.5"
                >
                    Username
                </label>

                <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    autoComplete="username"
                    onChange={handleChange}
                    className={inputClasses(errors.username)}
                />

                {errors.username && (
                    <p className="text-[12.5px] text-red-600">
                        {errors.username}
                    </p>
                )}
            </div>

            {/* Email */}
            <div className="w-full max-w-100 flex flex-col items-start gap-1.5">
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
            <div className="w-full max-w-100 flex flex-col items-start gap-1.5">
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
                    autoComplete="new-password"
                    onChange={handleChange}
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
                Already a member?{" "}
                <NavLink
                    to="/login"
                    className="text-purple-dark font-medium hover:text-purple-deep transition-colors"
                >
                    Log In
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
                    "Sign Up"
                )}
            </button>
        </form>
    )
}

export default SignupForm