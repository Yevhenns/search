import { Button } from '../../components/Button';
import { Spinner } from '../../components/Spinner';
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
    return (
      <div className={css.spinnerWrapper}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={css.layout}>
      {isAllCoinsShown
        ? filteredCoins.map(filteredCoin => {
            return (
              <div key={filteredCoin}>
                {filteredFavoriteCoins.includes(filteredCoin) ? (
                  <Button
                    iconId="favorite-filled"
                    onClick={() => removeFromFavoriteCoins(filteredCoin)}
                  />
                ) : (
                  <Button
                    iconId="favorite-outlined"
                    onClick={() => addToFavoriteCoins(filteredCoin)}
                  />
                )}
                {filteredCoin}
              </div>
            );
          })
        : filteredFavoriteCoins.map(filteredFavoriteCoin => {
            return (
              <div key={filteredFavoriteCoin}>
                <Button
                  iconId="favorite-filled"
                  onClick={() => removeFromFavoriteCoins(filteredFavoriteCoin)}
                />
                {filteredFavoriteCoin}
              </div>
            );
          })}
    </div>
  );
};
