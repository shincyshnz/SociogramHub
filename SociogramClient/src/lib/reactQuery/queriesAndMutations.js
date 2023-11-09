import { 
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query';
import { LoginAPI, registerAPI, ChangePasswordAPI } from '../api';

export const useCreateUserAccount = ()=>{
    return useMutation({
        mutationFn : (data)=> registerAPI(data)
    })
}

export const useSignInAccount = (data)=>{
    return useMutation({
        mutationFn : (data)=> LoginAPI(data)
    })
}

export const useChangePassword = (data)=>{
    return useMutation({
        mutationFn : (data)=> ChangePasswordAPI(data)
    })
}
