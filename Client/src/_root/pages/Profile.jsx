import React from 'react';
import { Loader } from '../../components'
import { useGetUserDetails } from '../../lib/reactQuery/queriesAndMutations'

const Profile = () => {
  const {
    data: userDetails,
    isPending,
    isSuccess,
    isError,
    error } = useGetUserDetails();

  if (isPending) {
    return <Loader />;
  }

  // if (isSuccess) {
  //   console.log("Success");
  // }

  if (isError) {
    console.log(error);
  }

  return (
    <div className='text-black font-bold text-xl'>{userDetails?.username}
    ({userDetails?.email})</div>
  );
}

export default Profile