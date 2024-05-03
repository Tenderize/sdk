export interface BrandPalette {
  spacing: string;
  fonts: {
    name: string;
    familyUrl: string;
  };
  colors: {
    lightMode: LightModeColors;
  };
}

interface LightModeColors {
  border: string;
  primary: ColorSet;
  secondary: ColorSet;
  success: ColorSet;
  card: {
    DEFAULT: string;
  };
  disabled: DisabledColorSet;
}

interface ColorSet {
  DEFAULT: string;
  accent: string;
  foreground: string;
}

interface DisabledColorSet {
  DEFAULT: string;
  foreground: string;
}
