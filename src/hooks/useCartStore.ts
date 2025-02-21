import { ArticleCart } from "@/models/Article";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: ArticleCart[];
    totalItems: number;
    totalAmount: number;
}

interface Actions {
    addArticle: (article: ArticleCart, units: number) => void;
    removeArticle: (article: ArticleCart) => void;
    clearCart: () => void;
}

const INITIAL_STATE: State = {
    cart: [],
    totalItems: 0,
    totalAmount: 0,
};

export const useCartStore = create(persist<State & Actions>((set, get) => ({
    ...INITIAL_STATE,
    addArticle: (article, units) => {
        const { cart } = get();
        const existingArticle = cart.find((a) => a.id === article.id);
        if (existingArticle) {
            existingArticle.quantity = (existingArticle.quantity || 0) + units;
        } else {
            article.quantity = units;
            set({ cart: [...cart, article] });
        }
        set((state) => ({
            totalItems: state.totalItems + 1,
            totalAmount: state.totalAmount + (article.price * units),
        }));
    },
    removeArticle: (article) => {
        const { cart } = get();
        const existingArticle = cart.find((a) => a.id === article.id);
        if (existingArticle) {
            set({ cart: cart.filter((a) => a.id !== article.id) });
        }

        let total = 0;
        cart.forEach((a) => {
            total += a.price * (a.quantity || 1);
        });

        set((state) => ({
            totalItems: state.totalItems - 1,
            totalAmount: total,
        }));
    },
    clearCart: () => {
        set(INITIAL_STATE);
    },
}), { name: 'cart-store' }));