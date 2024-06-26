import { useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "flowbite-react";
import WithModal from "../HOC/ModalContainer"
import FormFields from "../shared/FormFields";
import TagSearchBar from "./TagSearchBar";
import UserAvatar from "../shared/UserAvatar";

const PostModal = ({ ...props }) => {
    const { preview, profile, setTaggedUsers, onSubmit } = props;

    const [charLength, setCharLength] = useState(0);

    // React - hook - form
    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setValue,
        setError,
    } = useForm();

    // Handling character length for caption maximum 2200
    const handleCaptionChange = (event) => {
        const { value } = event.target;
        setCharLength(prev => prev = value.length);
    }

    return (
        <form className="overflow-y-auto p-2">
            <div className="flex justify-center items-baseline mb-6">
                <h5 className="mx-auto  text-lg">Create new post</h5>
                <button onClick={handleSubmit(onSubmit)} className="text-blue-700 font-bold">Share</button>
            </div>
            <div className="w-full flex flex-col md:flex-row  justify-center items-center gap-3">
                <img
                    src={preview}
                    alt="post"
                    className="w-full h-[350px] md:w-1/2 md:h-[350px] self-center"
                />
                <div className="w-full flex flex-col">
                    <div className="flex items-center">
                        <UserAvatar size="40px" />
                        <span className='text-black font-bold mx-2'>{profile?.username}</span>
                    </div>

                    <Textarea
                        className="border-0 focus:border-transparent focus:ring-0"
                        {...register("caption")}
                        placeholder='Write a caption...'
                        maxLength={2200}
                        name="caption"
                        id="caption"
                        onChange={handleCaptionChange}
                        rows={10}
                    />
                    <div className='relative mb-3'>
                        <span className='absolute right-1'>{charLength}/2,200</span>
                    </div>
                    <FormFields
                        className="border-none focus:ring-0"
                        label="Add Location"
                        name="location"
                        type="text"
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        setError={setError}
                    />
                    <TagSearchBar
                        name="users"
                        placeholder="Tag People"
                        setTaggedUsers={setTaggedUsers}
                    />
                </div>
            </div>

        </form>
    )
}

export default WithModal(PostModal)