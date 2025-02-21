import { useEffect, useState } from 'react';

export default function useSearchStore<T, F>(
    search: (callback: (state: T) => void) => void,
    storeCallback: (state: T) => F,
) {
    const stateOfStore = search(storeCallback) as F;
    const [state, setState] = useState<F>();

    useEffect(() => {
        setState(stateOfStore);
    }, [stateOfStore]);

    return state
}