import { Footer, ModalContainer, RightSideBar } from "../../components";
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
            <div className='mt-10 flex-center flex-col mx-10'>
                <Footer />
            </div>
        </>
    );
}

export default Home