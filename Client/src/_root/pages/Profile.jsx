import React, { useEffect } from 'react';
import { Loader } from '../../components'
import { useGetUserDetails } from '../../lib/reactQuery/queriesAndMutations'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const {
    data: userDetails,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error } = useGetUserDetails();

  if (isPending) {
    return <Loader />;
  }

  if (isSuccess) {
    console.log("Success");
  }
  console.log(userDetails);

  return (
    <div className='text-black font-bold text-xl'>{userDetails?.username}</div>
  );
}

export default Profile