'use client';
import React, { use } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { ICreditCustomer } from "@/models/Customers";

export default function Page({ params, }: {params: Promise<{ id: string }>}) {

    const { id } =  use(params);
    const [data, setData] = React.useState<ICreditCustomer[]>([]);
    
    React.useEffect(() => {
        const url = `/api/customers/credits?id=${id}`;
        const fetchData = async () => {
            const response = await fetch(url);
            return response.json();
        }
        fetchData().then(data => {
            setData(data.data);
        }).then(() => {});
    }, [id]);

    return (
        <div>
            <React.Suspense fallback={<div>Loading...</div>}>
                <DataTable columns={columns} data={data} />
            </React.Suspense>
        </div>
    )
}