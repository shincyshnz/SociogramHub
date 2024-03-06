import React, { useState } from 'react';
import emojiData from '@emoji-mart/data';
import EmojiPicker from '@emoji-mart/react';
import { useForm } from 'react-hook-form';

const AddCommentForm = ({ ...props }) => {
    const { post, index } = props;
    const [showPostButton, setShowPostButton] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    // const [commentText, setCommentText] = useState("");


    const {
        register,
        setValue,
        getValues,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const handleChangeComment = (event) => {
        const { value } = event.target;
        (value.length > 0) ? setShowPostButton(true) : setShowPostButton(null);
        // setCommentText(value);
        setValue(`chat--${index}`, value);
        // if (+name.slice(6) === index) {
        //     (value.length > 0) ? setShowPostButton(true) : setShowPostButton(null);
        //     setCommentText(value);
        // }
    }

    const addEmoji = (event, index) => {
        const code = event.unified.split("_");
        const codeArray = [];
        code.forEach(el => codeArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codeArray);
        // const updatedComment = commentText + emoji;
        const updatedComment = getValues(`chat--${index}`) + emoji;
        // setCommentText(updatedComment);
        setValue(`chat--${index}`, updatedComment)
        setShowEmoji(prev => !prev);
    }

    const EmojiComponent = ({ index }) => {
        return (<div className="absolute right-1 z-[60]">
            <EmojiPicker showPreview={0} data={emojiData} onEmojiSelect={(e) => addEmoji(e, index)} emojiSize={20} theme="light" previewPosition="none" />
        </div>);
    }

    const onSubmit = async (data) => {
        try {
            console.log(data, "==data");

            const formData = {
                commentText: data[`chat--${index}`],
                postId: post.postId
            }
            console.log(formData);
            setValue(`chat--${index}`, "");
            // const response = await addComments(commentText);
            // if (response.status === 200) {
            //   console.log("comment added");

            //   // update the comment section in the postCard
            // }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <form className='relative border-b-2' onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="chat" className="sr-only">Add Comment</label>
            <div className="flex items-center rounded-lg bg-gray-50 dark:bg-gray-700">
                <textarea
                    // onFocus={() => setShowEmoji(index)}
                    id="chat"
                    // value={commentText}
                    // onChange={(e) => handleChangeComment(e)}
                    rows="1"
                    className="block resize-none w-full text-sm text-gray-900 bg-white rounded-lg border-0 focus:ring-0 focus:border-none dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-0"
                    placeholder="Add Comment..."
                    {...register(`chat--${index}`, {
                        // value: commentText,
                        onChange: handleChangeComment,
                    })}
                >
                </textarea>

                <input type="text" hidden defaultValue={post._id} {...register("postId")} />
                {showPostButton && (
                    <>
                        <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer dark:text-blue-500 ">
                            Post
                        </button>
                        <div>
                            <button type="button" onClick={() => setShowEmoji(prev => !prev)} className="p-2 text-gray-900 rounded-lg cursor-pointer dark:text-gray-400 ">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                                </svg>
                            </button>
                        </div>
                    </>
                )}
            </div>
            {(showEmoji) && <EmojiComponent index={index} />}

        </form>
    )
}

export default AddCommentForm