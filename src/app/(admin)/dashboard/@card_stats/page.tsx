import React from 'react';
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card';
import { CreditCard, DollarSign, Ticket, Wrench } from 'lucide-react';

export default function Page() {
    return (
    <>
            <h2 className='text-3xl font-bold tracking-tight mb-4'>Bienvenido John Doe 👋</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Total Ventas
                        </CardTitle>
                        <DollarSign className='w-6 h-6' />
                    </CardHeader>
                    <CardContent>
                        <div className='flex items-center text-2xl font-bold'>
                            $ 45,231.89
                        </div>
                        <p className='text-sm text-muted-foreground'>
                            +20.1% del mes pasado
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Total Creditos
                        </CardTitle>
                        <CreditCard className='w-6 h-6' />
                    </CardHeader>
                    <CardContent>
                        <div className='flex items-center text-2xl font-bold'>
                            $ 12,231.89
                        </div>
                        <p className='text-sm text-muted-foreground'>
                            +20.1% del mes pasado
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Notas
                        </CardTitle>
                        <Ticket className='w-6 h-6' />
                    </CardHeader>
                    <CardContent>
                        <div className='flex items-center text-2xl font-bold'>
                            10,231
                        </div>
                        <p className='text-sm text-muted-foreground'>
                            +20.1% del mes pasado
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Servicios Mecanicos
                        </CardTitle>
                        <Wrench className='w-6 h-6' />
                    </CardHeader>
                    <CardContent>
                        <div className='flex items-center text-2xl font-bold'>
                            1,231
                        </div>
                        <p className='text-sm text-muted-foreground'>
                            +20.1% del mes pasado
                        </p>
                    </CardContent>
                </Card>
            </div>
    </>);
};
