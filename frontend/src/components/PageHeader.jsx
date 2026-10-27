import React from 'react'
import { Sparkles, FolderHeart, LayoutGrid, StretchHorizontal } from 'lucide-react'

function PageHeader({ title, description, setLayout, layout, showLayout }) {
    return (
        <div className='w-full flex flex-col justify-center items-start px-2 mobile:flex-row mobile:justify-between mobile:items-end gap-4 font-poppins py-3'>
            <div className="flex flex-col justify-center items-start gap-0.5">
                <Sparkles size={18} className="text-purple-dark" />
                <h4 className='text-[1.4rem] tablet:text-[1.5rem] font-medium text-heading'>{title}</h4>
                <p className='text-[0.95rem]'>{description}</p>
            </div>
            {
                showLayout && (
                    <div className="hidden mobile:flex justify-center items-center gap-2 bg-purple-light rounded-full p-1.5">
                        <button
                            className={`flex justify-center items-center gap-1.5 py-1 px-4 ${layout === "grid" ? "bg-white text-purple-dark" : "text-text bg-transparent"} rounded-full text-[0.8rem] tablet:text-[0.9rem] transition-colors duration-300 ease-in-out cursor-pointer`}
                            onClick={() => setLayout("grid")}
                        >
                            <LayoutGrid size={16} /> Grid
                        </button>
                        <button
                            className={`flex justify-center items-center gap-1.5 py-1 px-4 ${layout === "list" ? "bg-white text-purple-dark" : "text-text bg-transparent"} rounded-full text-[0.8rem] tablet:text-[0.9rem] transition-colors duration-300 ease-in-out cursor-pointer`}
                            onClick={() => setLayout("list")}
                        >
                            <StretchHorizontal size={16} /> List
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default PageHeader
