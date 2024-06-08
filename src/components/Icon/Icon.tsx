export type Icons =
  | 'favorite-filled'
  | 'favorite-outlined'
  | 'search'
  | 'xmark';

export type IconProps = {
  iconId: Icons;
};

export const Icon = ({ iconId }: IconProps) => {
  return (
    <svg width={20} height={20} fill="white">
      <use href={`/icons/sprite.svg#${iconId}`} />
    </svg>
  );
};
