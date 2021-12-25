import router, { useRouter } from 'next/router';
import React, { useState } from 'react'
// imports
import { Box, List } from '@mantine/core';


// item {
//     path,
//     id,
//     label
// }


function NavLinkItem({
    data,
    onChange = () => { }
}) {
    const router = useRouter()
    const [expand, setExpand] = useState(false);

    const handleClick = React.useCallback(() => {
        if (data?.children?.length) {
            setExpand(!expand)
        }
        else {
            onChange(data)
        }

    }, [expand, onChange, data])

    const isMatchPath = () => {
        return router.pathname.includes(data?.path)
    }

    return <>
        <Box    
            onClick={handleClick}
            sx={(theme) => ({
                backgroundColor: isMatchPath() ? theme.colors.gray[1] : 'transparent',
                padding: theme.spacing.xs,
                paddingLeft: theme.spacing.xl,
                paddingRight: theme.spacing.xl,
                borderRadius: theme.radius.md,
                cursor: 'pointer',
                transition:"0.2s ease",
                '&:hover': {
                    backgroundColor: theme.colors.gray[0],
                },
            })}
        >
            {data.label}
        </Box>
        {expand && data.children?.map((_data, id) => <NavLinkItem key={id} item={data} onChange={onChange} />)}
    </>

}

function NavLinks({
    items,
    onChange
}) {
    const router = useRouter()
    return <div>
        {items?.map((item, id) => <NavLinkItem key={id} data={item} onChange={(data) => { router.push(data.path)}}  />)}
    </div>
}


export default NavLinks