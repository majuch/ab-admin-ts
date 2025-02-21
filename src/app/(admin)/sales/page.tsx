'use client';
import { ContentLayout } from "@/components/content-layout";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IStore } from "@/models/Store";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { es } from "date-fns/locale";
import { ISale } from "@/models/Sale";
import React from "react";
import { DataTableSkeleton } from "@/components/Skeleton/table/data-table";
import { DataTable } from "./data-table";
import { columns } from "./columns";


export default function Page() {

    const [dataStore, setDataStore] = useState<IStore[]>();
    const [selectedStore, setSelectedStore] = useState('');
    const [date, setDate] = useState<DateRange | undefined>({
        from: addDays(new Date(), -20),
        to: new Date(),
      });
    const [sales, setSales] = useState<ISale[]>([]);

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
            const from = date?.from ? format(date.from, "yyyy-MM-dd") : '';
            const to = date?.to ? format(date.to, "yyyy-MM-dd") : '';
            const url = `/api/sales/all?store=${selectedStore}&from=${from}&to=${to}`;

            const fetchData = async () => {
                const response = await fetch(url);
                return response.json();
            }
            fetchData().then(data => {
                setSales(data.data);
            }).then(() => {});
        }
    }, [selectedStore, date]);

    return (
        <ContentLayout title="Ventas">
            <h2 className="text-2xl font-bold mb-4">Historial de Ventas</h2>
            <div className="flex gap-4 mb-4">
                <Popover >
                    <div className="">
                        <PopoverTrigger asChild>
                            <div>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                    "w-[300px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon />
                                    {date?.from ? (
                                    date.to ? (
                                        <>
                                        {format(date.from, "dd-MM-yy")} -{" "}
                                        {format(date.to, "dd-MM-yy")}
                                        </>
                                    ) : (
                                        format(date.from, "dd-MM-yy")
                                    )
                                    ) : (
                                    <span>Pick a date</span>
                                    )}
                                </Button>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <div>
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                                locale={es}
                            />
                            </div>
                        </PopoverContent>
                    </div>
                </Popover>
                <div className="flex gap-4 items-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div>
                                <Button variant="outline" className="ml-auto">
                                    <span>{dataStore?.find(store => store.id === Number(selectedStore))?.nombre ?? "Seleccionar sucursal"}</span>
                                </Button>
                            </div>
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
                </div>
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
                <DataTable columns={columns} data={sales} />
            </React.Suspense>
        </ContentLayout>
    )
}