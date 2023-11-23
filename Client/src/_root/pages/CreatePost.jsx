import { Modal } from 'flowbite-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosImages } from "react-icons/io";
import { Loader, UserAvatar } from '../../components';
import { useGetUserDetails } from '../../lib/reactQuery/queriesAndMutations';

const CreatePost = ({ isCreatePostOpen, setIsCreatePostOpen }) => {
  const {
    data: userDetails,
    isPending,
    isError,
    error } = useGetUserDetails();

  // React-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    setError,
  } = useForm();

  const fileInputRef = useRef();
  const [preview, setPreview] = useState();
  const [isFileSelected, setIsFileSelected] = useState(false);
  const { ref: registerRef, ...rest } = register("fileUpload");

  if(isError){
    handleError('userDetails',  error?.message);
  }

  const handleUploadedFile = (event) => {
    const file = event.target.files[0];
    const urlImage = URL.createObjectURL(file);
    setPreview(urlImage);
    setIsFileSelected(true);
  }

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <>
      <Modal dismissible show={isCreatePostOpen} onClose={() => setIsCreatePostOpen(false)}>
        <div className="modal-header p-2 mx-auto text-lg">Create new post</div>
        <Modal.Body>
          <div className="max-w-xl">
            <label
              className="flex flex-1 flex-col gap-3 items-center w-full h-32 px-4 my-20 transition bg-transparent focus:outline-none">
              <IoIosImages className='w-20 h-20 dark:text-white' />
              <div className="font-medium text-gray-600">
                Drag photos and videos here
              </div>
              <div className='p-2 bg-blue-500 rounded-md text-white'>
                Select from computer
              </div>
              <input type="file" name="fileUpload" className="hidden" onChange={handleUploadedFile} ref={
                (e) => {
                  registerRef(e);
                  fileInputRef.current = e;
                }
              } />
            </label>
          </div>
        </Modal.Body>
      </Modal>

      {(isPending) ? <Loader /> : <Modal size="7xl" show={isFileSelected} onClose={() => setIsFileSelected(false)}>
        <div className="flex justify-content items center px-2">
          <h5 className="p-2 mx-auto text-lg">Create new post</h5>
          <button className="text-blue-700 font-bold" onClick={() => handleSubmit(onSubmit)}>Share</button>
        </div>
        <div className="w-full flex flex-1 justify-center">
          <img src={preview} alt="post" className="w-1/2 h-[350px] object-scale-up" />
          <div className="w-full flex flex-1 flex-col">
            <div className="flex items-center">
              <UserAvatar size="40px" />
              <span className='text-black font-bold mx-2'>{userDetails?.username}</span>
            </div>
          </div>
        </div>
      </Modal>}
    </>
  );
}

export default CreatePost;