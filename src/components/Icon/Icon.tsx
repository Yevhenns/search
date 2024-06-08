import { Icons } from './icons';

export type IconProps = {
  iconId: Icons;
};

export const Icon = ({ iconId }: IconProps) => {
  return (
    <svg width={20} height={20}>
      <use href={`/icons/sprite.svg#${iconId}`} />
    </svg>
  );
};
