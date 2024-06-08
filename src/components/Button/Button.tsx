import { HTMLProps } from 'react';
import { Icon } from '../Icon';
import { Icons } from '../Icon/icons';
import css from './Button.module.css';

export type ButtonProps = {
  label?: string;
  type?: 'button' | 'submit';
  iconButton?: boolean;
  iconId?: Icons;
} & HTMLProps<HTMLButtonElement>;

export const Button = ({
  type = 'button',
  label,
  onClick,
  iconId,
  iconButton = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={[css.button, iconButton ? css.iconButton : css.withText].join(
        ' '
      )}
      type={type === 'button' ? 'button' : 'submit'}
      onClick={onClick}
      {...props}
    >
      {iconId && <Icon iconId={iconId} />}
      {label && <span>{label}</span>}
    </button>
  );
};
