import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query';
import { LoginAPI, registerAPI, GenerateOtpAPI, ResetPasswordAPI, getUserDetailsAPI } from '../api';
import { useDebounce } from '../../hooks/customHooks';

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

export const useGetUserDetails = (token) => {
    return useMutation({
        mutationFn: (token) => getUserDetailsAPI(token)
    })
}

export const useGetUsers = (searchName) => {

}