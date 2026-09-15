import { X, Star, DessertIcon, Check, Ban } from "lucide-react";
import { useState } from "react";
import api from "../../api/api";

const colors = [
    {
        name: "",
        value: null
    },
    {
        name: "Purple",
        value: "#F3E8FF",
    },
    {
        name: "Pink",
        value: "#FCE7F3",
    },
    {
        name: "Blue",
        value: "#E0F2FE",
    },
    {
        name: "Orange",
        value: "#FFEDD5",
    },
    {
        name: "Yellow",
        value: "#FEF9C3",
    },
    {
        name: "Green",
        value: "#DCFCE7",
    },
];

const EditNoteModal = ({ isOpen, setListItem, listItem, setIsModalOpen, id, title, desc, color}) => {
    const [titleValue, setTitleValue] = useState(title);
    const [descValue, setDescValue] = useState(desc);
    const [noteColor, setNoteColor] = useState(color)
    if (!isOpen) return null;

    const editItem = async () => {
        const title = titleValue.trim();
        const desc = descValue.trim();

        if (title === "") return;
        const updatedTodo = {
            id: id,
            title: title,
            description: desc || "",
            color: noteColor || "#F3E8FF",
        }

        try {
            const res = await api.patch("/todo/update-todo", updatedTodo);
            if (res.data.success) {
                setListItem(prev => prev.map(item => id===item._id? {...item, title:title, description:desc, color:noteColor}: item))
            }
        } catch (error) {
            console.log("Error: ", error);
        }
        setTitleValue("")
        setDescValue("")
        setIsModalOpen(false)
    }
    

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/30 backdrop-blur-xs px-4">

            <div className="min-h-full flex items-center justify-center">
                {/* Modal */}
                <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-4">

                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
                        <div>
                            <h2 className="text-[18px] font-semibold uppercase font-poppins text-text">
                                Edit your Note
                            </h2>
                            <p className="text-[14px] font-poppins text-description mt-0.5">
                                Update your thoughts and ideas.
                            </p>
                        </div>

                        <button
                            onClick={()=>setIsModalOpen(false)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:bg-neutral-100 hover:text-heading transition-colors cursor-pointer"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Form */}
                    <div className="p-6 space-y-5">

                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-heading mb-2">
                                Title
                            </label>

                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={titleValue}
                                onChange={(e) => setTitleValue(e.target.value)}
                                placeholder="Give your note a title..."
                                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 outline-none text-sm text-heading placeholder:text-muted focus:border-purple-dark transition-all"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-heading mb-2">
                                Content
                            </label>

                            <textarea
                                rows={7}
                                maxLength={500}
                                id="description"
                                name="description"
                                value={descValue}
                                onChange={(e) => setDescValue(e.target.value)}
                                placeholder="Start writing your note..."
                                className="w-full resize-none px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 outline-none text-sm text-heading placeholder:text-muted focus:border-purple-dark transition-all"
                            />
                            <p className="text-[12px] text-description text-right">{descValue.length}/500</p>
                        </div>

                        {/* Bottom options */}
                        <div className="flex items-center justify-between">

                            {/* Colors */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-description mr-1">
                                    Color
                                </span>
                                {
                                    colors.map(color => (
                                        <label key={color.name || "remove-color"}>
                                            <input
                                                type="radio"
                                                name="noteColor"
                                                checked={noteColor === color.value}
                                                value={color.value}
                                                onChange={() => setNoteColor(color.value)}
                                                className="sr-only"
                                            />
                                            {
                                                color.name === "" ?
                                                    (
                                                        <div className="w-6 h-6 flex justify-center items-center rounded-full border border-border hover:scale-105 transition-transform cursor-pointer" style={{ backgroundColor: color.value }}>
                                                            <Ban size={16} className="text-description"/>
                                                        </div>
                                                    ) :
                                                    (
                                                        <div className="w-6 h-6 flex justify-center items-center rounded-full border border-transparent hover:scale-105 transition-transform cursor-pointer" style={{ backgroundColor: color.value }}>
                                                            {noteColor === color.value ? (<Check size={16} className="text-description" />) : ""}
                                                        </div>
                                                    )
                                            }
                                        </label>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 px-6 py-4 bg-neutral-50 border-t border-neutral-200">

                        <button
                            onClick={()=>setIsModalOpen(false)}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-text hover:bg-neutral-200 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-purple-dark hover:bg-purple-deep transition-colors cursor-pointer"
                            onClick={() => editItem()}
                        >
                            Save Changes
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default EditNoteModal;