import { AlarmClockCheck, Star } from 'lucide-react'
function TodoItem({color, createdAt, title, desc, setFavourite, isFavourite, isTrashed, onClick}) {
    return (
        <>
            <div className={`w-full flex flex-col justify-start items-center gap-2 p-4 border border-transparent rounded-lg hover:shadow-lg hover:scale-102 cursor-pointer transition-transform duration-300 ease-in-out`}
                style={{ backgroundColor: color }}
                onClick={onClick}
            >
                <div className="w-full flex justify-between items-start gap-2 text-lg">
                    <div className="flex justify-start items-start gap-2">
                        <AlarmClockCheck size={17} className="text-description" />
                        <span className="text-[12px] text-description">{createdAt}</span>
                    </div>
                    <button 
                        className={`${isFavourite? "text-purple-dark": "text-description"} ${isTrashed? "cursor-not-allowed":"hover:text-purple-dark cursor-pointer"}`}
                        disabled={isTrashed}
                        onClick={setFavourite}
                    >
                        <Star size={17} fill={isFavourite? "currentColor": "none"}/>
                    </button>
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-1.5 font-poppins">
                    <h3 className="text-[1.1rem] tablet:text-[1.2rem] text-heading font-medium">{title}</h3>
                    <div className="tiptap w-full text-[0.9rem] mobile:text-[0.95rem] text-text line-clamp-8 leading-6" dangerouslySetInnerHTML={{ __html: desc }}/>
                </div>
            </div>
        </>
    )
}

export default TodoItem;