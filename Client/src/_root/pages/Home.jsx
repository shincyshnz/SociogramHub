import { RightSideBar } from "../../components";
import { useGetProfile } from "../../lib/reactQuery/queriesAndMutations";
import PostCards from "./PostCards";
import Stories from "./Stories";

const Home = () => {
    const profileData = useGetProfile();

    return (
        <>
            <div className="flex justify-center gap-2 px-2 xl:px-10">
                <div className='flex flex-1 flex-col items-center md:px-2'>
                    <Stories />
                    <PostCards />
                </div>
                <RightSideBar profileData={profileData} />
            </div>
        </>
    );
}

export default Home