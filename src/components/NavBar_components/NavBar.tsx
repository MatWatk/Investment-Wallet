import ThemeSwitch from './ThemeSwitch';
import SelectInput from './SelectInput';
import Header from './Header';
import ProfileButton from './ProfileButton';
import HeaderWrapper from './HeaderWrapper';

import { useLanguage } from '../../hooks/useLanguage';

import { translations } from '../../constants/translations';
import { currencies } from '../../constants/assets';
import { auth } from '../../services/firebase/config';

export default function NavBar() {
    const language = useLanguage();

    return (
        <HeaderWrapper>
            <Header />
            <div className="hidden min-w-0 flex-1 items-center justify-center text-lg font-bold lg:flex xl:text-2xl">
                <h1 className="truncate">{auth.currentUser?.email ?? ''}</h1>
            </div>
            <div className="ml-auto flex min-w-0 flex-wrap items-center justify-end gap-3 sm:gap-5">
                <SelectInput type="currency" selectOptions={currencies} selectValues={currencies} />
                <SelectInput type="language" selectOptions={language === "english" ? translations.english.navBar.languages : translations.polish.navBar.languages} selectValues={["english", "polish"]} />
                <ThemeSwitch />
                <ProfileButton />
            </div>
        </HeaderWrapper>
    )
}