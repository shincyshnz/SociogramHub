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
    GetUserDetailsAPI,
    GetUsersAPI,
    createPostsAPI,
    GetPostsAPI,
} from '../api';

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

export const useGetUserDetails = () => {
    return useQuery({
        queryKey: ['userDetails'],
        queryFn: GetUserDetailsAPI,
        // retry: false,
    });
}

export const useGetUsers = (searchName = '') => {
    return useQuery({
        queryKey: ['allUsers', searchName],
        queryFn: ({ queryKey }) => GetUsersAPI(searchName),
        enabled: searchName != '',
    });
}

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