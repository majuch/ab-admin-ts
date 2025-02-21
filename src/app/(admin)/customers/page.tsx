'use client';
import { ContentLayout } from '@/components/content-layout';
import { ICustomer } from '@/models/Customers';
import React from 'react';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { DataTableSkeleton } from '@/components/Skeleton/table/data-table';

export default function Page () {
    const [data, setData] = React.useState<ICustomer[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/customers/all');
            return response.json();
        }
        fetchData().then(data => {
            setData(data.data);
        }).then(() => {});
    }, []);

    return (
        <ContentLayout title='Clientes'>
            <React.Suspense fallback={
                <DataTableSkeleton
                    columnCount={3}
                    rowCount={10}
                    searchableColumnCount={1}
                    filterableColumnCount={2}
                    cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem", "8rem"]}
                    shrinkZero />
            }>
                <DataTable columns={columns} data={data} />
            </React.Suspense>
        </ContentLayout>
    )
} 