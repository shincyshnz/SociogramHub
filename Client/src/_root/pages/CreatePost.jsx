import { Button, Modal } from 'flowbite-react';
import { IoIosImages } from "react-icons/io";

const CreatePost = ({ isCreatePostOpen, setIsCreatePostOpen }) => {

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
              <input type="file" name="file_upload" className="hidden" />
            </label>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreatePost;