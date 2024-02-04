import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query';
import {
    LoginAPI,
    registerAPI,
    GenerateOtpAPI,
    ResetPasswordAPI,
    GetProfileAPI,
    GetUsersAPI,
    GetSuggestedUsersAPI,
    createPostsAPI,
    GetPostsAPI,
} from '../api';

/* ---------------------- Authentication & Authorization -------------------------------- --*/

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (data) => registerAPI(data)
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
    return useQuery({
        queryKey: ['profile'],
        queryFn: GetProfileAPI,
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
export const useSuggestedUsers = () => {
    return useQuery({
        queryKey: ['suggestedUsers'],
        queryFn: GetSuggestedUsersAPI,
    });
}

/* ---------------------- Post Data ----------------------------------------- --*/

export const useCreatePosts = () => {
    return useMutation({
        mutationFn: (data) => createPostsAPI(data)
    });
}

export const useGetPosts = () => {
    return useQuery({
        queryKey: ['allPosts'],
        queryFn: GetPostsAPI,
    });
}