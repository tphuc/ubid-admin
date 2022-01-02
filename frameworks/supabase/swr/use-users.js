

import useSWR from 'swr'
import { supabase } from '..'


const ENDPOINT = 'users'



const fetcher = async (ENDPOINT) => {
    let res = await supabase.from(ENDPOINT).select('*')
    return res.data
   
}

export function useUsers() {
    const { data, error, mutate } = useSWR([ENDPOINT], fetcher)
    return {
        mutate,
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
