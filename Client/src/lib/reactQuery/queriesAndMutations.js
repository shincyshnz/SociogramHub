import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query';
import {
    LoginAPI,
    RegisterAPI,
    GenerateOtpAPI,
    ResetPasswordAPI,
    GetProfileAPI,
    GetUsersAPI,
    GetSuggestedUsersAPI,
    CreatePostsAPI,
    AddCommentsAPI,
    GetPostsAPI,
    FollowUsers,
    UnFollowUsers
} from '../api';

/* ---------------------- Authentication & Authorization -------------------------------- --*/

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (data) => RegisterAPI(data)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (data) => LoginAPI(data)
    })
}

export const useGenerateOtp = () => {
    return useMutation({
        mutationFn: (data) => GenerateOtpAPI(data)
    })
}

export const useResetPassword = () => {
    return useMutation({
        mutationFn: (data) => ResetPasswordAPI(data)
    })
}

/* ---------------------- Users Data ---------------------------------------- --*/

// Get loggedIn user Details
export const useGetProfile = () => {
    const queryClient = useQueryClient(); 

    return useQuery({
        queryKey: ['profile'],
        queryFn: GetProfileAPI,
        client : queryClient,
    });
}

// Search users with username
export const useGetUsers = (searchName = '') => {
    return useQuery({
        queryKey: ['allUsers', searchName],
        queryFn: ({ queryKey }) => GetUsersAPI(searchName),
        enabled: searchName != '',
    });
}

// Random suggestions of users
export const useGetSuggestedUsers = () => {
    return useQuery({
        queryKey: ['suggestedUsers'],
        queryFn: GetSuggestedUsersAPI,
    });
}

/* ---------------------- Post Data ----------------------------------------- --*/

export const useCreatePosts = () => {
    return useMutation({
        mutationFn: (data) => CreatePostsAPI(data)
    });
}

export const useGetPosts = () => {
    return useQuery({
        queryKey: ['allPosts'],
        queryFn: GetPostsAPI,
    });
}

export const useAddComments = ()=>{
    return useMutation({
        mutationFn : (data)=> AddCommentsAPI(data)
    });
}

/* ---------------------- Update Follower list---------------------------------------- --*/

export const useFollowUsers = () => {
    return useMutation({
        mutationFn: (data) => FollowUsers(data)
    });
}

export const useUnFollowUsers = () => {
    return useMutation({
        mutationFn: (data) => UnFollowUsers(data)
    });
}
