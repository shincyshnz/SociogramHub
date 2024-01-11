import Stories from "./Stories";

const Home = () => {
    return (
        <>
            <div className='w-full flex flex-col'>
                <Stories />
                <div>posts</div>
            </div>
        </>
    );
}

export default Home