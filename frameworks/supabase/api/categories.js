import { supabase } from "..";

export async function updateCategory(id, data){
    let res  = await supabase.from('categories').update(data).match({id})
    return res;
}

export async function addCategory(data){
    let res = await supabase.from('categories').insert([data])
    return res
}


export async function deleteCategory(id){
    let res  = await supabase.from('categories').delete().match({id})
    return res;
}