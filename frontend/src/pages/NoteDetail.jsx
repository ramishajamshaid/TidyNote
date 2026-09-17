import { ArrowLeft, Calendar, Clock, Delete, Edit, PenLine, RotateCwFadingClock, Star, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import { formateDate, timeAgo } from '../calculations'
import EditNoteModal from '../components/modals/EditNoteModal'
import DeleteModal from '../components/modals/DeleteModal'

function NoteDetail() {
    const { listItem, setListItem, setFavourite} = useOutletContext()
    const [editNote, setEditNote] = useState(false)
    const [deleteNote, setDeleteNote] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()

    const from = location.state?.from;
    const todo = listItem.filter(item => item._id === id)[0] || []

    return (
        <>
            <div className="flex flex-col justify-start items-center gap-4 w-full py-2 px-6 mt-12 mb-18 tablet:mt-0 tablet:mb-0">
                <div className='w-full flex flex-col justify-center items-start px-2 mobile:flex-row mobile:justify-between mobile:items-end gap-4 font-poppins py-3'>
                    <div className="flex flex-col justify-center items-start gap-0.5">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex justify-center items-center gap-1.5 py-1.5 px-5 rounded-full bg-white hover:bg-purple-light text-heading hover:text-purple-dark transition-colors cursor-pointer text-[14px]"
                        >
                            <ArrowLeft size={18} /> Back to {from}
                        </button>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <button
                            className={`bg-white rounded-full p-2 ${todo.isFavourite ? "text-purple-dark" : "text-text"} hover:text-purple-dark hover:bg-purple-light transition-colors cursor-pointer`}
                            onClick={() => setFavourite(todo.isFavourite, todo._id)}
                        >
                            <Star size={16} fill={`${todo?.isFavourite ? "currentColor" : "none"}`} />
                        </button>
                        <button
                            className="bg-white rounded-full p-2 text-text hover:text-purple-dark hover:bg-purple-light transition-colors cursor-pointer"
                            onClick={()=>setEditNote(true)}
                        >
                            <PenLine size={16} />
                        </button>
                        <button
                            className="bg-white rounded-full p-2 text-text hover:text-purple-dark hover:bg-purple-light transition-colors cursor-pointer"
                            onClick={()=>setDeleteNote(true)}
                        >
                            <Trash size={16} />
                        </button>
                    </div>
                </div>
                {todo.length === 0 ?
                    (<EmptyState desc="Nothing here yet. Select note to check detail." />) :
                    (<div className="w-full rounded-3xl pt-6 shadow-2xl bg-linear-to-r from-purple-light via-pink-light to-blue-light">
                        <div className="w-full flex flex-col justify-start items-start gap-1.5 rounded-3xl p-6 bg-white">
                            <h2 className="text-heading text-[1.5rem] tablet:text-[1.8rem] font-medium">{todo?.title}</h2>
                            <div className="flex justify-start items-center gap-4 text-description">
                                <span className="flex justify-center items-center gap-1 text-[0.75rem]"><Calendar size={13} /> {formateDate(todo?.createdAt)}</span>
                                <span className="w-1 h-1 bg-description rounded-full"></span>
                                <span className="flex justify-center items-center gap-1 text-[0.75rem]"><RotateCwFadingClock size={13} /> {timeAgo(todo?.updatedAt)}</span>
                                <span className="w-1 h-1 bg-description rounded-full"></span>
                                <span className="flex justify-center items-center gap-1 text-purple-dark text-[0.75rem]">Auto-synced</span>
                            </div>
                            <div className="w-full bg-border h-px my-3"></div>
                            <p className="tiptap w-full min-h-64 p-4 rounded-2xl text-text text-[0.9rem] leading-6 tablet:text-[1rem] tablet:leading-7" style={{backgroundColor: todo.color}} dangerouslySetInnerHTML={{ __html: todo?.description }}/>
                        </div>
                    </div>
                    )}
            </div>
            {
                editNote && (
                    <EditNoteModal
                        id={todo?._id}
                        title={todo?.title}
                        desc={todo?.description}
                        color={todo?.color}
                        isOpen={editNote}
                        setIsModalOpen={setEditNote}
                        setListItem={setListItem}
                        listItem={listItem}
                    />
                )
            }
            {
                deleteNote && (
                    <DeleteModal
                        isOpen={deleteNote}
                        setIsModalOpen={setDeleteNote}
                        id={todo?._id}
                        setListItem={setListItem}
                        onDeleted={()=>navigate(-1)}
                    />
                )
            }
        </>
    )
}

export default NoteDetail
