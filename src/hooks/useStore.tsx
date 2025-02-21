"use client"

import { useState, useEffect } from 'react';

export const useStore = <T, F>(
    store: (callback: (state: T) => unknown) => unknown,
    callback: (state: T) => F
) => {
    const resutl = store(callback) as F;
    const [data, setData] = useState<F>();
    
    useEffect(() => {
        setData(resutl);
    }, [resutl]);
    
    return data;
};
