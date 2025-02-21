import { ContentLayout } from '@/components/content-layout';
import React from 'react';

export default function Layout({ 
    children, 
    bar_stats 
    }: { 
    children: React.ReactNode
    bar_stats: React.ReactNode
}) {
    return (
        <ContentLayout title='Dashboard'>
            {children}
            {bar_stats}
        </ContentLayout>
    )
}