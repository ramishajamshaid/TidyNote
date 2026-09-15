import React from 'react'
import { NavLink } from 'react-router-dom'

function BottomNav({to,icon: Icon, label, isSidebarOpen, count}) {
    return (
        <NavLink to={to} end={to === ""} className={({ isActive }) => `flex items-center justify-between px-2 py-2 rounded-lg text-[14px] font-medium border border-transparent transition-colors ${isActive ? "text-purple-dark bg-white shadow-2xl border-neutral-200" : "text-text hover:text-charcoal hover:bg-black/3"}`}>
            <div className="flex flex-col justify-center items-center gap-1">
                <Icon className="w-4 h-4 mobile:w-4.5 mobile:h-4.5"/>
                <span className="text-[0.68rem] mobile:text-[0.75rem] whitespace-nowrap overflow-hidden transition-all duration-300 max-w-24 ">{label}</span>
            </div>
        </NavLink>
    )
}

export default BottomNav
