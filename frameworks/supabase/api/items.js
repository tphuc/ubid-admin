import { supabase } from "..";

export async function uploadFile(file){
    let _ = await supabase.storage.from('public').upload(`${file.name}`, file)
    let { publicURL } = await supabase.storage.from('public').getPublicUrl(`${file.name}`)
    return {
        name: file.name,
        url: publicURL
    }
};

export  async function createItem(_data){
    const { file, ...rest } = _data;
    let file_uploaded = await uploadFile(file[0])
    let id = await supabase.auth.user().id
    let res = await supabase.from('items').insert({
        owner: id,
        images: [file_uploaded],
        ...rest
    })
    return res
}

export async function getAllItems(){
    let res = await supabase.from('items').select(`*, 
        category (
            *
        ),
        owner (
            *
        ),
        bids (
            *
        )
    `)
    return res
}

export async function getItem(id){
    let res = await supabase.from('items').select(`*, 
        category (
            *
        ),
        owner (
            *
        ),
        bids (
            *
        )
    `).match({id})

    return res
}


export async function deleteItem(id){
    let res = await supabase.from('items').delete().match({id})
    return res;
}