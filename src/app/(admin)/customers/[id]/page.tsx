'use client';
import { Customer } from "@/models/Customers";
import { use, useEffect,  useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Contact, Mail, Phone } from "lucide-react";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

interface charData {
    servicios: number;
    creditos: number;
}

const chartConfig = {
    servicios: {
      label: "Servicios",
    },
    creditos: {
      label: "Creditos",
    },
  } satisfies ChartConfig

export default function Page ({ params, }: {params: Promise<{ id: string }>}) {

    const { id } =  use(params);
    const [data, setData] = useState<Customer>();
    const [chartData, setChartData] = useState<charData[]>();
    const [balance, setBalance] = useState<string>('');
    useEffect(() => {
        const url = `/api/customers/byid?id=${id}`;
        const fetchData = async () => {
            const response = await fetch(url);
            return response.json();
        }
        fetchData().then(data => {
            const _chartData = [
                { servicios: data.data[0].services, creditos: data.data[0].credits },
            ];
            const saldo = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(data.data[0].balance);
            setData(data.data[0]);
            setChartData(_chartData);
            setBalance(saldo);
        }).then(() => {});
    }, [id]);
    
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 mb-4">
            <Card>
                <CardHeader>
                    <CardTitle>
                        {data && <h2 className="text-lg font-bold">{data.r_social}</h2>}
                    </CardTitle>
                    <CardDescription className="flex flex-col items-center text-muted-foreground">
                        {data && <p className="text-sm">{data.rfc}</p>}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4 text-muted-foreground">
                    <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        {data && <p className="text-sm">{data.phone}</p>}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        {data && <p className="text-sm">{data.email}</p>}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Contact className="w-4 h-4" />
                        {data && <p className="text-sm">{data.address}</p>}
                    </div>
                </CardContent>
            </Card>
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle className="text-lg font-medium">Balance General</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 items-center pb-0">
                    <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[250px]"
                    >
                    <RadialBarChart
                        data={chartData}
                        endAngle={360}
                        innerRadius={90}
                        outerRadius={120}
                    >
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                        <Label
                            content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                    <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) - 16}
                                    className="fill-foreground text-xl font-bold"
                                    >
                                    {balance}
                                    </tspan>
                                    <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 4}
                                    className="fill-muted-foreground"
                                    >
                                    A Credito
                                    </tspan>
                                </text>
                                )
                            }
                            }}
                        />
                        </PolarRadiusAxis>
                        <RadialBar
                        dataKey="servicios"
                        stackId="a"
                        cornerRadius={5}
                        fill="var(--color-chart-1)"
                        className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                        dataKey="creitos"
                        fill="var(--color-chart-2)"
                        stackId="a"
                        cornerRadius={5}
                        className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
                    </ChartContainer>
                </CardContent>
                </Card>
        </div>
    )
}