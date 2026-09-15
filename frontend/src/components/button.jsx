function Button({onClick, onKeyDown}){
    return(
        <>
        <button 
            className="rounded-full p-1.5 text-white bg-[#2F5D50] cursor-pointer hover:bg-[#295045]"
            onClick={onClick}
            onKeyDown={onKeyDown}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
        </>
    )
}

export default Button;