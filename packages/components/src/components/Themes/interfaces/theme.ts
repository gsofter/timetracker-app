import { IThemeSettings } from "../generated-types";

export interface ITheme {
    name: string;
    className?: string;
    text?: string;
    defaultSettings?: IThemeSettings;
}
