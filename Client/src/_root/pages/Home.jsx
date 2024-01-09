import Stories from "./Stories";

const Home = () => {
    return (
        <>
            <div className='flex flex-col items-center gap-3'>
                <div><Stories /></div>
                <div>posts</div>
            </div>

            <div className='hidden lg:block'>Right SideBar</div>
        </>
    );
}

export default Home