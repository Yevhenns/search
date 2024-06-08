import { SetStateAction, useEffect, useRef, useState } from 'react';
import { useGetCoins } from './hooks/useGetCoins';
import { Button } from './components/Button/Button';
import { SearchCoinsHeader } from './containers/SearchCoinsHeader/SearchCoinsHeader';
import { SearchCoinsList } from './containers/SearchCoinsList/SearchCoinsList';
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
      <Button onClick={handleSearchCoins} label="Search" />
      {isMenuShown && (
        <div className={css.wrapper} ref={menuRef}>
          <SearchCoinsHeader
            setAllCoinsList={setAllCoinsList}
            setFavoriteCoinsList={setFavoriteCoinsList}
            inputData={inputData}
            handleChange={handleChange}
            deleteValue={deleteValue}
          />
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
