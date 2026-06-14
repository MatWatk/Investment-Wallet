import { useEffect } from "react";
import { useRevalidator } from "react-router-dom";

export default function useRevalidatePage<T>({dependency}: { dependency: T }) {
    const { revalidate } = useRevalidator();

    useEffect(() => {
        revalidate();
    }, [dependency, revalidate])

}