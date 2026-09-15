import { useState, useRef, useEffect } from 'react'
import '../App.css'
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom'
import TodoItem from '../components/TodoItem.jsx'
import api from '../api/api.js'
import EmptyState from '../components/EmptyState.jsx'
import { formateDate } from '../calculations.js'
import PageHeader from '../components/PageHeader.jsx'

function AllNotes() {
    const navigate = useNavigate()
    const { listItem, setListItem, setFavourite, layout, setLayout, searchQuery } = useOutletContext()
    const day = new Date().toLocaleDateString("en-us",
        {
            year: "numeric",
            month: "short",
            weekday: "short",
            day: "numeric"
        }
    );
    
    const month = new Date().toLocaleDateString("en-us", { month: "long" });
    const allnotes = listItem.filter(item=> !item.isTrashed)
    const filteredListItem = allnotes.filter(item=> item.title.toLowerCase().includes(searchQuery.toLowerCase())||item.description.toLowerCase().includes(searchQuery.toLowerCase())) || allnotes;

    return (
        <>
            <div className="flex flex-col justify-start items-center gap-4 w-full py-2 px-4 mt-12 mb-18 mobile:px-6 tablet:mt-0 tablet:mb-0">
                <PageHeader
                    title="All Notes"
                    description="Capture your thoughts, reflections, and ideas in a mindful space."
                    layout={layout}
                    setLayout={setLayout}
                />
                {allnotes.length === 0 ?
                    (<EmptyState desc="Nothing here yet. Create a Note to get started." />) :
                    (<div className={`w-full ${layout==="grid"? "grid-cols-1 mobile:grid-cols-2 laptop:grid-cols-3": "grid-cols-1"} grid gap-6`}>
                        {
                            filteredListItem.map((item, index) => (
                                <TodoItem
                                    key={item._id}
                                    title={item.title}
                                    desc={item.description}
                                    color={item.color}
                                    createdAt={formateDate(item.createdAt)}
                                    setFavourite={(e) => {
                                        e.stopPropagation()
                                        setFavourite(item.isFavourite, item._id)
                                    }}
                                    isTrashed={item.isTrashed}
                                    isFavourite={item.isFavourite}
                                    onClick={()=> navigate(`/dashboard/detail-page/${item._id}`, {
                                        state: {from: "all-notes"}
                                    })}
                                />
                            ))
                        }
                    </div>
                    )}
            </div>
        </>
    )
}

export default AllNotes
