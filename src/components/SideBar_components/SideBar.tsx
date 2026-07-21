import SideBarWrapper from "./SideBarWrapper";
import SideButtonsWrapper from "./SideButtonsWrapper";
import SideBarButton from "./SideBarButton";
import LogoutButton from "./LogoutButton";

import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../constants/translations";
import { useState } from "react";

import WeightIcon from "../../assets/weightIcon.png";
import WalletIcon from "../../assets/yourWalletIcon.png";
import FoldingButton from "./FoldingButton";

export default function SideBar() {
    const [foldState, setFoldState] = useState(true);
    const language = useLanguage();

    const toggleFoldState = () => {
        setFoldState(!foldState);
    }



    return (
        <SideBarWrapper foldState={foldState}>
            <SideButtonsWrapper>
                <FoldingButton foldState={foldState} toggleFoldState={toggleFoldState} />
                <SideBarButton
                    link={'/'}
                    icon={WalletIcon}
                    altText="Wallet Icon"
                    isFolded={foldState}>
                    {foldState ? '' : (language === "english" ? translations.english.sideBar.sideButtons[0] : translations.polish.sideBar.sideButtons[0])}</SideBarButton>
                <SideBarButton
                    link={'/assets-price-list'}
                    icon={WeightIcon}
                    altText="Weight Icon"
                    isFolded={foldState}>
                    {foldState ? '' : (language === "english" ? translations.english.sideBar.sideButtons[1] : translations.polish.sideBar.sideButtons[1])}
                </SideBarButton>
            </SideButtonsWrapper>
            <LogoutButton foldState={foldState}/>
        </SideBarWrapper>
    )
}