import React, { useEffect } from 'react';
import { Loader } from './GetComponents';
import { useGetProfile, useGetSuggestedUsers } from '../../lib/reactQuery/queriesAndMutations';
import ProfileCard from '../ProfileCard';

const RightSideBar = () => {
  // Fetch suggested users
  const {
    data: suggestedUsers,
    isPending: isPendingUsers,
    error: suggestedUserError,
  } = useGetSuggestedUsers();

  // Fetch Profile Data
  const {
    data: profile,
    isPending: isPendingProfile,
    error: profileError,
  } = useGetProfile();

  // Handle errors
  useEffect(() => {
    if (suggestedUserError || profileError) {
      const error = suggestedUserError || profileError;
      handleError('suggestedUsersApiError', { message: error?.response?.data?.message || error?.message });
    }
  }, [suggestedUserError, profileError]);

  // Markup
  return (
    <>
      <div className="w-full px-3 md:px-8 mt-6 max-w-[380px] text-center hidden lg:block">
        {isPendingProfile ? <Loader /> : (
          <>
            <ProfileCard userId={profile._id} imgUrl={profile.profile_pic} username={profile.username} subText={profile.fullname} text="Switch" />

            <div className="flex items-center  font-bold text-[14px]">
              <h5 className='flex-1 my-5 text-left text-gray-600'>Suggested for you</h5>
              <a href="#"><h5 className='text-right justify-self-end'>See all</h5></a>
            </div>


            <div className="flex flex-col">
              {suggestedUsers?.map((user, index) => (
                <ProfileCard userId={user._id} key={index} imgUrl={user.profile_pic} username={user.username} subText="Suggested for You." />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default RightSideBar