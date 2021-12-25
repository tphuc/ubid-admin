

import useSWR from 'swr'
import { supabase } from '..'



const ENDPOINT = 'items'



const fetcher = async (ENDPOINT, id) => {

    let res = await supabase.from(ENDPOINT).select(`
        *,
        category (
            label
        ),
        owner (
            *
        ),
        bids (
            *
        )
    `, { count: 'exact' })
    .filter('owner', 'eq', id)
    

    return res
   
}

export function useOnsale(id) {
    const { data, error, mutate } = useSWR([ENDPOINT, id], fetcher)
    return {
        mutate,
        data: data?.data || [],
        count: data?.count || 0,
        isLoading: !error && !data,
        isError: error
    }
}
