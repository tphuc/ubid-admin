import { Box, Image, Paper, Space, Tabs, Text } from '@mantine/core';
import React from 'react';

import { formatNumber } from '../../utils'

export default function ItemInfo({ data }) {

    return <Box>
        <Tabs tabPadding='xl'>
            <Tabs.Tab  label="Basic" >

                <Text color="dimmed">Name</Text>
                <Text>{data.label}</Text>
                <Space />
                <Text color="dimmed">Category</Text>
                <Text>{data?.category?.label}</Text>
                <Space />
                <Text color="dimmed">Open</Text>
                <Text>{new Date(data.open_bid).toLocaleString()}</Text>
                <Space />
                <Text color="dimmed">Closing</Text>
                <Text>{new Date(data.close_bid).toLocaleString()}</Text>
                <Space />
                <Text color="dimmed">Images</Text>
                <Box
                    sx={(theme) => ({
                        display: 'flex',
                        flexDirection: "row",
                        flexWrap: "wrap",
                    })}>
                    <Image width={120} height={120} alt='' src={data.images[0].url}></Image>
                </Box>

                <Space />
                <Text color="dimmed">Description</Text>
                <Text>{data?.description}</Text>

            </Tabs.Tab>
                
            <Tabs.Tab label="Bid history" >
                {!data?.bids?.length && <Text color='dimmed'>No bids found</Text>}
                {data?.bids?.map((item, id) => <Box my='0.5em'  key={id}>
                    <Text color='dimmed'>{new Date(item?.created_at).toLocaleString()}</Text>
                    <Text ><b>{item?.user?.full_name}</b> placed {formatNumber(item?.amount)} </Text>
                    </Box>)}
            </Tabs.Tab>

        </Tabs>


    </Box>
}


