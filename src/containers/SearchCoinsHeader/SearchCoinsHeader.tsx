import { SetStateAction } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import css from './SearchCoinsHeader.module.css';

export type SearchCoinsHeaderProps = {
  setFavoriteCoinsList: () => void;
  setAllCoinsList: () => void;
  inputData: string;
  handleChange: (e: { target: { value: SetStateAction<string> } }) => void;
  deleteValue: () => void;
};

export const SearchCoinsHeader = ({
  setFavoriteCoinsList,
  setAllCoinsList,
  inputData,
  handleChange,
  deleteValue,
}: SearchCoinsHeaderProps) => {
  return (
    <div className={css.header}>
      <Input
        placeholder="Search..."
        name="search"
        iconId="search"
        inputData={inputData}
        handleChange={handleChange}
        deleteValue={deleteValue}
      />
      <div>
        <Button
          iconId="favorite-filled"
          label="Favorites"
          onClick={setFavoriteCoinsList}
        />
        <Button label="All coins" onClick={setAllCoinsList} />
      </div>
    </div>
  );
};
