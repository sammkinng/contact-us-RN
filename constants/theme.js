import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const Colors = {
    // base colors
    // primary: "#00996D", // Green
    primary: 'blue',
    secondary: "#606d87",   // Gray

    // colors
    black: "#1E1F20",
    white: "#FFFFFF",
    lightGray: "#eff2f5",
    gray: "#BEC1D2",
};
export const Sizes = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,

    // app dimensions
    width,
    height
};

const appTheme = { Colors, Sizes };

export default appTheme;
