import { ActionIcon, Button, Group, Table, Text, TextInput, Title } from '@mantine/core';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useCategories } from '../../frameworks/supabase/swr/use-categories';
import { useItems } from '../../frameworks/supabase/swr/use-items';
import { useModals } from '@mantine/modals';
import ItemInfo from '../../components/Items/item-info';
import { deleteItem } from '../../frameworks/supabase/api/items';
import { useNotifications } from '@mantine/notifications';



export default function Items() {
    const { data: categories } = useCategories();
    const { data: items, mutate } = useItems();
    const notifications = useNotifications();
    console.log(items)
    const modals = useModals();

    const openContentModal = (item) => {
        const id = modals.openModal({

            size:"xl",
          title: <Title>Information</Title>,
          children: (
            <ItemInfo data={item}/>
          ),
        });
      };
    


    const openConfirmModal = (item) => {
        
    
        const id = modals.openModal({
            size:"xl",
            title: <Text>Delete Item?</Text>,
            children: (
                <Button onClick={async () => {
                    let res = await deleteItem(item?.id)
                    if(!res.error){
                        mutate()
                        notifications.showNotification({
                            title: 'Delete Item',
                            message: 'Successfully removed item from database',
                          })
                    }
                    // modals.closeModal(id) 
                }} color='red'>Confirm</Button>
            ),
        });
    };

    const rows = items?.map((item) => (
        <tr key={item.id}>
            <td>{item.label}</td>
            <td>{new Date(item?.open_bid).toLocaleString()}</td>
            <td>{new Date(item?.close_bid).toLocaleString()}</td>
            <td>
                <Group>
                <ActionIcon onClick={() => openConfirmModal(item)} color={'red'} variant='hover'>
                    <TrashIcon/>
                </ActionIcon>
                <ActionIcon onClick={() => openContentModal(item)} color={'gray'} variant='hover'>
                    <Pencil2Icon/>
                </ActionIcon>
              
                </Group>
            </td>
        </tr>
    ));

    return <div>
        <Table >
            <thead>
                <tr>
                    <th>Items</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>-</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    </div>
}

Items.getLayout = function getLayout(page) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}