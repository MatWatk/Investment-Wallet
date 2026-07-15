import { useDispatch, useSelector } from 'react-redux';
import { languageActions } from '../../store/languageSlice';
import { currencyActions } from '../../store/currencySlice';
import { translations } from '../../constants/translations';

export default function SelectInput({ type, selectOptions, selectValues }: { type: "currency" | "language", selectOptions: string[], selectValues: string[] }) {
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);
    const language = useSelector((state: { language: { language: string } }) => state.language.language);
    const currency = useSelector((state: { currency: { currency: string } }) => state.currency.currency);
    const dispatch = useDispatch();

    const currentValue = type === "currency" ? currency : language;

    const handleSelect = (value: string) => {
        if(type === "currency") {
            dispatch(currencyActions.setCurrency(value));
        } else if(type === "language") {
            dispatch(languageActions.setLanguage(value));
        }
    }

    const selectId = `${type}-select`;
    const labelText = type === "currency"
        ? (language.toLowerCase() === "english" ? translations.english.navBar.currencyLabel : translations.polish.navBar.currencyLabel)
        : (language.toLowerCase() === "english" ? translations.english.navBar.languageLabel : translations.polish.navBar.languageLabel);

    return (
        <div className="flex flex-col -translate-y-2 w-24 items-center">
            <label htmlFor={selectId} className=" text-xs px-4 py-1">
                {labelText}
            </label>
            <select onChange={(event) => handleSelect(event.target.value)} id={selectId} value={currentValue} className={` ${themeState ? "bg-white text-violet-900" : "bg-gray-400 text-black "} px-2 py-1 rounded-md text-sm border border-rounded-md`}>
                {selectOptions.map((option, index) => (
                    <option key={selectValues[index]} value={selectValues[index]}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}