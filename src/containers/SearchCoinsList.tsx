import { Coins, Coin } from '../App';
import { Button } from '../components/Components';
import css from './SearchCoinsList.module.css';

export type SearchCoinsListProps = {
  filteredCoins: Coins;
  filteredFavoriteCoins: Coins;
  isAllCoinsShown: boolean;
  addToFavoriteCoins: (coin: Coin) => void;
  removeFromFavoriteCoins: (coin: Coin) => void;
  isError: null | string;
  isLoading: boolean;
};

export const SearchCoinsList = ({
  filteredCoins,
  filteredFavoriteCoins,
  isAllCoinsShown,
  addToFavoriteCoins,
  removeFromFavoriteCoins,
  isError,
  isLoading,
}: SearchCoinsListProps) => {
  if (isError) {
    return <span>Error</span>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={css.layout}>
      {isAllCoinsShown
        ? filteredCoins.map(filteredCoin => {
            return (
              <div key={filteredCoin} className={css.item}>
                {filteredFavoriteCoins.includes(filteredCoin) ? (
                  <Button
                    iconButton
                    iconId="favorite-filled"
                    onClick={() => removeFromFavoriteCoins(filteredCoin)}
                  />
                ) : (
                  <Button
                    iconButton
                    iconId="favorite-outlined"
                    onClick={() => addToFavoriteCoins(filteredCoin)}
                  />
                )}
                <span onClick={() => alert(`Chosen coin: ${filteredCoin}`)}>
                  {filteredCoin}
                </span>
              </div>
            );
          })
        : filteredFavoriteCoins.map(filteredFavoriteCoin => {
            return (
              <div key={filteredFavoriteCoin} className={css.item}>
                <Button
                  iconButton
                  iconId="favorite-filled"
                  onClick={() => removeFromFavoriteCoins(filteredFavoriteCoin)}
                />
                <span
                  onClick={() => alert(`Chosen coin: ${filteredFavoriteCoin}`)}
                >
                  {filteredFavoriteCoin}
                </span>
              </div>
            );
          })}
    </div>
  );
};
