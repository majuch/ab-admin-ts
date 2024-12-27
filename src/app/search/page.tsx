'use client';
import { ListItem } from '@/components/ListItem';
import { Skeleton } from '@/components/Skeleton';
import { Article, IArticle } from '@/models/Article';
import React from 'react';

export default function Page() {

  const [search, setSearch] = React.useState<string>('');
  const [data, setData] = React.useState<IArticle[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  function searchArticles(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const searchData = async () => {
      const response = await fetch(`/api/articles/search?search=${search}`);
      return response.json();
    }

    searchData().then(data =>{
      const dataResponse: IArticle[] = data.data.map((article: Article) => {
        const prices = article.price.split("||").map((p: string) => {
          const [lista, price] = p.split("~");
          const precio = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(price.trim()));
          return { lista: lista.trim(), price: precio };
        });
        return { ...article, price: prices };
      });
      setData(dataResponse);
      setLoading(false);
      // Guardar el estado de búsqueda y los resultados en localStorage
      localStorage.setItem('search', search);
      localStorage.setItem('data', JSON.stringify(dataResponse));
    }).then(() => setLoading(false));
  }

  return (
    <div className='container pt-6 pl-2 mx-auto'>
      <h1 className='mb-2 text-2xl font-semibold text-gray-900 dark:text-white'>
        Busqueda
      </h1>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <form onSubmit={searchArticles}>   
            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  type="search" 
                  id="search" 
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Buscar articulo" 
                  required />
                <button 
                  type="submit" 
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Buscar
                </button>
            </div>
        </form>
          {loading ? (
            <Skeleton />
          ) : (
        <div className='mt-4'>
          <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
              {data.map((item) => (
                <li key={item.id} className='pb-3 sm:pb-4'>
                    <ListItem item={item} link={`/search/${item.id}`}/>
                </li>
              ))}
          </ul>
        </div>)}
      </div> 
    </div>
  ); 
}