import { Form } from "react-router-dom";
import buttonStyles from "../styles/buttonStyles";

export default function AssetAddSection() {
    return(
            <>
                <Form method="post" action="/dashboard/submit" className="flex flex-col gap-4 mt-8">
                    <div className="flex flex-row gap-4">
                        <label className="flex flex-col gap-1">
                            <span>Asset Name</span>
                            <input type="text" name="assetName" className="border border-gray-300 rounded p-2" />
                        </label>
                        <label className="flex flex-col gap-1">
                            <span>Amount</span>
                            <input type="number" name="amount" className="border border-gray-300 rounded p-2" />
                        </label>
                        <button type="submit" className={`${buttonStyles.customButton} flex items-center justify-center h-10 mt-7 p-4`}>Add asset</button>
                    </div>   
                </Form>
                </>
    )
}