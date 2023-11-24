import { Textarea } from 'flowbite-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosImages } from "react-icons/io";
import { FormFields, Loader, UserAvatar } from '../../components';
import { useGetUserDetails } from '../../lib/reactQuery/queriesAndMutations';
import TagSearchBar from '../../components/TagSearchBar';
import { useError } from '../../hooks/customHooks';
import { Modal } from 'flowbite-react/lib/esm/components/Modal/Modal';
import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader';
import { ModalBody } from 'flowbite-react/lib/esm/components/Modal/ModalBody';

const CreatePost = ({ isCreatePostOpen, setIsCreatePostOpen }) => {
  const {
    data: userDetails,
    isPending,
    isSuccess,
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
  const { handleError, deleteError } = useError();
  const [charLength, setCharLength] = useState(0);
  const [preview, setPreview] = useState();
  const [isFileSelected, setIsFileSelected] = useState(false);
  const { ref: registerRef, ...rest } = register("fileUpload");


  const handleChange = (event) => {
    const { name, value } = event.target;
    setCharLength(prev => prev = value.length);
  }

  const handleUploadedFile = (event) => {
    const file = event.target.files[0];
    const urlImage = URL.createObjectURL(file);
    setPreview(urlImage);
    setIsFileSelected(true);
  }

  const onSubmit = (data) => {
    deleteError('userDetails');
    console.log(data);
  }

  if (isError) {
    handleError('userDetails', error?.message);
  }

  return (
    <>
      <Modal show={isCreatePostOpen} onClose={() => setIsCreatePostOpen(false)}>
        <div className="flex justify-content items-center gap-1">
          <h5 className="mx-auto text-lg">Create new post</h5>
          <ModalHeader></ModalHeader>
        </div>
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
        <div className="w-full h-screen">
          <div className="flex justify-content items-center gap-1">
            <ModalHeader></ModalHeader>
            <h5 className="mx-auto text-lg">Create new post</h5>
            <button className="text-blue-700 font-bold px-1" onClick={() => handleSubmit(onSubmit)}>Share</button>
          </div>
          <ModalBody className='h-screen'>
            <div className="w-full flex justify-center gap-3">
              <img src={preview} alt="post" className="w-1/2 h-[350px] object-scale-up" />
              <div className="w-full flex flex-1 flex-col">
                <div className="flex items-center">
                  <UserAvatar size="40px" />
                  <span className='text-black font-bold mx-2'>{userDetails?.username}</span>
                </div>

                <Textarea
                  className="border-0 focus:border-transparent focus:ring-0"
                  {...register("post")}
                  placeholder='Write a caption...'
                  maxLength={2200}
                  name="post"
                  id="post"
                  onChange={handleChange}
                  rows={10}
                />
                <div className='relative mb-3'>
                  <span className='absolute right-1'>{charLength}/2,200</span>
                </div>
                <FormFields
                  className="border-none focus:ring-0"
                  label={"Add Location"}
                  name={"location"}
                  type={"text"}
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  clearErrors={clearErrors}
                  setError={setError}
                />
                <TagSearchBar />
              </div>
            </div>
          </ModalBody>
        </div>
      </Modal>}
    </>
  );
}

export default CreatePost;