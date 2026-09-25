import AssetButton from "./Wallet_components/AssetButton";

export default function QueryError({ errorMessage, status }: { errorMessage: string, status: number }) {
    return (
        <div className='flex flex-col items-center justify-center p-5'>
            <div id='asset-prices-error' className='flex items-center justify-center p-5 text-red-500 flex-col'>
                <p>Error: {errorMessage}</p>
                <p>Status: {status}</p>
                <p>Please try again later.</p>
            </div>
            <AssetButton id='asset-prices-refresh' onClick={() => window.location.reload()}>Refresh page</AssetButton>
        </div>
    )
}