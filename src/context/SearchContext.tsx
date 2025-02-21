'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IArticle } from '@/models/Article';

interface SearchContextProps {
    search: string;
    setSearch: (search: string) => void;
    data: IArticle[];
    setData: (data: IArticle[]) => void;
}

const SearchContext = createContext<SearchContextProps| undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [search, setSearch] = useState<string>('');
    const [data, setData] = useState<IArticle[]>([]);
  
    return (
      <SearchContext.Provider value={{ search, setSearch, data, setData }}>
        {children}
      </SearchContext.Provider>
    );
  };
  
  export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
      throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
  };