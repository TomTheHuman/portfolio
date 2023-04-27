/** General */
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export type IColors = {
  yellow: string;
  red: string;
  white: string;
  navy: string;
};

export type TColorKey = keyof IColors;

export type TColor = IColors[TColorKey];

export type TShapeStyle = 'circle' | 'rectangle' | 'rectangle-round';

export interface ITextContent {
  title: string;
  subtitle: string;
  body: string;
}

export interface IShape {
  style: TShapeStyle;
  color: TColor;
  size: string;
}

export interface IImageAsset {
  key?: string;
  shape?: TShapeStyle;
  path: string;
  label: string;
}

export interface ILink {
  key?: string;
  label: string;
  href: string;
}

/** Site */
export interface IConfig {
  title: string;
  description: string;
}

export interface INavigation {
  primary: ILink[];
  emphasized: ILink;
}

export interface ISite {
  config: IConfig;
  navigation: INavigation;
}

/** Landing */
export interface ILandingText extends Partial<ITextContent> {
  name: string;
}

export interface ILandingShapes {
  top: IShape;
  bottom: IShape;
}

export interface ILandingGraphic {
  shapes: ILandingShapes;
  image: IImageAsset;
}

export interface ILanding {
  text: ILandingText;
  graphic: ILandingGraphic;
}

/** About */
export interface IAboutShapes {
  first: IShape;
  second: IShape;
  third: IShape;
  fourth: IShape;
}

export interface IAbout {
  text: AtLeastOne<ITextContent>;
  shapes: IAboutShapes;
}

/** Skills */
export interface ISkillsText extends Partial<ITextContent> {
  other: string;
}

export interface IEmphasizedSkill {
  key: string;
  label: string;
  logo: IImageAsset;
  percentage: number;
}

export interface ISkills {
  text: ISkillsText;
  emphasized: IEmphasizedSkill[];
  other: string[];
}

/** Work */
export interface IProject {
  key: string;
  title: string;
  description: string;
  link?: string;
  image: IImageAsset;
  technologies: string[];
}

export interface IWorkShapes {
  top: {
    left: IShape;
    right: IShape;
  };
  bottom: {
    left: IShape;
    middle: IShape;
    right: IShape;
  }
}

export interface IWork {
  text: AtLeastOne<ITextContent>;
  shapes: IWorkShapes;
  projects: IProject[];
}

/** Contact */
export interface IContactShapes {
  left: {
    top: IShape;
    bottom: IShape;
  };
  right: {
    top: IShape;
    middle: IShape;
    bottom: IShape;
  }
}

export interface IContactGraphic {
  shapes: IContactShapes;
  image: IImageAsset;
}

export interface IContactLink extends ILink {
  value?: string;
  logo: IImageAsset;
}

export interface IContact {
  text: AtLeastOne<ITextContent>;
  graphic: IContactGraphic;
  links: IContactLink[];
}
