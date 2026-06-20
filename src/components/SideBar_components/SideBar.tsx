import SideBarWrapper from "./SideBarWrapper";
import SideButtonsWrapper from "./SideButtonsWrapper";
import SideBarButton from "./SideBarButton";
import LogoutButton from "./LogoutButton";

import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../constants/translations";

export default function SideBar() {
    const language = useLanguage();
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