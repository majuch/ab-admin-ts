import { IArticle } from "@/models/Article";
import Image from 'next/image';
import Link from "next/link";

interface CardProps {
   item: IArticle;
   link: string;
}

export function ListItem({item, link }: CardProps) {

    const basePrice = item.price.find(p => p.lista === '3 BASE')?.price ?? 0;

    return (
        <Link href={link}>
                <div className="justify-stretch items-center x-4">
            <div className="flex items-center sm:items-start p-1">
                <div className="flex-shrink-0 mr-4">
                    <Image className="w-8 h-8 rounded-full" src="/file.svg" alt="Vercel logomark" width={32} height={32} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {item.code}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                    </p>
                    <div className="items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            {item.global_qty}
                        </span>en existencia
                    </div>
                </div>
                <div className="inline-flex text-lg font-semibold text-gray-900 dark:text-white">
                    {basePrice}
                </div>
                
            </div>
        </div>
        </Link>

    );
}