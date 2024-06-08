import { HTMLProps } from 'react';
import { Icon, Icons } from '../Icon/Icon';
import css from './Button.module.css';

export type ButtonProps = {
  label?: string;
  type?: 'button' | 'submit';
  iconButton?: boolean;
  iconId?: Icons;
  isActive?: boolean;
} & HTMLProps<HTMLButtonElement>;

export const Button = ({
  type = 'button',
  label,
  onClick,
  iconId,
  iconButton = false,
  disabled = false,
  isActive = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={[
        css.button,
        iconButton ? css.iconButton : css.withText,
        isActive && css.active,
      ].join(' ')}
      type={type === 'button' ? 'button' : 'submit'}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {iconId && <Icon iconId={iconId} />}
      {label && <span>{label}</span>}
    </button>
  );
};
