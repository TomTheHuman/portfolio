import { atom, selector } from 'recoil';

import colorPalette from './Palette';
import { IProject } from '../types/mongodb';

/* Theme Palette */

export interface ThemePalette {
  primary: string;
  secondary: string;
  tertiary?: string;
}

export const themePaletteState = atom<ThemePalette>({
  key: 'themePaletteState',
  default: colorPalette[0],
});

/* Projects List */

export const projectListState = atom<IProject[]>({
  key: 'projectListState',
  default: [],
});

/* Navigate State */

export type BooleanMap = {
  [key: string]: boolean;
};

export interface SiteNavigation {
  navigating: boolean;
  exitAnimationsCompleted: BooleanMap;
  currentPath: string;
  nextPath: string;
}

export const siteNavigationState = atom<SiteNavigation>({
  key: 'siteNavigationState',
  default: {
    navigating: false,
    exitAnimationsCompleted: {},
    currentPath: '',
    nextPath: '',
  },
});

export const canNavigateSelector = selector<boolean>({
  key: 'canNavigateSelector',
  get: ({ get }) => {
    const siteNavigation = get(siteNavigationState);
    const exitAnimationsCompleted = { ...siteNavigation.exitAnimationsCompleted };

    // Check if the object is empty
    const isEmpty = Object.keys(exitAnimationsCompleted).length === 0;

    // If empty, return true; otherwise, check if all values are true
    return isEmpty || Object.values(exitAnimationsCompleted).every((value) => value === true);
  },
});
