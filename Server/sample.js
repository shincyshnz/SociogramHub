<div className="form-container border py-10 px-1 text-gray-500">
            <img className="max-w-[85%] px-10 mb-4 mx-auto" src="/assets/logo.png" alt="logo" />

            <form className="mx-10 mb-4" onSubmit={handleSubmit(onSubmit)}>
                <h6 className="text-gray-500 mb-4 font-bold">Sign up to see photos and videos from your friends.</h6>
                <button className="flex justify-center items-center gap-2 w-full text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700">
                    <img className="bg-white w-4 h-4" src="assets/facebook_3128304.png" alt="facebook login link" />
                    <span>Log in With Facebook</span>
                </button>
                <div className="flex justify-center items-center gap-4 mb-4">
                    <div className="w-[150px] border-b-[1px] border-gray-300"></div>
                    <h6 className="font-semibold text-gray-500 text-sm">OR</h6>
                    <div className="w-[150px] border-b-[1px] border-gray-300"></div>
                </div>

                <div className="flex flex-col gap-2">
                    <input type="text" id="email" className="input-form" placeholder="Email" {...register("email")} />
                    <input type="text" id="fullname" className="input-form" placeholder="Full Name" {...register("fullname")} />
                    <input type="text" id="username" className="input-form" placeholder="Username" {...register("username")} />
                    <input type="text" id="password" className="input-form" placeholder="Password" {...register("password")} />
                </div>
            </form>

            <div>
                <p className="text-xs px-6 py-2 text-gray-500">People who use our service may have uploaded your contact information to Instagram. <span className="text-blue-900">Learn More</span></p>
            </div>

            <div>
                <p className="text-xs px-6 py-2 text-gray-500">By signing up, you agree to our <span className="text-blue-900">Terms , Privacy Policy <span className="text-gray-500">and</span> Cookies Policy .</span></p>
            </div>

            <div className="w-full px-6 py-2">
                <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700 ">
                    <span>Sign Up</span>
                </button>
            </div>
        </div>

        <div className="form-container w-full border p-6">
            <p className="text-sm">Have an account? <span className="text-blue-600">Log in</span></p>
        </div>

        <div className="form-container my-2">
            <p>Get the app.</p>
            <div className="flex justify-center items-center gap-3 mt-2">
                <img className="w-36" src="/assets/getItONgoogleplay.png" alt="google play" />
                <img className="w-36" src="/assets/getitonPlayStore.png" alt="app store" />
            </div>
        </div>
    </>