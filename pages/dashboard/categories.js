import { ActionIcon, Button, Group, Table, Text, TextInput } from '@mantine/core';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useCategories } from '../../frameworks/supabase/swr/use-categories';
import { useModals } from '@mantine/modals';



export default function Categories() {
    const { data: categories } = useCategories()
    const modals = useModals();

    const openContentModal = () => {
        const id = modals.openModal({
          title: 'Subscribe to newsletter',
          children: (
            <>
              <TextInput label="Your email" />
              <Button fullWidth onClick={() => modals.closeModal(id)}>
                Submit
              </Button>
            </>
          ),
        });
      };

    const rows = categories?.map((item) => (
        <tr key={item.id}>
            <td>{item.label}</td>
            <td>
                <Group>
                <ActionIcon color={'red'} variant='hover'>
                    <TrashIcon/>
                </ActionIcon>
                <ActionIcon onClick={openContentModal} color={'gray'} variant='hover'>
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
                    <th>Label</th>
                    <th>-</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    </div>
}

Categories.getLayout = function getLayout(page) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}