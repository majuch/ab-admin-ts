import { ContentLayout } from '@/components/content-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from 'react';

export default function LayoutCustomer({ 
    children, 
    table_credits,
    table_services, 
    }: { 
    children: React.ReactNode;
    table_credits: React.ReactNode;
    table_services: React.ReactNode;
}) {
    return (
        <ContentLayout title='Cliente'>
            {children}
            <div className="">
                <Tabs defaultValue="credits">
                    <TabsList>
                        <TabsTrigger value="credits">Creditos</TabsTrigger>
                        <TabsTrigger value="services">Servicios</TabsTrigger>
                    </TabsList>
                    <TabsContent value="credits">
                        {table_credits}
                    </TabsContent>
                    <TabsContent value="services">
                        {table_services}
                    </TabsContent>
                </Tabs>
            </div>
        </ContentLayout>
    )
}