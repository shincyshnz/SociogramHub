import FollowUnfollowButton from "./FollowUnfollowButton";

const ProfileCard = ({ ...props }) => {
    const { userId, imgUrl, username, subText = "", text = "" } = props;
    const userDetails = {
        userId,
        username,
        imgUrl,
    };
    return (
        <>
            <div className="flex flex-col items-center justify-center mt-3">
                <div className="w-full flex items-center gap-3">
                    <img className={`w-12 h-12 p-[2px] rounded-full`} src={imgUrl || import.meta.env.VITE_TEMP_PROFILE_PIC_URL} alt="profile picture" />
                    <div className="flex flex-1 flex-col items-start justify-center">
                        <span className='text-md font-bold'>{username}</span>
                        <span className=' text-gray-600'>{subText}</span>
                    </div>

                    {text !== '' && (text === 'switch' ? (
                        <button>
                            <span className='font-bold'>{text}</span>
                        </button>
                    ) : (text === 'follow')
                        ? <FollowUnfollowButton
                            userDetails={userDetails}
                            btnText={text}
                            spanClass={'text-blue-700 font-bold'}
                        />
                        : text !== 'switch' && <FollowUnfollowButton
                            userDetails={userDetails}
                            btnText={text}
                            spanClass={'font-bold'}
                        />
                    )
                    }
                </div>
            </div >
        </>
    );
}

export default ProfileCard