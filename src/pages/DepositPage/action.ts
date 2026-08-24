import actionDepositFirebase from "../../services/firebase/depositPage/actionDepositFirebase";
import { parseDepositRequest } from "../../utils/parsers";

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();

    if (formData.get("actionRequestType") !== "add" && formData.get("actionRequestType") !== "edit" && formData.get("actionRequestType") !== "delete") {
        throw new Response("Invalid actionRequestType", { status: 400 });
    }
    const depositRequest = parseDepositRequest(formData);
    actionDepositFirebase(depositRequest);
}