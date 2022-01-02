import { ActionIcon, Badge, Box, Button, Chip, Group, Paper, Space, Table, Text, TextInput } from '@mantine/core';
import { Pencil2Icon, TrashIcon, PlusIcon } from '@radix-ui/react-icons';
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useCategories } from '../../frameworks/supabase/swr/use-categories';
import { useModals } from '@mantine/modals';
import { useForm } from '@mantine/hooks';
import { addCategory, deleteCategory, updateCategory } from '../../frameworks/supabase/api/categories';
import { useNotifications } from '@mantine/notifications';
import { useUsers } from '../../frameworks/supabase/swr/use-users';
import { updateUserById } from '../../frameworks/supabase/api/users';



const EditForm = ({
    initialValues = {},
    onSubmit = () => { },
}) => {

    const form = useForm({
        initialValues,
    });


    return <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput {...form.getInputProps('label')} label="Label" />
        <Space />
        <Button type="submit">Submit</Button>
    </form>
}

const AddForm = ({
    initialValues = {},
    onSubmit = () => { },
}) => {

    const form = useForm({
        initialValues,
    });


    return <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput {...form.getInputProps('label')} label="Label" />
        <Space />
        <Button type="submit">Submit</Button>
    </form>
}

export default function Categories() {

    const { data: users, mutate} = useUsers()
    const modals = useModals();
    const notifications = useNotifications()


    const rows = users?.map((item) => (
        <tr key={item.id}>
            <td>{item.full_name}</td>
            <td>{item.email}</td>
            <td>{ item?.seller  && <Badge color='yellow' variant='outline'>Seller</Badge>} <Badge color='indigo' variant='outline'>Buyer</Badge></td>
            <td>
                <Group>
                    {item?.upgrade_seller && <Button onClick={async () => {
                        let res = await updateUserById(item?.id, { seller: true, upgrade_seller: false})
                        if(!res.error){
                          notifications.showNotification({
                            message:"Upgrade seller success"
                          })
                          mutate()
                        }
                    }} color='yellow' compact variant='outline'>Upgrade to seller</Button>}

                    {item?.seller && <Button onClick={async () => {
                        let res = await updateUserById(item?.id, { seller: false })
                        if(!res.error){
                          notifications.showNotification({
                            message:"Revoke seller permission success"
                          })
                          mutate()
                        }
                    }}  color='red' compact variant='outline'>Revoke seller permission</Button>}
                </Group>
            </td>
        </tr>
    ));

    return <Box>
        <Button onClick={() => {
            openAddModal({
                initialValues: {
                    label: ''
                }
            })
        }}
            rightIcon={<PlusIcon />} style={{ float: "right", marginRight: '2em' }}>Add</Button>

        <Table  >
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>-</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    </Box>
}

Categories.getLayout = function getLayout(page) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}