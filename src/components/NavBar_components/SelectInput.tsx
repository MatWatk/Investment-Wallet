import { useDispatch, useSelector } from 'react-redux';
import { languageActions } from '../../store/languageSlice';
import { currencyActions } from '../../store/currencySlice';

export default function SelectInput({ label, selectOptions }: { label: string, selectOptions: string[] }) {
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);
    const dispatch = useDispatch();

    const handleSelect = (value: string) => {
        if(label === "Currency") {
            dispatch(currencyActions.setCurrency(value));
        } else if(label === "Language") {
            dispatch(languageActions.setLanguage(value));
        }
    }

    const languageRedux = useSelector((state: { language: { language: string } }) => state.language.language);
    const currencyRedux = useSelector((state: { currency: { currency: string } }) => state.currency.currency);

    console.log('redux values: ', { language: languageRedux, currency: currencyRedux });

    return (
        <div className="flex flex-col -translate-y-2">
            <label htmlFor={`${label.toLowerCase()}-select`} className=" text-xs px-4 py-1">
                {label}
            </label>
            <select onChange={(event) => handleSelect(event.target.value)} id={`${label.toLowerCase()}-select`} defaultValue={label === "Currency" ? "USD" : "English"} className={` ${themeState ? "bg-white text-violet-900" : "bg-gray-400 text-black "} px-2 py-1 rounded-md text-sm border border-rounded-md`}>
                {selectOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}