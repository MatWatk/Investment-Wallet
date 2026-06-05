import SideBarWrapper from "./SideBar_components/SideBarWrapper";
import SideButtonsWrapper from "./SideBar_components/SideButtonsWrapper";
import SideBarButton from "./SideBar_components/SideBarButton";
import LogoutButton from "./SideBar_components/LogoutButton";

export default function SideBar() {
    return (
        <SideBarWrapper>
            <SideButtonsWrapper>
                <SideBarButton link={'/'}>Your wallet</SideBarButton>
                <SideBarButton link={'/assets-price-list'}>Asset price list</SideBarButton>
                <SideBarButton link={'/current-prices'}>Some placeholder</SideBarButton>
            </SideButtonsWrapper>
            <LogoutButton />
        </SideBarWrapper>
    )
}