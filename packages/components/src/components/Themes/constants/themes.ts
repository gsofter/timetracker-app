import { IThemeSettings } from '../interfaces';
const lightSettings: IThemeSettings = require('./light.theme.json');
const darkSettings: IThemeSettings = require('./dark.theme.json');
const hcSettings: IThemeSettings = require('./hc.theme.json');

export default [
  {
    name: 'light',
    className: '',
    text: 'Light',
    defaultSettings: lightSettings,
  },
  {
    name: 'dark',
    className: 'vs-dark',
    text: 'Dark',
    defaultSettings: darkSettings,
  },
  {
    name: 'hc',
    className: 'hc-black',
    text: 'High Contrast',
    defaultSettings: hcSettings,
  },
];
