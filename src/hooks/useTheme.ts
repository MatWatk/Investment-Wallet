import { useSelector } from "react-redux";

export function useTheme() {
    return useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);
}
