import { HTMLProps, SetStateAction, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { Icons } from '../Icon/icons';
import css from './input.module.css';

export type InputProps = {
  iconId?: Icons;
} & HTMLProps<HTMLInputElement>;

export const Input = ({ iconId, ...props }: InputProps) => {
  const [inputData, setInputData] = useState('');

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputData(e.target.value);
  };

  const deleteValue = () => {
    setInputData('');
  };

  return (
    <div className={css.layout}>
      {iconId && <Icon iconId={iconId} />}
      <input {...props} onChange={handleChange} value={inputData} />
      {inputData.length > 0 && (
        <button onClick={deleteValue}>
          <Icon iconId="xmark" />
        </button>
      )}
    </div>
  );
};
