import ThemeSwitch from './ThemeSwitch';
import SelectInput from './SelectInput';
import Header from './Header';
import ProfileButton from './ProfileButton';
import HeaderWrapper from './HeaderWrapper';

import { useSelector } from 'react-redux';

import { translations } from '../../constants/translations';

export default function NavBar() {
    const language = useSelector((state: { language: { language: string } }) => state.language.language);

    return (
        <HeaderWrapper>
            <Header />
            <div className="hidden min-w-0 flex-1 items-center justify-center text-lg font-bold lg:flex xl:text-2xl">
                <h1 className="truncate">Account Name +TODO</h1>
            </div>
            <div className="ml-auto flex min-w-0 flex-wrap items-center justify-end gap-3 sm:gap-5">
                <SelectInput label="Currency" selectOptions={["USD", "PLN"]} selectValues={["USD", "PLN"]} />
                <SelectInput label="Language" selectOptions={language.toLowerCase() === "english" ? translations.english.navBar.languages : translations.polish.navBar.languages} selectValues={["english", "polish"]} />
                <ThemeSwitch />
                <ProfileButton />
            </div>
        </HeaderWrapper>
    )
}