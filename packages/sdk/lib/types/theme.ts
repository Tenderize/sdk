export interface BrandPalette {
  spacing: string;
  fonts: {
    name: string;
    familyUrl: string;
  };
  colors: {
    lightMode: LightModeColors;
    darkMode: LightModeColors;
  };
}

interface LightModeColors {
  border: string;
  background: string;
  primary: ColorSet;
  secondary: ColorSet;
  success: ColorSet;
  card: {
    DEFAULT: string;
  };
  disabled: CommonColorSet;
  panel: CommonColorSet;
  badge: Badge;
}

interface ColorSet extends CommonColorSet {
  accent: string;
}

interface CommonColorSet {
  DEFAULT: string;
  foreground: string;
}
interface Badge {
  error: string;
  errorForeground: string;
  info: string;
  infoForeground: string;
}
