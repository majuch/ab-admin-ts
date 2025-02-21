'use client';
import { use, useState, useEffect, useContext } from "react";
import { ContentLayout } from "@/components/content-layout";
import { Article, ArticleCart } from "@/models/Article";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IPriceList } from "@/models/PriceList";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/useCartStore";
import NotificationContext from "@/context/NotificationContext";

export default function Page({ params }: { params: Promise<{ id: string }> }) {

    const { id } =  use(params);
    const [data, setData] = useState<Article>();
    const [pricesList, setPricesList] = useState<IPriceList[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const AddToCart = useCartStore((state) => state.addArticle);
    const { showNotification } = useContext(NotificationContext);

    useEffect(() => {
        const url = `/api/articles/byId?id=${id}`;
        const fetchData = async () => {
            const response = await fetch(url);
            return response.json();
        }
        fetchData().then(data => {

            const articleData = data.data.map((article: Article) => {
                const prices = article.price.split("||").map((p: string) => {
                    const [lista, price] = p.split("~");
                    const precio = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(price.trim()));
                    return { lista: lista.trim(), price: precio };
                });
                const exists = article.current_qty.split("||").map((e: string) => {
                    const [branch, quantity] = e.split("~");
                    return { branch: branch.trim(), quantity: parseFloat(quantity.trim()).toFixed(2) };
                });
                return { ...article, price: prices, current_qty: exists, precios: prices };
            }) as Article[];

            setData(articleData[0]);
        }).then(() => { });
    }
    , [id]);

    useEffect(() => {
    const fetchPricesList = async () => {
        const response = await fetch('/api/pricelist/tolist');
        const data = await response.json();
        setPricesList(data.data);
    };
    fetchPricesList();
    }, []);

    function handleClicked() {
        try{
            if (!data) return;
            const price = data.precios?.find((p) => p.lista === selectedPrice);
            const article: ArticleCart = {
                id: data.id,
                code: data.code,
                description: data.description,
                price: price ? parseFloat(price.price.replace(/[^0-9.-]+/g,"")) : 0,
            };
            AddToCart(article, quantity);
            showNotification({
                msj: 'Articulo agregado al carrito',
                open: true,
                status: 'success'
            });
        }
        catch (error) {
            console.error(error);
        } 
    }

    return (
        <ContentLayout title="Detalle del articulo">
            <div className="flex flex-col gap-4 text-muted-foreground">
                {data && <h2 className="text-2xl font-bold">{data.code}</h2>}
                {data && <p className="text-sm">{data.description}</p>}
                <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
                    <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
                        <Input type="number" placeholder='Unidades' value={quantity} onChange={(e) => setQuantity(parseFloat(e.target.value))}/>
                        <Select onValueChange={setSelectedPrice} defaultValue={selectedPrice}>
                            <SelectTrigger>
                                <SelectValue placeholder='Selecciona una lista de precios'/>
                            </SelectTrigger>
                            <SelectContent>
                            {pricesList.map((priceList) => (
                                <SelectItem key={priceList.id} value={priceList.nombre}>{priceList.nombre}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <Button variant='secondary' onClick={handleClicked}>Agregar al carrito</Button>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 mb-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {data && <h2 className="text-lg font-bold">Existencias</h2>}
                            </CardTitle>
                        </CardHeader>
                        <CardDescription className="flex flex-col text-muted-foreground">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Sucursal</TableHead>
                                        <TableHead className="text-right">Cantidad</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data && data.existencias?.map((branch, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{branch.branch}</TableCell>
                                            <TableCell className="text-right">{branch.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardDescription>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {data && <h2 className="text-lg font-bold">Precios</h2>}
                            </CardTitle>
                        </CardHeader>
                        <CardDescription className="flex flex-col text-muted-foreground">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Lista</TableHead>
                                        <TableHead className="text-right">Precio</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data && data.precios?.map((price, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{price.lista}</TableCell>
                                            <TableCell className="text-right">{price.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardDescription>
                    </Card>
                </div>
            </div>
        </ContentLayout>
    );
}