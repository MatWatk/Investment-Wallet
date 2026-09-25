export default async function fetchData(url: string, options?: RequestInit) {

        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`, {
                cause: { status: response.status },
            });
        }
        return await response.json();
    } 