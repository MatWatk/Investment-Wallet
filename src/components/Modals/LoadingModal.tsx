import { useLanguage } from "../../hooks/useLanguage";
import ModalWrapper from "./ModalWrapper";
import ModalHeader from "./ModalHeader";
import { translations } from "../../constants/translations";
import { useTheme } from "../../hooks/useTheme";

export default function LoadingModal({...props}) {
    const language = useLanguage();
    const themeState = useTheme();

    return (
        <ModalWrapper {...props}>
            <ModalHeader title={translations[language].modals.loadingModal.header} themeState={themeState} />
            <p>{translations[language].modals.loadingModal.message}</p>
        </ModalWrapper>
    );
}