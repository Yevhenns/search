import { SetStateAction, useEffect, useRef, useState } from 'react';
import { useGetCoins } from './hooks/useGetCoins';
import { Button, Icon } from './components/Components';
import { SearchCoinsList } from './containers/SearchCoinsList';
import css from './App.module.css';

export type Coin = string;
export type Coins = Coin[];

function App() {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const [coins, setCoins] = useState<Coins>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coins>([]);
  const [favoriteCoins, setFavoriteCoins] = useState<Coins>([]);
  const [filteredFavoriteCoins, setFilteredFavoriteCoins] = useState<Coins>([]);
  const [isAllCoinsShown, setIsAllCoinsShown] = useState(true);
  const [inputData, setInputData] = useState('');

  const menuRef = useRef<HTMLDivElement>(null);

  const { getCoins, isLoading, isError } = useGetCoins();

  const handleSearchCoins = async () => {
    if (isMenuShown) {
      setIsMenuShown(false);
      return;
    }
    const data = await getCoins();
    setCoins(data);
    setIsMenuShown(true);
  };

  const setAllCoinsList = () => {
    setIsAllCoinsShown(true);
  };

  const setFavoriteCoinsList = () => {
    setIsAllCoinsShown(false);
  };

  const addToFavoriteCoins = (coin: Coin) => {
    const newArr = [...favoriteCoins, coin];
    setFavoriteCoins(newArr);
  };

  const removeFromFavoriteCoins = (coin: Coin) => {
    const newArr = favoriteCoins.filter(item => item !== coin);
    setFavoriteCoins(newArr);
    setIsMenuShown(true);
  };

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputData(e.target.value);
  };

  const deleteValue = () => {
    setInputData('');
  };

  useEffect(() => {
    const newArr = coins.filter(item => item.includes(inputData.toUpperCase()));
    setFilteredCoins(newArr);
  }, [coins, inputData]);

  useEffect(() => {
    const newArr = favoriteCoins.filter(item =>
      item.includes(inputData.toUpperCase())
    );
    setFilteredFavoriteCoins(newArr);
  }, [favoriteCoins, inputData]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setIsMenuShown(false);
      }
    };
    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  return (
    <div className={css.layout}>
      <Button
        onClick={handleSearchCoins}
        label="Search"
        isActive={isMenuShown}
      />
      {isMenuShown && (
        <div className={css.wrapper} ref={menuRef}>
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
          <SearchCoinsList
            filteredCoins={filteredCoins}
            filteredFavoriteCoins={filteredFavoriteCoins}
            isAllCoinsShown={isAllCoinsShown}
            addToFavoriteCoins={addToFavoriteCoins}
            removeFromFavoriteCoins={removeFromFavoriteCoins}
            isError={isError}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
}

export default App;
