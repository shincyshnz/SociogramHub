import PostCards from "./PostCards";
import Stories from "./Stories";

const Home = () => {

    return (
        <>
            <div className='flex flex-col items-center px-2 md:px-10'>
                <Stories />
                <PostCards />
            </div>
        </>
    );
}

export default Home