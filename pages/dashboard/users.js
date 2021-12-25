import { Text } from '@mantine/core';
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';


export default function Users(){
    return <div>
        <Text>Users</Text>
        
    </div>
}

Users.getLayout = function getLayout(page) {
    return (
      <DashboardLayout>
        {page}
      </DashboardLayout>
    )
  }