import { getCurrentUser } from "../../utils/utils";
import { redirect } from "react-router-dom";

export async function loader() {
    const loggedUser = await getCurrentUser();
    if (loggedUser) {
        return redirect("/");
    }
    return null;
}