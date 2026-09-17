import { AlertTriangle, X } from "lucide-react";
import api from "../../api/api";
import { toast } from "sonner";
import { useState } from "react";

const DeleteModal = ({ isOpen, setIsModalOpen, setListItem, id, onDeleted }) => {
    if (!isOpen) return null;
    const [isLoading, setLoading] = useState(false)

    const deleteNote = async (id) => {
        if (!id) return;
        setLoading(true)
        try {
            const res = await api.patch("/todo/delete-todo", { id })
            if (res.data?.success) {
                setListItem(prev => prev.map(item => item._id === id ? { ...item, isTrashed: true } : item))
                toast.success("Note moved to trash!")
            }
        } catch (error) {
            console.log("Error: ", error);
            toast.error(error.response?.data?.message || "Failed to delete note")
        } finally {
            setIsModalOpen(false)
            onDeleted()
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/30 backdrop-blur-xs px-4">

            <div className="min-h-full flex items-center justify-center">

                {/* Modal */}
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-4">

                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">

                        <div>
                            <h2 className="text-[18px] font-semibold uppercase font-poppins text-text">
                                Delete Note
                            </h2>

                            <p className="text-[14px] font-poppins text-description mt-0.5">
                                Are you sure you want to delete this note?
                            </p>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:bg-neutral-100 hover:text-heading transition-colors cursor-pointer"
                        >
                            <X size={18} />
                        </button>

                    </div>

                    {/* Content */}
                    <div className="p-6">

                        <div className="flex items-start gap-4 p-4 rounded-xl bg-red-50 border border-red-100">

                            <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-red-100 text-red-500">
                                <AlertTriangle size={19} />
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-heading">
                                    Your note will be moved to Trash.
                                </h3>

                                <p className="text-[13px] text-description mt-1 leading-5">
                                    Your deleted note will remain in Trash for 30 days.
                                    After that, it will be permanently deleted.
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 px-6 py-4 bg-neutral-50 border-t border-neutral-200">

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-text hover:bg-neutral-200 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={() => deleteNote(id)}
                            className="flex justify-center items-center w-full max-w-38 text-[15px] shadow-sm hover:shadow-md active:scale-[0.98] disabled:opacity-70 px-5 py-2 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                "Move to Trash"
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DeleteModal;