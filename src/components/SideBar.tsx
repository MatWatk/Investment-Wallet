import SideBarWrapper from "./SideBar_components/SideBarWrapper";
import SideButtonsWrapper from "./SideBar_components/SideButtonsWrapper";
import SideBarButton from "./SideBar_components/SideBarButton";
import LogoutButton from "./SideBar_components/LogoutButton";

import { useSelector } from "react-redux";
import { translations } from "../constants/translations";

export default function SideBar() {
    const language = useSelector((state: { language: { language: string } }) => state.language.language);
    return (
        <SideBarWrapper>
            <SideButtonsWrapper>
                <SideBarButton link={'/'}>{language.toLowerCase() === "english" ? translations.english.sideBar.sideButtons[0] : translations.polish.sideBar.sideButtons[0]}</SideBarButton>
                <SideBarButton link={'/assets-price-list'}>{language.toLowerCase() === "english" ? translations.english.sideBar.sideButtons[1] : translations.polish.sideBar.sideButtons[1]}</SideBarButton>
                <SideBarButton link={'/current-prices'}>{language.toLowerCase() === "english" ? translations.english.sideBar.sideButtons[2] : translations.polish.sideBar.sideButtons[2]}</SideBarButton>
            </SideButtonsWrapper>
            <LogoutButton />
        </SideBarWrapper>
    )
}