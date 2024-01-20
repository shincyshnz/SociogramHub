import { RightSideBar } from "../../components";
import PostCards from "./PostCards";
import Stories from "./Stories";

const Home = () => {

    return (
        <>
            <div className="flex justify-center gap-2">
                <div className='flex flex-1 flex-col items-center px-2 md:px-5 lg:px-20'>
                    <Stories />
                    <PostCards />
                </div>
                <RightSideBar />
            </div>
        </>
    );
}

export default Home