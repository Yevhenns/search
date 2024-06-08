import { useEffect, useRef, useState } from 'react';
import { useGetCoins } from '../../hooks/useGetCoins';
import { Button } from '../../components/Button';
import { SearchCoinsHeader } from '../SearchCoinsHeader';
import { Spinner } from '../../components/Spinner';
import css from './SearchCoins.module.css';
import { SearchCoinsList } from '../SearchCoinsList';

export const SearchCoins = () => {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const [coins, setCoins] = useState<Coins>([]);
  const [favoriteCoins, setFavoriteCoins] = useState<Coins>([]);
  const [isAllCoinsShown, setIsAllCoinsShown] = useState(true);

  const menuRef = useRef<HTMLDivElement>(null);

  const { getCoins, isLoading, isError } = useGetCoins();

  const handleSearchCoins = async () => {
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

  const handler = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!menuRef.current?.contains(e.target as Node)) {
      setIsMenuShown(false);
    }
  };
  useEffect(() => {
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
          />
          {isError && <span>Error</span>}
          {isLoading && (
            <div className={css.spinnerWrapper}>
              <Spinner />
            </div>
          )}
          {!isLoading && !isError && (
            <SearchCoinsList
              coins={coins}
              favoriteCoins={favoriteCoins}
              isAllCoinsShown={isAllCoinsShown}
              addToFavoriteCoins={addToFavoriteCoins}
              removeFromFavoriteCoins={removeFromFavoriteCoins}
            />
          )}
        </div>
      )}
    </div>
  );
};
