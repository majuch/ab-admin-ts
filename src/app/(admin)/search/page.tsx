'use client';

import React, { useEffect, useState } from 'react';
import { ContentLayout } from '../../../components/content-layout';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useSearchArticles } from '@/hooks/useSearchArticles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { IPriceList } from '@/models/PriceList';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { PackageOpen } from 'lucide-react';
import useSearchStore from '@/hooks/useSearchStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const FormSchema = z.object({
  search: z.string().nonempty(),
  price: z.string().nonempty(),
});

export default function Page() {

  const { search, priceList, setPrice, setSearch, fetchData, isLoading } = useSearchArticles();
  const [pricesList, setPricesList] = useState<IPriceList[]>([]);
  const articulos = useSearchStore(useSearchArticles, (state) => state.articles);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: search,
      price: priceList,
    },
  });

  async function onSubmit (data: z.infer<typeof FormSchema>) {
    try {
        console.log("Buscando...");
        setSearch(data.search);
        setPrice(data.price);
        await fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchPricesList = async () => {
      const response = await fetch('/api/pricelist/tolist');
      const data = await response.json();
      setPricesList(data.data);
    };
    fetchPricesList();
  }, []);


  return (
    <ContentLayout title='Buscar articulos'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Buscar articulos</h2>
      </div>
      <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
        <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 items-center md:grid-cols-3'>
              <FormField
                control={form.control}
                name='search'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Buscar articulos' {...field}/>
                    </FormControl>
                  </FormItem>
                )}/>
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field?.value.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Selecciona una lista de precios'/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {pricesList.map((priceList) => (
                            <SelectItem key={priceList.id} value={priceList.nombre}>{priceList.nombre}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}/>
                <Button variant='secondary' type='submit'>Buscar</Button>
            </form>
          </Form>
        </div>
      </div>
      <Separator className='shadow'/>
      {isLoading && <p>Cargando...</p>}
      <ul className='mt-4 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {articulos?.map((article) => (
          <li key={article.id} className=''>
              <Card>
              <Link href={`/search/${article.id}`}>
                <CardHeader className=''>
                  <CardTitle className='text-xl font-medium truncate'>
                    {article.code}
                  </CardTitle>
                  <CardDescription className='text-sm text-muted-foreground'>
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex flex-row justify-between items-center gap-2'>
                  <div className='flex items-center text-2xl font-bold'>
                    {article.price.find((p) => p.lista === priceList)?.price ?? article.price[0].price}
                  </div>
                  <Badge variant='outline' className='text-md gap-6'>
                    <PackageOpen className='w-4 h-4'/>
                    {article.global_qty}
                  </Badge>
                </CardContent>
              </Link>
              </Card>
          </li>
        ))}
      </ul>
    </ContentLayout>
  );
}