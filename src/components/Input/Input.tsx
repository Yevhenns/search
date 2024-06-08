import { HTMLProps, SetStateAction } from 'react';
import { Icon } from '../Icon/Icon';
import { Icons } from '../Icon/icons';
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
      {iconId && <Icon iconId={iconId} />}
      <input {...props} onChange={e => handleChange(e)} value={inputData} />
      {inputData.length > 0 && (
        <button onClick={deleteValue}>
          <Icon iconId="xmark" />
        </button>
      )}
    </div>
  );
};
