import { Button } from '../../components/Button';

export type SearchCoinsListProps = {
  coins: Coins;
  favoriteCoins: Coins;
  isAllCoinsShown: boolean;
  addToFavoriteCoins: (coin: Coin) => void;
  removeFromFavoriteCoins: (coin: Coin) => void;
};

export const SearchCoinsList = ({
  coins,
  favoriteCoins,
  isAllCoinsShown,
  addToFavoriteCoins,
  removeFromFavoriteCoins,
}: SearchCoinsListProps) => {
  return (
    <div>
      {isAllCoinsShown
        ? coins.map(coin => {
            return (
              <div key={coin}>
                {favoriteCoins.includes(coin) ? (
                  <Button
                    iconId="favorite-filled"
                    onClick={() => removeFromFavoriteCoins(coin)}
                  />
                ) : (
                  <Button
                    iconId="favorite-outlined"
                    onClick={() => addToFavoriteCoins(coin)}
                  />
                )}
                {coin}
              </div>
            );
          })
        : favoriteCoins.map(favoriteCoin => {
            return (
              <div key={favoriteCoin}>
                <Button
                  iconId="favorite-filled"
                  onClick={() => removeFromFavoriteCoins(favoriteCoin)}
                />
                {favoriteCoin}
              </div>
            );
          })}
    </div>
  );
};
