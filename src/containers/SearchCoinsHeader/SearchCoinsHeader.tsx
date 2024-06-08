import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import css from './SearchCoinsHeader.module.css';

export type SearchCoinsHeaderProps = {
  setFavoriteCoinsList: () => void;
  setAllCoinsList: () => void;
};

export const SearchCoinsHeader = ({
  setFavoriteCoinsList,
  setAllCoinsList,
}: SearchCoinsHeaderProps) => {
  return (
    <div className={css.header}>
      <Input placeholder="Search..." name="search" iconId="search" />
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
