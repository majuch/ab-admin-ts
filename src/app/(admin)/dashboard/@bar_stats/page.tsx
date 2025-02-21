'use client';

import React from "react";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent,  CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis} from "recharts";
import { BarChartBig } from "lucide-react";

const chartData = [
    { name: 'Enero', ventas: 4000, servicios: 2400, amt: 2400 },
    { name: 'Febrero', ventas: 3000, servicios: 1398, amt: 2210 },
    { name: 'Marzo', ventas: 2000, servicios: 9800, amt: 2290 },
    { name: 'Abril', ventas: 2780, servicios: 3908, amt: 2000 },
    { name: 'Mayo', ventas: 1890, servicios: 4800, amt: 2181 },
    { name: 'Junio', ventas: 2390, servicios: 3800, amt: 2500 },
    { name: 'Julio', ventas: 3490, servicios: 4300, amt: 2100 },
    { name: 'Agosto', ventas: 3490, servicios: 4300, amt: 2100 },
    { name: 'Septiembre', ventas: 3490, servicios: 4300, amt: 2100 },
    { name: 'Octubre', ventas: 3490, servicios: 4300, amt: 2100 },
    { name: 'Noviembre', ventas: 3490, servicios: 4300, amt: 2100 },
    { name: 'Diciembre', ventas: 3490, servicios: 4300, amt: 2100 },
];

const chartConfig = {
    ventas: {
        label: 'Ventas',
    },
    servicios: {
        label: 'Servicios',
    },
 } satisfies ChartConfig;

export default function Page() {

    return (
        <Card className="mt-4">
            <CardHeader className='flex flex-row items-strech space-y-0 border-b pb-6 sm:flex-row'>
                <BarChartBig className='w-6 h-6 mr-2' />
                <CardTitle className='text-lg font-normal'>
                    Balance General
                </CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
                    <BarChart accessibilityLayer data={chartData} barGap="7%">
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey='name' 
                              tickLine={false}
                              tickMargin={10}
                              axisLine={false}
                              tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis 
                         stroke="#888888"
                         fontSize={12}
                         tickLine={false}
                         axisLine={false}
                         tickFormatter={(value) => `$${value}`}
                         />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey='ventas' stackId="a" fill='var(--color-chart-1)' radius={[0, 0, 10, 10]}/>
                        <Bar dataKey='servicios' stackId="a" fill='var(--color-chart-2)' radius={[10, 10, 0, 0]}/>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Mostrando el total de ventas y servicios de los últimos 12 meses
                </div>
            </CardFooter>
        </Card>
    );
}