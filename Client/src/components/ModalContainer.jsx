import React from 'react'

const ModalContainer = () => {
    return (
        <div className='absolute w-full flex-center bg-opacity-60 max-h-screen px-10 md:px-0 bg-slate-900 inset-0 z-40 overflow-hidden'>
            <div className='fixed w-full h-64 md:w-80 bg-white rounded-lg p-3'>
            </div>
        </div>
    )
}

export default ModalContainer