import { HTMLProps, SetStateAction } from 'react';
import { Icon } from '../Icon/Icon';
import { Icons } from '../Icon/icons';
import { Button } from '../Button';
import css from './input.module.css';

export type InputProps = {
  iconId?: Icons;
  inputData: string;
  handleChange: (e: { target: { value: SetStateAction<string> } }) => void;
  deleteValue: () => void;
} & HTMLProps<HTMLInputElement>;

export const Input = ({
  iconId,
  inputData,
  handleChange,
  deleteValue,
  ...props
}: InputProps) => {
  return (
    <div className={css.layout}>
      <div className={css.inputWrapper}>
        {iconId && <Icon iconId={iconId} />}
        <input {...props} onChange={e => handleChange(e)} value={inputData} />
      </div>
      {inputData.length > 0 && (
        <Button onClick={deleteValue} iconId="xmark" iconButton />
      )}
    </div>
  );
};
