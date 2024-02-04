import React from 'react';
import { Loader } from './GetComponents';
import { useGetProfile, useSuggestedUsers } from '../../lib/reactQuery/queriesAndMutations';

export const ProfileCard = ({ ...props }) => {
  const { imgUrl, username, subText, text = "follow" } = props;
  return (
    <div className="flex flex-col items-center justify-center mt-3">
      <div className="w-full flex items-center gap-3">
        <a href='#'>
          <img className="w-12 h-12 p-[2px] rounded-full" src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
        </a>
        <div className="flex flex-1 flex-col items-start justify-center">
          <span className='text-md font-bold'>{username}</span>
          <span className=' text-gray-600'>{subText}</span>
        </div>
        <span className='text-blue-700 font-bold'>{text}</span>
      </div>
    </div>
  );
}

const RightSideBar = () => {

  // react-query - get user suggestions
  const {
    mutateAsync: suggestedUsers,
    isPending,
    error: suggestedUserError,
  } = useSuggestedUsers();

  const {
    data: profile,
    error: profileError,
  } = useGetProfile();

  if (suggestedUserError || profileError) {
    const error = suggestedUserError || profileError;
    handleError('suggestedUsersApiError', { message: error?.response?.data?.message || error?.message });
  }
  
  console.log(profile, suggestedUsers, "===");
  
  return (
    <div className="w-full px-3 md:px-8 mt-6 max-w-[380px] text-center hidden lg:block">
      <ProfileCard imgUrl="assets/cake.png" username={profile.username} subText={profile.fullname} text="Switch" />

      <div className="flex items-center  font-bold text-[14px]">
        <h5 className='flex-1 my-5 text-left text-gray-600'>Suggested for you</h5>
        <a href="#"><h5 className='text-right justify-self-end'>See all</h5></a>
      </div>


      <div className="flex flex-col">
        {isPending
          ? <Loader />
          : <>
            <ProfileCard imgUrl="assets/cake.png" username="shincy_raffy" subText="Follows You." />
            <ProfileCard imgUrl="assets/cake.png" username="shincy_raffy" subText="Follows You." />
            <ProfileCard imgUrl="assets/cake.png" username="shincy_raffy" subText="Suggested for you." />
            <ProfileCard imgUrl="assets/cake.png" username="shincy_raffy" subText="Suggested for you." />
            <ProfileCard imgUrl="assets/cake.png" username="shincy_raffy" subText="Suggested for you." />
          </>
        }
      </div>
    </div >
  )
}

export default RightSideBar