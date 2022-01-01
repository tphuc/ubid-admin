

import useSWR from 'swr'
import { supabase } from '..'


const ENDPOINT = 'items'



const fetcher = async (ENDPOINT, filter) => {

    let res = supabase.from(ENDPOINT).select(`
        *,
        category (
            label
        ),
        owner (
            *
        ),
        bids (
            *,
            user:users (
                *
            )
        )
    `, { count: 'exact' })


    for(let k in filter){
        if(filter[k]){
            switch(k){
                case 'label':
                    res = res.filter('label', 'ilike', `%${filter[k]}%`)
                    break
                case 'category':
                    res = res.filter('category', 'eq', parseInt(filter[k]))
                    break
            }
        }
    }

    


    

    return res
   
}

export function useItems(filter) {
    const { data, error, mutate } = useSWR([ENDPOINT, filter], fetcher)
    return {
        mutate,
        data: data?.data || [],
        count: data?.count || 0,
        isLoading: !error && !data,
        isError: error
    }
}
