import { AppShell, Navbar, Header, Box, ScrollArea } from '@mantine/core';
import React from 'react';
import NavLinks from '../../components/NavLinks';


export default function DashboardLayout({ headerTitle, children }) {
    return (
        <AppShell
            fixed
            style={{ height: '100vh' }}
            padding="md"
            navbar={<Navbar fixed width={{ base: 200 }} height={'100vh'} padding="xs">
                <Navbar.Section grow mt="lg">
                    <NavLinks items={[
                        { label: "categories", path: '/dashboard/categories' },
                        { label: "users", path: '/dashboard/users' }
                    ]} />
                </Navbar.Section>
            </Navbar>}
            header={<Header height={50} title={headerTitle} padding="xs"></Header>}
            styles={(theme) => ({
            })}
        >
            <ScrollArea>
                {children}
            </ScrollArea>
        </AppShell>
    );
}