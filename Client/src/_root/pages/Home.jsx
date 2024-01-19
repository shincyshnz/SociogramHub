import PostCards from "./PostCards";
import Stories from "./Stories";

const Home = () => {

    return (
        <>
            <div className='flex flex-col items-center px-2 md:px-5 xl:px-20'>
                <Stories />
                <PostCards />
            </div>
        </>
    );
}

export default Home