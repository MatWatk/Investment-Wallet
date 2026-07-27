import { redirect } from "react-router-dom";
import actionAssetFirebase from "../../services/api/actionAssetFirebase";
import { parseWalletAssetRequest, parseWalletPlatformRequest } from "../../utils/parsers";
import actionPlatformFirebase from "../../services/api/actionPlatformFirebase";

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();

    if (formData.get("actionRequestType") !== "asset" && formData.get("actionRequestType") !== "platform") {
        throw new Response("Invalid actionRequestType", { status: 400 });
    }

    if (formData.get("actionRequestType") === "asset") {
        const data = parseWalletAssetRequest(formData);
        await actionAssetFirebase(data);
        return redirect("/");
    }
    if (formData.get("actionRequestType") === "platform") {
        const data = parseWalletPlatformRequest(formData);
        await actionPlatformFirebase(data);
        return redirect("/");
    }
}