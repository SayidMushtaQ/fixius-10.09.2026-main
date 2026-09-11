"use client";
import { useEffect, useRef, MutableRefObject } from "react";

type CallbackFunction = (...args: any[]) => void;

export const useDebounce = (callback: CallbackFunction, delay: number) => {
    const timeoutRef: MutableRefObject<NodeJS.Timeout | undefined> = useRef(undefined);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    return function (...args: any[]) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            callback.apply(null, args);
        }, delay);
    };
};
