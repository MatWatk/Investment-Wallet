import ThemeSwitch from './ThemeSwitch';
import SelectInput from './NavBar_components/SelectInput';
import Header from './NavBar_components/Header';
import ProfileButton from './NavBar_components/ProfileButton';
import HeaderWrapper from './NavBar_components/HeaderWrapper';

export default function NavBar() {


    return (
        <HeaderWrapper>
            <Header />
            <div className="flex items-center ml-auto text-2xl font-bold text-violet-900">
                <h1>Account Name +TODO</h1>
            </div>
            <div className="flex items-center ml-auto gap-4">
                <SelectInput label="Currency" selectOptions={["USD", "PLN"]} />
                <SelectInput label="Language" selectOptions={["English", "Polish"]} />
                <ThemeSwitch />
                <ProfileButton />
            </div>
        </HeaderWrapper>
    )
}