import { HTMLProps } from 'react';
import { Icon } from '../Icon';
import { Icons } from '../Icon/icons';

export type ButtonProps = {
  label?: string;
  type?: 'button' | 'submit';
  iconId?: Icons;
} & HTMLProps<HTMLButtonElement>;

export const Button = ({
  type = 'button',
  label,
  onClick,
  iconId,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      onClick={onClick}
      {...props}
    >
      {iconId && <Icon iconId={iconId} />}
      {label && <span>{label}</span>}
    </button>
  );
};
