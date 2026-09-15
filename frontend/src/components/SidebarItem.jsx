import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function SidebarItem({to,icon: Icon, label, isSidebarOpen, count, from}) {
    const location = useLocation()
    const isDetailPage = location.pathname.includes('/dashboard/detail-page')
    
    return (
        <NavLink to={to} end={to === ""} className={({ isActive }) => `flex items-center justify-between px-1.5 py-2 rounded-lg text-[14px] font-medium border border-transparent transition-colors ${isActive || (isDetailPage && location.state?.from === from) ? "text-purple-dark bg-white shadow-2xl border-neutral-200" : "text-text hover:text-charcoal hover:bg-black/3"}`}>
            <div className="flex items-center gap-3">
                <Icon size={18}/>
                {isSidebarOpen && (<span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? "max-w-24 opacity-100" : "max-w-0 opacity-0" }`}>{label}</span>)}
            </div>
            {isSidebarOpen && count !=="" && (<span className="text-xs text-muted font-normal px-1.5 py-0.5 bg-surface rounded-md border border-border">{count}</span>)}
        </NavLink>
    )
}

export default SidebarItem
