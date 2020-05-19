export const  Colors = {
    white: "#ffffff",
    lightGray: "#EEEEEE",
    gray: "#444444",
    shadow: "#dddddd",
    pink: "#f40552",
    transparent: "transparent"
};

export function shadow(hidden) {
    return `0px 32px 64px 0 ${hidden? "transparent" : "#dddddd"}`;
} ;
