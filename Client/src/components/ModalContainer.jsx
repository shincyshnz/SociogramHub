import React from 'react'

const ModalContainer = ({children}) => {
    return (
        <div className='absolute w-full py-5 flex-center bg-opacity-60 max-h-screen px-10 md:px-0 bg-slate-900 inset-0 z-40 overflow-hidden'>
            <div className='fixed w-full h-64 md:w-80 bg-white rounded-lg p-3'>
                {children}
            </div>
        </div>
    )
}

// Define HOC
const WithModal = (WrappedComponent) => {
    return (props) => ( 
        <ModalContainer>
            <WrappedComponent {...props} />
        </ModalContainer>
    );
};

export default WithModal