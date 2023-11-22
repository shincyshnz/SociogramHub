import React from 'react';
import { useGetUserDetails } from '../../lib/reactQuery/queriesAndMutations'

const Profile = () => {
  
  const {
    data: userDetails,
    mutateAsyn: getUserDetails,
    isPending,
    isError,
    error } = useGetUserDetails();

  if (isError) {
    console.log(error?.response?.status === 404) ;
  }
  return (
    <div>{userDetails?.data}</div>
  )
}

export default Profile