import { RightSideBar } from "../../components";
import PostCards from "./PostCards";
import Stories from "./Stories";

const Home = () => {
    return (
        <>
            <div className="flex justify-center gap-2 px-2 xl:px-10">
                <div className='flex flex-1 flex-col items-center md:px-2'>
                    <Stories />
                    <PostCards />
                </div>
                <RightSideBar />
            </div>
        </>
    );
}

export default Home