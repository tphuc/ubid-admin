import { ActionIcon, Box, Button, Group, Space, Table, Text, TextInput } from '@mantine/core';
import { Pencil2Icon, TrashIcon, PlusIcon } from '@radix-ui/react-icons';
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useCategories } from '../../frameworks/supabase/swr/use-categories';
import { useModals } from '@mantine/modals';
import { useForm } from '@mantine/hooks';
import { addCategory, deleteCategory, updateCategory } from '../../frameworks/supabase/api/categories';
import { useNotifications } from '@mantine/notifications';



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
    const { data: categories, mutate } = useCategories()
    const modals = useModals();
    const notifications = useNotifications()




    const openEditModal = ({ item, initialValues }) => {
        const id = modals.openModal({
            title: 'Update',
            children: (
                <EditForm
                    onSubmit={async (values) => {
                        console.log(values)
                        let res = await updateCategory(item.id, values);
                        if (!res.error) {
                            mutate();
                            modals.closeModal(id)
                            notifications.showNotification({
                                title: 'Update category',
                                message: 'Successfully update category',
                            })
                        }
                    }}
                    initialValues={initialValues} />
            ),
        });
    };

    const openAddModal = ({ initialValues }) => {
        const id = modals.openModal({
            title: 'Add category',
            children: (
                <EditForm
                    onSubmit={async (values) => {
                        let res = await addCategory(values)
                        if (!res.error) {
                            mutate();
                            modals.closeModal(id)
                            notifications.showNotification({
                                title: 'Add category',
                                message: 'Successfully add category',
                            })
                        }
                    }}
                    initialValues={initialValues} />
            ),
        });
    };

    const openDeleteConfirm = ({ item }) => modals.openConfirmModal({
        title: 'Please confirm delete',
        labels: { confirm: 'Confirm', cancel: "Cancel" },
        onConfirm: async () => {
            let res = await deleteCategory(item.id);
            if (!res.error) {
                mutate();
                notifications.showNotification({
                    title: 'delete category',
                    message: 'Successfully delete category',
                })
            }
        },
    });

    const rows = categories?.map((item) => (
        <tr key={item.id}>
            <td>{item.label}</td>
            <td>
                <Group>
                    <ActionIcon onClick={() => {
                        openDeleteConfirm({
                            item,
                        })
                    }} color={'red'} variant='hover'>
                        <TrashIcon />
                    </ActionIcon>
                    <ActionIcon onClick={() => {
                        openEditModal({
                            item,
                            initialValues: {
                                label: item.label
                            }
                        })
                    }} color={'gray'} variant='hover'>
                        <Pencil2Icon />
                    </ActionIcon>

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
        <Table >
            <thead>
                <tr>
                    <th>Label</th>
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