import { SetStateAction } from 'react';
import { Button } from '../../components/Button/Button';
import { Icon } from '../../components/Icon/Icon';
import css from './SearchCoinsHeader.module.css';

export type SearchCoinsHeaderProps = {
  setFavoriteCoinsList: () => void;
  setAllCoinsList: () => void;
  inputData: string;
  handleChange: (e: { target: { value: SetStateAction<string> } }) => void;
  deleteValue: () => void;
  isAllCoinsShown: boolean;
};

export const SearchCoinsHeader = ({
  setFavoriteCoinsList,
  setAllCoinsList,
  inputData,
  handleChange,
  deleteValue,
  isAllCoinsShown,
}: SearchCoinsHeaderProps) => {
  return (
    <div className={css.header}>
      <div className={css.inputLayout}>
        <div className={css.inputWrapper}>
          <Icon iconId="search" />
          <input
            onChange={e => handleChange(e)}
            value={inputData}
            name="search"
            placeholder="Search..."
          />
        </div>
        {inputData.length > 0 && (
          <Button onClick={deleteValue} iconId="xmark" iconButton />
        )}
      </div>
      <div className={css.buttonSet}>
        <Button
          iconId="favorite-filled"
          label="Favorites"
          onClick={setFavoriteCoinsList}
          isActive={!isAllCoinsShown}
          disabled={!isAllCoinsShown}
        />
        <Button
          label="All coins"
          onClick={setAllCoinsList}
          isActive={isAllCoinsShown}
          disabled={isAllCoinsShown}
        />
      </div>
    </div>
  );
};
