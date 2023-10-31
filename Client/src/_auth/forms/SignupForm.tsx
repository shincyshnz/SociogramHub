const SignupForm = () => {
    return <>
        <div className="max-w-[350px] max-h-[920px] text-center border py-10 px-1 mb-1">
            <h1 className="h1-bold font-dancing mb-[10px] text-gray-700">SociogramHub</h1>

            <form className="mx-10 mb-[10px]">
                <h6 className="text-gray-500 mb-[10px] font-bold">Sign up to see photos and videos from your friends.</h6>
                <button className="flex justify-center items-center gap-2 w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <img className="bg-white w-4 h-4" src="assets/facebook_3128304.png" alt="facebook login link" />
                    <span>Log in With Facebook</span>
                </button>
                <div className="flex justify-center items-center gap-4 mb-[10px]">
                    <div className="w-[150px] h-[0px] border-b-2 border-gray-300"></div>
                    <h6 className="font-bold text-gray-500 text-sm">OR</h6>
                    <div className="w-[150px] h-[0px] border-b-2 border-gray-300"></div>
                </div>

                <div className="flex flex-col gap-2">
                    <input type="text" className="input-form" placeholder="Mobile Number or Email" />
                    <input type="text" className="input-form" placeholder="Full Name" />
                    <input type="text" className="input-form" placeholder="Username" />
                    <input type="text" className="input-form" placeholder="Password" />
                </div>
            </form>

            <div >
                <p className="text-xs px-6 py-2 text-gray-500">People who use our service may have uploaded your contact information to Instagram. <span className="text-blue-900">Learn More</span></p>
            </div>

            <div >
                <p className="text-xs px-6 py-2 text-gray-500">By signing up, you agree to our <span className="text-blue-900">Terms , Privacy Policy <span className="text-gray-500">and</span> Cookies Policy .</span></p>
            </div>
            <div className="w-full px-6 py-2">
                <button className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <span>Sign Up</span>
                </button>
            </div>
        </div>


        <div className="max-w-[437px] max-h-[920px] w-full text-center border p-6">
            <p className="text-sm">Have an account? <span className="text-blue-600">Log in</span></p>
        </div>
    </>
}

export default SignupForm