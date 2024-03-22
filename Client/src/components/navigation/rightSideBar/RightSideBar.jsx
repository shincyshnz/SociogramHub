import { useEffect } from 'react';
import Footer from '../Footer';
import { useGetProfile, useGetSuggestedUsers } from '../../../lib/reactQuery/queriesAndMutations';
import { useNavigate } from 'react-router';
import { useError } from '../../../hooks/customHooks';
// import Loader from '../../shared/Loader';
import ProfileCard from '../../shared/ProfileCard';
import { useQueryClient } from '@tanstack/react-query';

const RightSideBar = () => {
  const { handleError } = useError();
  const navigate = useNavigate();
  // Fetch suggested users
  const {
    data: suggestedUsers,
    error: suggestedUserError,
  } = useGetSuggestedUsers();

  // // Fetch Profile Data
  // const {
  //   data: profile,
  //   isPending: isPendingProfile,
  //   error: profileError,
  // } = useGetProfile();

  // Getting loggedin user details from react query cache
  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData(['profile']);

  // Handle errors
  useEffect(() => {
    if (suggestedUserError ) {
      const error = suggestedUserError ;
      handleError('suggestedUsersApiError', { message: error?.response?.data?.message || error?.message });
    }
  }, [suggestedUserError]);


  // Markup
  return (
    <>
      <div className="w-full px-3 md:px-8 mt-6 max-w-[380px] text-center hidden lg:block">
        {/* {isPendingProfile ? <Loader /> : ( */}
          <>
            <ProfileCard userId={profile?._id} imgUrl={profile?.profile_pic} username={profile?.username} subText={profile?.fullname} text="switch" />

            <div className="flex items-center  font-bold text-[14px]">
              <h5 className='flex-1 my-5 text-left text-gray-600'>Suggested for you</h5>
              <a href="#"><h5 className='text-right justify-self-end'>See all</h5></a>
            </div>


            <div className="flex flex-col">
              {suggestedUsers?.map((user, index) => (
                <ProfileCard
                  userId={user._id}
                  key={index}
                  imgUrl={user.profile_pic}
                  username={user.username}
                  subText="Suggested for You."
                  text={"follow"}
                />
              ))}
            </div>
            <div className="w-full pt-16">
              <Footer show='hidden' textColor='text-gray-300' />
            </div>
          </>
        {/* )} */}
      </div>
    </>
  );
}

export default RightSideBar