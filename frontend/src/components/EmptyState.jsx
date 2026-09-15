import emptyState from '../assets/emptyState.svg'

function EmptyState({desc}) {
    return (
        <div className='flex flex-col justify-center items-center gap-3 w-full'>
            <div className="max-w-100 md:max-w-120 w-full flex justify-center items-center">
                <img src={emptyState} alt='Nothing here yet' className="object-contain w-full h-full"/>
            </div>
            <p className='text-[14px] md:text-[16px] text-description text-center font-poppins'>{desc}</p>
        </div>
    )
}

export default EmptyState
