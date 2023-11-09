import { 
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query';
import { LoginAPI, registerAPI } from '../api';

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