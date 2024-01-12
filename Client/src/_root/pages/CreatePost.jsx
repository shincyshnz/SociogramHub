import { Spinner, Textarea } from 'flowbite-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosImages } from "react-icons/io";
import { FormFields, Loader, NotificationToast, UserAvatar } from '../../components';
import { useCreatePosts, useGetUserDetails } from '../../lib/reactQuery/queriesAndMutations';
import TagSearchBar from '../../components/TagSearchBar';
import { useError } from '../../hooks/customHooks';
import { HiCheckCircle } from "react-icons/hi";
// import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader';
// import { ModalBody } from 'flowbite-react/lib/esm/components/Modal/ModalBody';
// import { Modal } from 'flowbite-react/lib/esm/components/Modal/Modal';

// const CreatePost = ({ isCreatePostOpen, setIsCreatePostOpen }) => {
//   // React-Query - fetching loggedIn user data
//   const {
//     data: userDetails,
//     isPending: isPendingUserDetails,
//     isError: isErrorGetUserDetails,
//     error
//   } = useGetUserDetails();

//   // React-Query - posting data
//   const {
//     mutateAsync: createPosts,
//     isPending: isPendingCreatePosts,
//     isError: isErrorCreatePost,
//     error: createPostError,
//     isSuccess,
//     data,
//   } = useCreatePosts();


//   // React-hook-form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     clearErrors,
//     setValue,
//     setError,
//   } = useForm();

//   const { handleError, deleteError } = useError();
//   const [charLength, setCharLength] = useState(0);
//   const fileInputRef = useRef();
//   const { ref: registerRef, ...rest } = register("fileUpload");
//   const [preview, setPreview] = useState();
//   const [isFileSelected, setIsFileSelected] = useState(false);
//   const [taggedUsers, setTaggedUsers] = useState(null);
//   const [file, setFile] = useState(null);

//   // Handling character length for caption maximum 2200
//   const handleCaptionChange = (event) => {
//     const { name, value } = event.target;
//     setCharLength(prev => prev = value.length);
//   }

//   const handleUploadedFile = (event) => {
//     const file = event.target.files[0];
//     const urlImage = URL.createObjectURL(file);
//     setPreview(urlImage);
//     setIsFileSelected(true);

//     setFile(file);
//   }

//   if (isErrorGetUserDetails) {
//     handleError('userDetails', error?.message);
//   }

//   if (isErrorCreatePost) {
//     setIsFileSelected(false);
//     setIsCreatePostOpen(false);
//   }

//   const onSubmit = async (data) => {
//     if (Object.keys(errors).length > 0) {
//       console.log(errors, "==erros");
//       return;
//     }

//     const formData = {
//       "userId": userDetails._id,
//       "caption": data.caption,
//       "location": data.location,
//       "taggedUsers": taggedUsers?.map(user => user._id),
//       "postFile": file,
//     }

//     try {
//       const response = await createPosts(formData);
//       if (response.status === 200) {
//         setIsFileSelected(false);
//         setIsCreatePostOpen(false);
//       }
//     } catch (error) {
//       handleError('createPostApiError', { message: error?.response?.data?.message || error?.message });
//     }
//   }

//   return (
//     <>
//       <Modal show={isCreatePostOpen} onClose={() => setIsCreatePostOpen(false)}>
//         <ModalHeader className='w-full'>Create new post</ModalHeader>
//         {/* <ModalBody> */}
//         <div className='overflow-auto'>
//           <div className="w-full flex items-center justify-center">
//             <label
//               className="flex flex-col gap-3 items-center w-full h-32 px-4 my-20 transition bg-transparent focus:outline-none">
//               <IoIosImages className='w-20 h-20 dark:text-white' />
//               <div className="font-medium text-gray-600">
//                 Drag photos and videos here
//               </div>
//               <div className='p-2 bg-blue-500 rounded-md text-white'>
//                 Select from computer
//               </div>
//               <input type="file" name="fileUpload" className="hidden" onChange={handleUploadedFile}
//                 ref={
//                   (e) => {
//                     registerRef(e);
//                     fileInputRef.current = e;
//                   }
//                 }
//               />
//             </label>
//           </div>
//           {/* </ModalBody> */}
//         </div>
//       </Modal>

//       {(isPendingUserDetails) ? <Loader /> : <Modal show={isFileSelected} onClose={() => {
//         setIsFileSelected(false);
//         setIsCreatePostOpen(false);
//       }}>
//         {isPendingCreatePosts &&
//           <div className='absolute top-64 w-full text-center flex justify-center items-center'>
//             <Spinner aria-label="Extra large spinner example" size="xl" />
//           </div>
//         }
//         <form className="w-full p-1 overflow-y-auto">
//           <div className="flex justify-content gap-1">
//             <ModalHeader></ModalHeader>
//             <h5 className="mx-auto text-lg">Create new post</h5>
//             <button onClick={handleSubmit(onSubmit)} className="text-blue-700 font-bold p-4">Share</button>
//           </div>
//           <ModalBody>
//           <div className='p-3'>
//             <div className="w-full h-full flex flex-col md:flex-row  justify-center gap-3">
//               <img
//                 src={preview}
//                 alt="post"
//                 className="w-full h-[350px] md:w-1/2 md:h-[350px]"
//               />
//               <div className="w-full flex flex-col">
//                 <div className="flex items-center">
//                   <UserAvatar size="40px" />
//                   <span className='text-black font-bold mx-2'>{userDetails?.username}</span>
//                 </div>

