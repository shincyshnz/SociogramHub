import React from 'react';

export const ProfileCard = ({ imgUrl, username, subText, text = "follow" }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full flex items-center gap-3">
        <a href='#'>
          <img className="w-12 h-12 p-[2px] rounded-full" src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
        </a>
        <div className="flex flex-col items-start justify-center">
          <span className='text-md font-bold'>{username}</span>
          <span className=' text-gray-600'>{subText}</span>
        </div>
        <span className='mx-auto text-blue-700 font-bold'>{text}</span>
      </div>
    </div>
  );
}

const RightSideBar = () => {
  return (
    <div className="w-2/4 px-5 mt-10 max-w-[380px] text-center hidden lg:block">
      <ProfileCard imgUrl="assets/cake.png" username="shincy_raffy" subText="shincy" text="Switch" />

      <h5 className='my-5 text-left text-gray-600 font-bold text-[14px]'>Suggested for you</h5>

      <div className="flex flex-col gap-3">
        <ProfileCard imgUrl="assets/cake.png" username="shincy_raffy" subText="Followed by ..." />
        <ProfileCard imgUrl="assets/cake.png" username="shincy_raffy" subText="Followed by ..." />
        <ProfileCard imgUrl="assets/cake.png" username="shincy_raffy" subText="Followed by ..." />
        <ProfileCard imgUrl="assets/cake.png" username="shincy_raffy" subText="Followed by ..." />
        <ProfileCard imgUrl="assets/cake.png" username="shincy_raffy" subText="Followed by ..." />
      </div>
    </div >
  )
}

export default RightSideBar