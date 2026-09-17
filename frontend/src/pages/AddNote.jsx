import { ArrowLeft, Ban, Check } from "lucide-react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import api from "../api/api";
import Tiptap from "../components/tiptap/TipTap";
import { toast } from "sonner";

const colors = [
    {
        name: "",
        value: null,
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
        value: "#faf7d5",
    },
    {
        name: "Green",
        value: "#DCFCE7",
    },
];

const AddNote = () => {
    const navigate = useNavigate();
    const { setListItem } = useOutletContext()
    
    const [isLoading, setLoading] = useState(false)
    const [titleValue, setTitleValue] = useState("");
    const [descValue, setDescValue] = useState("");
    const [noteColor, setNoteColor] = useState(null);

    const addItem = async () => {
        const title = titleValue.trim();
        const desc = descValue.trim();

        if (title === "") return;
        setLoading(true)

        const newTodo = {
            title,
            description: desc,
            color: noteColor || "#F3E8FF",
        };

        try {
            const res = await api.post("/todo/save-todo", newTodo);

            if (res.data.success) {
                setListItem(prev => [...prev, res.data.data]);
                navigate("/dashboard");
                toast.success("Note created successfully")
            }
        } catch (error) {
            console.log("Error: ", error);
            toast.error(error.response?.data?.message || "Failed to create note")
        } finally{
            setLoading(false)
        }
    };

    return (
        <div className="flex flex-col justify-start items-center gap-4 w-full py-2 px-4 mt-12 mb-18 mobile:px-6 tablet:mt-0 tablet:mb-0">

            {/* Top */}
            <div className="w-full flex justify-start items-center gap-4 font-poppins py-3">

                <button
                    onClick={() => navigate(-1)}
                    className="flex justify-center items-center gap-1.5 py-1.5 px-5 rounded-full bg-white hover:bg-purple-light text-heading hover:text-purple-dark transition-colors cursor-pointer text-[14px]"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>

            </div>

            {/* Main Card */}
            <div className="w-full rounded-3xl pt-6 shadow-2xl bg-linear-to-r from-purple-light via-pink-light to-blue-light">

                <div className="w-full rounded-3xl bg-white p-4 tablet:p-8">

                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-[20px] tablet:text-[24px] font-semibold text-text">
                            Create a new note
                        </h2>

                        <p className="text-[13px] tablet:text-[14px] text-description mt-1">
                            Capture your thoughts and ideas.
                        </p>
                    </div>

                    {/* Title */}
                    <div className="mb-5">
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-heading mb-2"
                        >
                            Title
                        </label>

                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={titleValue}
                            onChange={(e) => setTitleValue(e.target.value)}
                            placeholder="Give your note a title..."
                            className="w-full px-4 py-3 rounded-xl border border-neutral-300 outline-none text-sm text-heading placeholder:text-muted focus:border-purple-dark transition-all"
                        />
                    </div>

                    {/* Content */}
                    <div className="mb-5">

                        <label className="block text-sm font-medium text-heading mb-2">
                            Content
                        </label>

                        <Tiptap
                            value={descValue}
                            setValue={setDescValue}
                        />

                    </div>

                    {/* Color */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-description">
                            Color
                        </span>

                        <div className="flex flex-wrap gap-2">
                            {colors.map((color) => (
                                <label
                                    key={color.name || "remove-color"}
                                    className="relative block cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="noteColor"
                                        checked={noteColor === color.value}
                                        onChange={() => setNoteColor(color.value)}
                                        className="absolute w-0 h-0 opacity-0"
                                    />

                                    {color.name === "" ? (
                                        <div
                                            className="w-7 h-7 flex justify-center items-center rounded-full border border-border hover:scale-105 transition-transform cursor-pointer"
                                            style={{
                                                backgroundColor: color.value || "#fff",
                                            }}
                                        >
                                            <Ban
                                                size={16}
                                                className="text-description"
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="w-7 h-7 flex justify-center items-center rounded-full border border-transparent hover:scale-105 transition-transform cursor-pointer"
                                            style={{
                                                backgroundColor: color.value,
                                            }}
                                        >
                                            {noteColor === color.value && (
                                                <Check
                                                    size={16}
                                                    className="text-description"
                                                />
                                            )}
                                        </div>
                                    )}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 mt-8 pt-5 border-t border-neutral-200">

                        <button
                            onClick={() => navigate(-1)}
                            className="px-5 py-2.5 rounded-lg text-sm font-medium text-text hover:bg-neutral-100 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={() => addItem()}
                            className="flex justify-center items-center bg-purple-dark hover:bg-purple-deep rounded-xl w-full max-w-32 py-3 text-[15px] font-medium text-white shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-70"
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                "Save Note"
                            )}
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddNote;