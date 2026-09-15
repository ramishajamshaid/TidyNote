function InputBox({onChange,value, onKeyDown}){
    return(
        <>
        <input 
            className="flex items-center w-full outline-none bg-white p-2 rounded-lg border border-[#E4E1D8] text-lg placeholder:text-lg placeholder:text-neutral-400"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={value}
            placeholder="Add a task and press enter"
        >
        </input>
        </>
    )
}

export default InputBox;