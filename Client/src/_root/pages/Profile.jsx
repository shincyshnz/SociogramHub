import React from 'react';
import { Loader } from '../../components'
import { useGetProfile} from '../../lib/reactQuery/queriesAndMutations'

const Profile = () => {
  const {
    data: profile,
    isPending,
    isSuccess,
    isError,
    error } = useGetProfile();

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
    <div className='text-black font-bold text-xl'>{profile?.username}
    ({profile?.email})</div>
  );
}

export default Profile