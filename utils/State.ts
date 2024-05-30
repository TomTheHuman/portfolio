import { atom } from 'recoil';

import colorPalette from './Palette';

export interface ThemePalette {
  primary: string;
  secondary?: string;
  tertiary?: string;
}

export const themePaletteState = atom<ThemePalette>({
  key: 'themePaletteState',
  default: colorPalette[0],
});