//                 <Textarea
//                   className="border-0 focus:border-transparent focus:ring-0"
//                   {...register("caption")}
//                   placeholder='Write a caption...'
//                   maxLength={2200}
//                   name="caption"
//                   id="caption"
//                   onChange={handleCaptionChange}
//                   rows={10}
//                 />
//                 <div className='relative mb-3'>
//                   <span className='absolute right-1'>{charLength}/2,200</span>
//                 </div>
//                 <FormFields
//                   className="border-none focus:ring-0"
//                   label="Add Location"
//                   name="location"
//                   type="text"
//                   register={register}
//                   errors={errors}
//                   setValue={setValue}
//                   clearErrors={clearErrors}
//                   setError={setError}
//                 />
//                 <TagSearchBar
//                   name="users"
//                   placeholder="Tag People"
//                   setTaggedUsers={setTaggedUsers}
//                 />
//               </div>
//             </div>
//           </div>
//           </ModalBody>

//         </form >
//       </Modal>}

//       {/* {isSuccess ? (<NotificationToast
//         Icon={<HiCheckCircle className='h-5 w-5' />}
//         message={"Post created succesfully"}
//         type='success' />) : console.log(data)} */}

//     </>
//   );
// }

// export default CreatePost;


import React from 'react'

const CreatePost = ({ isCreatePostOpen, setIsCreatePostOpen }) => {

  /*-------------------------------------------------------*/
  //  React-Query - fetching loggedIn user data
  const {
    data: userDetails,
    isPending: isPendingUserDetails,
    isError: isErrorGetUserDetails,
    error : userDetailsError,
  } = useGetUserDetails();

  // React-Query - posting data
  const {
    mutateAsync: createPosts,
    isPending: isPendingCreatePosts,
    isError: isErrorCreatePost,
    error: createPostError,
    isSuccess,
    data,
  } = useCreatePosts();


  // React - hook - form
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    setError,
  } = useForm();

  const { handleError, deleteError } = useError();
  const [charLength, setCharLength] = useState(0);
  const fileInputRef = useRef();
  const { ref: registerRef, ...rest } = register("fileUpload");
  const [preview, setPreview] = useState();
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [taggedUsers, setTaggedUsers] = useState(null);
  const [file, setFile] = useState(null);

  // Handling character length for caption maximum 2200
  const handleCaptionChange = (event) => {
    const { name, value } = event.target;
    setCharLength(prev => prev = value.length);
  }

  const handleUploadedFile = (event) => {
    const file = event.target.files[0];
    const urlImage = URL.createObjectURL(file);
    setPreview(urlImage);
    setIsFileSelected(true);

    setFile(file);
  }

  // isErrorGetUserDetails && return handleError('userDetails', userDetailsError?.message);

  // if (isErrorCreatePost) {
  //   setIsFileSelected(false);
  //   setIsCreatePostOpen(false);
  // }

  const onSubmit = async (data) => {
    if (Object.keys(errors).length > 0) {
      console.log(errors, "==erros");
      return;
    }

    const formData = {
      "userId": userDetails._id,
      "caption": data.caption,
      "location": data.location,
      "taggedUsers": taggedUsers?.map(user => user._id),
      "postFile": file,
    }

    try {
      const response = await createPosts(formData);
      if (response.status === 200) {
        setIsFileSelected(false);
        setIsCreatePostOpen(false);
      }
    } catch (error) {
      handleError('createPostApiError', { message: error?.response?.data?.message || error?.message });
    }
  }

  /*----------------------------------------------------------*/


  return (
    <>
      {isCreatePostOpen && (
        <div className="w-full bg-slate-950 bg-opacity-55 flex flex-col justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" onClick={() => setIsCreatePostOpen(false)}>
          <button
            className="absolute top-5 right-5 bg-transparent border-0 text-white"
            onClick={() => setIsCreatePostOpen(false)}
          >
            <span className="opacity-7 h-6 w-6 text-2xl block">
              x
            </span>
          </button>
          <div className="w-full lg:w-1/2 relative my-6 mx-auto px-2">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-center justify-center p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-lg">Create New Post</h3>
              </div>
              <div>
                <div className='overflow-auto'>
                  <div className="w-full flex items-center justify-center">
                    <label
                      className="flex flex-col gap-3 items-center w-full h-32 px-4 my-20 transition bg-transparent focus:outline-none">
                      <IoIosImages className='w-20 h-20 dark:text-white' />
                      <div className="font-medium text-gray-600">
                        Drag photos and videos here
                      </div>
                      <div className='p-2 bg-blue-500 rounded-md text-white'>
                        Select from computer
                      </div>
                      <input type="file" name="fileUpload" className="hidden" onChange={handleUploadedFile}
                        ref={
                          (e) => {
                            registerRef(e);
                            fileInputRef.current = e;
                          }
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreatePost