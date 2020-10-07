
// types generated based on `.json` files from
// https://jvilk.com/MakeTypes/
export interface IThemeSettings {
    type: string;
    colors: Colors;
    tokenColors?: (TokenColorsEntity)[] | null;
}
export interface Colors {
    list: {
        dropBackground: string;
    };
    editor: {
        background: string;
        foreground: string;
        inactiveSelectionBackground: string;
        selectionHighlightBackground: string;
    };
    editorIndentGuide: {
        background: string;
    };
    activityBarBadge: {
        background: string;
    };
    sideBarTitle: {
        foreground: string;
    };
}
export interface TokenColorsEntity {
    settings: ThemeSettings;
    scope?: string | (string)[] | null;
    name?: string | null;
}
export interface ThemeSettings {
    foreground?: string | null;
    background?: string | null;
    fontStyle?: string | null;
}

