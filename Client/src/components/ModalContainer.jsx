import React from 'react'

const ModalContainer = ({ children, modalContainerClassName }) => {
    return (
        // <div className="fixed top-8 bg-white max-h-[480px] w-3/4 lg:w-1/2 mx-auto p-2 overflow-x-hidden overflow-y-auto inset-0 z-40 outline-none focus:outline-none rounded-lg">

        <div className={modalContainerClassName}>
            {children}
        </div>
    )
}

// Define HOC
const WithModal = (WrappedComponent) => {
    return (props) => (
        <ModalContainer modalContainerClassName={props.modalContainerClassName}>
            <WrappedComponent {...props} />
        </ModalContainer>
    );
};

export default WithModal