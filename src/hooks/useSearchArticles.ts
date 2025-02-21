import { Article, IArticle } from "@/models/Article";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    search: string;
    priceList: string;
    articles: IArticle[];
    isLoading: boolean;
    error: unknown;
}

interface Actions {
    setSearch: (search: string) => void;
    setPrice: (price: string) => void;
    fetchData: () => Promise<void>;
}

const INITIAL_STATE: State = {
    search: '',
    priceList: '',
    articles: [],
    isLoading: false,
    error: null
};

export const useSearchArticles = create(persist<State & Actions>((set, get) => ({
    ...INITIAL_STATE,
    setSearch: (search) => {
        set({ search });
    },
    setPrice: (price) => {
        set({ priceList: price });
    },
    fetchData: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch(`/api/articles/search?search=${get().search}`);
            const data = await response.json();

            const articulos: IArticle[] = data.data.map((article: Article) => {
                const prices = article.price.split("||").map((p: string) => {
                    const [lista, price] = p.split("~");
                    const precio = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(price.trim()));
                    return { lista: lista.trim(), price: precio };
                });
                return { ...article, price: prices };
            });

            set({ articles: articulos });
        } catch (error) {
            set({ error });
        } finally {
            set({ isLoading: false });
        }
    }
}), { name: 'search-articles' }));