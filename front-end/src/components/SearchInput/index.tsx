import useClasses from "@/hooks/useClasses";
import { ComponentProps, FC, useState } from "react";
import styles from "./styles.module.scss";
import Input from "@/components/Input";
import SearchIcon from "@/assets/search-icon.svg";
import { useGetCountriesByPromptQuery } from "@/store/services/weatherApi";
import { useAppDispatch } from "@/store/hooks";
import { setSelectedLocale } from "@/store/slices/search";
import { ILocale } from "@/types/weather";
import Button from "@/components/Button";
import { Icons } from "../Icons/icon";

export interface SearchInputProps extends ComponentProps<"div"> {}

const SearchInput: FC<SearchInputProps> = ({ className, ...props }) => {
  const dispatch = useAppDispatch();
  const [prompt, setPrompt] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchInputClassName = useClasses({
    classNames: [styles.searchInput, className],
  });
  const { data, isLoading } = useGetCountriesByPromptQuery(prompt);
  const handleSelectLocale = (locale: ILocale) => {
    setPrompt(locale.country);
    dispatch(setSelectedLocale(locale));
  };

  return (
    <div {...props} className={searchInputClassName}>
      <Input
        id="search"
        className="extendable"
        type="search"
        placeholder="Search for a country"
        variant="outlined"
        value={prompt}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        onChange={(event) => setPrompt(event.target.value)}
      />
      {isFocused && data?.length !== 0 && (
        <div className="dropdown">
          {isLoading && <div>Loading...</div>}
          {data && (
            <ul>
              {data.map((locale) => (
                <li
                  onClick={() => {
                    handleSelectLocale(locale);
                  }}
                  key={locale.id}
                  value={locale.country}
                >
                  <span className="country">{locale.country}</span>
                  <span className="timezone">{locale.timezone}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {prompt && isFocused &&  (
        <Button type="button" className="close" onClick={()=>{setPrompt('')}}>
          <Icons.close />
        </Button>
      )}
      <label htmlFor="search">
        <img src={SearchIcon} alt="Search Icon" />
      </label>
    </div>
  );
};

export default SearchInput;
