import { useEffect } from "react";
import { useRevalidator } from "react-router-dom";

type RevalidateDependency = string | number | boolean | null | undefined;

export default function useRevalidatePage(dependency: RevalidateDependency) {
    const { revalidate } = useRevalidator();

    useEffect(() => {
        revalidate();
    }, [dependency, revalidate]);

}