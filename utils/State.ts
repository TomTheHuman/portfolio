import { atom } from 'recoil';

import colorPalette from './Palette';
import { IProject } from '../types/mongodb';

export interface ThemePalette {
  primary: string;
  secondary: string;
  tertiary?: string;
}

export const themePaletteState = atom<ThemePalette>({
  key: 'themePaletteState',
  default: colorPalette[0],
});

export const projectListState = atom<IProject[]>({
  key: 'projectListState',
  default: [],
});
