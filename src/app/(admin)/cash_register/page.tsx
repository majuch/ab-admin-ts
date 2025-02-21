'use client';
import { ContentLayout } from "@/components/content-layout";
import { DataTableSkeleton } from "@/components/Skeleton/table/data-table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ICashRegister, ICashRegisterBox } from "@/models/CashRegister";
import { IStore } from "@/models/Store";
import React from "react";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function Page() {

    const [dataStore, setDataStore] = useState<IStore[]>();
    const [selectedStore, setSelectedStore] = useState('');
    const [cashRegisterBox, setCashRegisterBox] = useState<ICashRegisterBox[]>();
    const [selectedCashRegisterBox, setSelectedCashRegisterBox] = useState('');
    const [cashRegisterData, setCashRegisterData] = useState<ICashRegister[]>([]);

    useEffect(() => {
        const url = '/api/store/all';
        const fetchData = async () => {
            const response = await fetch(url);
            return response.json();
        }
        fetchData().then(data => {
            setDataStore(data.data);
        }).then(() => {});
    }, []);

    useEffect(() => {
        if (selectedStore) {
            const url = `/api/cashregister/box?store=${selectedStore}`;
            const fetchData = async () => {
                const response = await fetch(url);
                return response.json();
            }
            fetchData().then(data => {
                setCashRegisterBox(data.data);
            }).then(() => {});
        }
    }, [selectedStore]);

    useEffect(() => {
        if (selectedCashRegisterBox) {
            const url = `/api/cashregister/bybox?box=${selectedCashRegisterBox}`;
            const fetchData = async () => {
                const response = await fetch(url);
                return response.json();
            }
            fetchData().then(data => {
                setCashRegisterData(data.data);
            }).then(() => {});
        }
    }, [selectedCashRegisterBox]);

    return (
        <ContentLayout title="Cortes de Caja">
            <h2 className="text-2xl font-bold mb-4">Corte del dia</h2>
            <div className="flex flex-row items-end mb-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="">
                            <span>{dataStore?.find(store => store.id === Number(selectedStore))?.nombre ?? "Seleccionar sucursal"}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuRadioGroup value={selectedStore} onValueChange={setSelectedStore}>
                            {dataStore && dataStore.map((store, index) => (
                                <DropdownMenuRadioItem value={store.id.toString()} key={index}>
                                    <span>{store.nombre}</span>
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                {selectedStore && (<DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-4">
                            <span>{cashRegisterBox?.find(store => store.id_cash_register === Number(selectedCashRegisterBox))?.nombre ?? "Selecciona una caja"}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuRadioGroup value={selectedCashRegisterBox} onValueChange={setSelectedCashRegisterBox}>
                            {cashRegisterBox && cashRegisterBox.map((box, index) => (
                                <DropdownMenuRadioItem value={box.id_cash_register.toString()} key={index}>
                                    <span>{box.nombre}</span>
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>)}
            </div>
            <React.Suspense fallback={
                <DataTableSkeleton
                    columnCount={3}
                    rowCount={10}
                    searchableColumnCount={1}
                    filterableColumnCount={2}
                    cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem", "8rem"]}
                    shrinkZero />
            }>
                <DataTable columns={columns} data={cashRegisterData} />
            </React.Suspense>

        </ContentLayout>
    )
}