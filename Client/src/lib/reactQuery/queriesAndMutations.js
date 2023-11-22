import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query';
import { LoginAPI, registerAPI, GenerateOtpAPI, ResetPasswordAPI, GetUserDetailsAPI } from '../api';

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (data) => registerAPI(data)
    })
}

export const useSignInAccount = (data) => {
    return useMutation({
        mutationFn: (data) => LoginAPI(data)
    })
}

export const useGenerateOtp = (data) => {
    return useMutation({
        mutationFn: (data) => GenerateOtpAPI(data)
    })
}

export const useResetPassword = (data) => {
    return useMutation({
        mutationFn: (data) => ResetPasswordAPI(data)
    })
}

export const useGetUserDetails = ()=>{
    return useQuery({ queryKey: ['userDetails'], queryFn: GetUserDetailsAPI });
}

export const useGetUsers = (searchName) => {

}