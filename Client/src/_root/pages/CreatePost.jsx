import React from 'react';
import { Spinner } from 'flowbite-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosImages } from "react-icons/io";
import { Loader, PostModal } from '../../components';
import { useCreatePosts, useGetProfile } from '../../lib/reactQuery/queriesAndMutations';
import { useError } from '../../hooks/customHooks';
import { useQueryClient } from '@tanstack/react-query';

const CreatePost = ({ isCreatePostOpen, setIsCreatePostOpen }) => {
  // Getting loggedin user details from react query cache
  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData(['profile']);

  // React-Query - fetching loggedIn user data
  // const {
  //   data: profile,
  //   isPending: isPendingProfile,
  //   isError: isErrorProfile,
  //   error: profileError,
  // } = useGetProfile();

  // React-Query - posting data
  const {
    mutateAsync: createPosts,
    isPending: isPendingCreatePosts,
    isError: isErrorCreatePost,
    error: createPostError,
  } = useCreatePosts();

  // React - hook - form
  const {
    register,
    formState: { errors },
  } = useForm();

  const fileInputRef = useRef();
  const { handleError } = useError();
  const [preview, setPreview] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [taggedUsers, setTaggedUsers] = useState(null);
  const [file, setFile] = useState(null);
  const { ref: registerRef, ...rest } = register("fileUpload");

  if (isErrorProfile) {
    handleError('profile', profileError?.message);
  }

  if (isErrorCreatePost) {
    setIsFileSelected(false);
    setIsCreatePostOpen(false);
  }

  const handleUploadedFile = (event) => {
    const file = event.target.files[0];
    const urlImage = URL.createObjectURL(file);
    setPreview(urlImage);
    setIsFileSelected(true);

    setFile(file);
  }

  const onSubmit = async (data) => {
    if (Object.keys(errors).length > 0) {
      console.log(errors, "==erros");
      return;
    }

    const formData = {
      "userId": profile._id,
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

  return (
    <>
      {/* Select file modal */}
      {isCreatePostOpen && (
        <div className="fixed bg-slate-950 bg-opacity-55 flex-center flex-col overflow-hidden inset-0 z-40 outline-none focus:outline-none">
          <button
            className="absolute top-5 right-5 bg-transparent border-0 text-white"
            onClick={() => {
              setIsCreatePostOpen(false);
              setIsFileSelected(false);
            }}
          >
            <span className="opacity-7 h-6 w-6 text-2xl block">
              x
            </span>
          </button>
          <div className="w-3/4 lg:w-1/2 relative my-6 mx-auto px-2">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex-center p-5 border-b border-solid border-gray-300 rounded-t ">
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

          {/* Post modal */}
          {
          // (isPendingProfile) ? <Loader /> :
            (isFileSelected) &&
            <>
              {isPendingCreatePosts &&
                <div className='absolute top-64 w-full text-center flex-center z-50'>
                  <Spinner aria-label="Extra large spinner example" size="xl" />
                </div>
              }
              <PostModal
                modalContainerClassName='fixed top-8 bg-white max-h-[480px] w-3/4 lg:w-1/2 mx-auto p-2 overflow-x-hidden overflow-y-auto inset-0 z-40 outline-none focus:outline-none rounded-lg'
                preview={preview}
                profile={profile}
                setTaggedUsers={setTaggedUsers}
                onSubmit={onSubmit}
              />

            </>}
        </div>
      )}
    </>
  )
}

export default CreatePost