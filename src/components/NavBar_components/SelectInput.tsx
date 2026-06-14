import { useDispatch, useSelector } from 'react-redux';
import { languageActions } from '../../store/languageSlice';
import { currencyActions } from '../../store/currencySlice';
import { translations } from '../../constants/translations';

export default function SelectInput({ label, selectOptions, selectValues }: { label: string, selectOptions: string[], selectValues: string[] }) {
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);
    const language = useSelector((state: { language: { language: string } }) => state.language.language);
    const currency = useSelector((state: { currency: { currency: string } }) => state.currency.currency);
    const dispatch = useDispatch();

    const currentValue = label === "Currency" ? currency : language;

    const handleSelect = (value: string) => {
        if(label === "Currency") {
            dispatch(currencyActions.setCurrency(value));
        } else if(label === "Language") {
            dispatch(languageActions.setLanguage(value));
        }
    }

    return (
        <div className="flex flex-col -translate-y-2 w-24 items-center">
            <label htmlFor={`${label.toLowerCase()}-select`} className=" text-xs px-4 py-1">
                {language.toLowerCase() === "english" ? translations.english.navBar.languageLabel : translations.polish.navBar.languageLabel}
            </label>
            <select onChange={(event) => handleSelect(event.target.value)} id={`${label.toLowerCase()}-select`} value={currentValue} className={` ${themeState ? "bg-white text-violet-900" : "bg-gray-400 text-black "} px-2 py-1 rounded-md text-sm border border-rounded-md`}>
                {selectOptions.map((option, index) => (
                    <option key={selectValues[index]} value={selectValues[index]}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}