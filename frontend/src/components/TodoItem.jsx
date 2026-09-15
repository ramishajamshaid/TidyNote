import { AlarmClockCheck, Star } from 'lucide-react'
function TodoItem({color, createdAt, title, desc, setFavourite, isFavourite, isTrashed, onClick}) {
    return (
        <>
            <div className={`w-full flex flex-col justify-start items-center gap-2 p-4 border border-transparent rounded-lg hover:border-purple-200 cursor-pointer transition`}
                style={{ backgroundColor: color }}
                onClick={onClick}
            >
                <div className="w-full flex justify-between items-start gap-2 text-lg">
                    <div className="flex justify-start items-start gap-1.5">
                        <AlarmClockCheck size={16} className="text-description" />
                        <span className="text-[11px] text-description">{createdAt}</span>
                    </div>
                    <button 
                        className={`${isFavourite? "text-purple-dark": "text-description"} ${isTrashed? "cursor-not-allowed":"hover:text-purple-dark cursor-pointer"}`}
                        disabled={isTrashed}
                        onClick={setFavourite}
                    >
                        <Star size={16} fill={isFavourite? "currentColor": "none"}/>
                    </button>
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-1.5 font-poppins">
                    <h3 className="text-[0.95rem] mobile:text-[1rem] tablet:text-[1.05rem] text-heading font-medium">{title}</h3>
                    <p className="w-full text-[0.85rem] mobile:text-[0.9rem] tablet:text-[0.95rem] text-text line-clamp-8 leading-6">{desc}</p>
                </div>
            </div>
        </>
    )
}

export default TodoItem;