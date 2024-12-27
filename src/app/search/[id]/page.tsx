import { Article } from '@/models/Article';
import { notFound } from 'next/navigation';

async function getArticle(id: string) {
    const response = await fetch(`http://localhost:3000/api/articles/byId?id=${id}`);
    const { data } = await response.json();
    
    if (!data) notFound();

    const articleData = data.map((article: Article) => {
        const prices = article.price.split("||").map((p: string) => {
            const [lista, price] = p.split("~");
            const precio = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(price.trim()));
            return { lista: lista.trim(), price:precio };
        });
        const exists = article.current_qty.split("||").map((e: string) => {
            const [branch, quantity] = e.split("~");
            return { branch: branch.trim(), quantity: parseFloat(quantity.trim()).toFixed(2) };
        });
        return { ...article, price: prices, current_qty: exists };
    });

    return articleData[0];
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const article = await getArticle(id);

    return (
        <div className='justify-center items-center pt-6 pl-2 mx-auto'>
            <h1 className='mb-2 text-2xl font-semibold text-gray-900 dark:text-white'>
                {article.code}
            </h1>
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
               <p>{article.description}</p>
            </div>
            <div className='flex flex-col items-start mt-6 space-y-6 sm:flex-row sm:space-x-6 sm:space-y-0'>
                <div className='w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
                    <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
                        Existencias
                    </h5>
                    <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>
                                    Sucursal
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Cantidad
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {article.current_qty.map((branch: { branch: string; quantity: number }) => (
                                <tr key={branch.branch} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                    <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-no-wrap dark:text-white'>
                                        {branch.branch}
                                    </th>
                                    <td className='px-6 py-4 text-right'>
                                        {branch.quantity}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className='w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
                    <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
                        Precios
                    </h5>
                    <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>
                                    Lista
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Precio
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {article.price.map((lista: { lista: string; price: number }) => (
                                <tr key={lista.lista} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                    <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-no-wrap dark:text-white'>
                                        {lista.lista}
                                    </th>
                                    <td className='px-6 py-4 text-right'>
                                        {lista.price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}