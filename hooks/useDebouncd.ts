import { useEffect, useState } from "react";

/**
 * 디바운스 훅
 * @param value 
 * @param delay 
 * @returns  디바운스된 값
 * 사용 예시: const debouncedSearchTerm = useDebounce(searchTerm, 300);
 * 리턴된 값은 `value`가 변경된 후 `delay` 밀리초 후에 업데이트됩니다.
 */
export const useDebounce = <T>(value: T, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timeout);
        };
    }, [value, delay]);

    return debouncedValue;
};