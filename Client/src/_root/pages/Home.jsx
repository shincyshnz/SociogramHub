import PostCards from "./PostCards";
import Stories from "./Stories";

const Home = () => {
    return (
        <>
            <div className='flex flex-col justify-center'>
                <Stories />
                <PostCards />
            </div>
        </>
    );
}

export default Home