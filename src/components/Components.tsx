import { HTMLProps } from 'react';
import css from './Components.module.css';

export type ButtonProps = {
  label?: string;
  type?: 'button' | 'submit';
  iconButton?: boolean;
  iconId?: Icons;
  isActive?: boolean;
  dataLength?: number;
} & HTMLProps<HTMLButtonElement>;

const Button = ({
  type = 'button',
  label,
  onClick,
  iconId,
  iconButton = false,
  disabled = false,
  isActive = false,
  dataLength,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={[
        css.button,
        dataLength === 0 && css.hidden,
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

export type Icons =
  | 'favorite-filled'
  | 'favorite-outlined'
  | 'search'
  | 'xmark';

export type IconProps = {
  iconId: Icons;
};

const Icon = ({ iconId }: IconProps) => {
  return (
    <svg width={20} height={20} fill="white">
      <use href={`/icons/sprite.svg#${iconId}`} />
    </svg>
  );
};

export { Button, Icon };
