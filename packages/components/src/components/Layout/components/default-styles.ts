


export const LocalThemeSettings = {
    proLayoutHeaderHeight: '48px',
}
export const GlobalThemeSettings = {
    antPrefix: 'ant',

    // Base background color for most components
    componentBackground: '#fff',


    // Border color
    borderColorBase: 'hsv(0, 0, 85%)', // base border outline a component
    borderColorSplit: 'hsv(0, 0, 94%)', // split border inside a component
    borderColorInverse: '#fff', // @white
    borderWidthBase: '1px', // width of the border for a component
    borderStyleBase: 'solid', // style of a components border


    // Shadow
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowColorInverse: '#fff', //@component-background,
    boxShadowBase: `0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
0 9px 28px 8px rgba(0, 0, 0, 0.05)`,
    shadow1Up: `0 -6px 16px -8px rgba(0, 0, 0, 0.08), 0 -9px 28px 0 rgba(0, 0, 0, 0.05),
 0 -12px 48px 16px rgba(0, 0, 0, 0.03)`,
    shadow1Down: `0 6px 16px -8px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05),
 0 12px 48px 16px rgba(0, 0, 0, 0.03)`,
    shadow1Left: `-6px 0 16px -8px rgba(0, 0, 0, 0.08), -9px 0 28px 0 rgba(0, 0, 0, 0.05),
 -12px 0 48px 16px rgba(0, 0, 0, 0.03)`,
    shadow1Right: `6px 0 16px -8px rgba(0, 0, 0, 0.08), 9px 0 28px 0 rgba(0, 0, 0, 0.05),
 12px 0 48px 16px rgba(0, 0, 0, 0.03)`,
    shadow2: `0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
 0 9px 28px 8px rgba(0, 0, 0, 0.05)`,


    // Buttons
    btnFontWeight: '400',
    // btnBorderRadius-base: @border-radius-base,
    // btnBorderRadius-Sm: @border-radius-base,
    // btnBorderWidth: @border-width-base;
    // btnBorderStyle: @border-style-base,
    btnShadow: '0 2px 0 rgba(0, 0, 0, 0.015)',
    btnPrimaryShadow: '0 2px 0 rgba(0, 0, 0, 0.045)',
    btnTextShadow: '0 -1px 0 rgba(0, 0, 0, 0.12)',
    btnPrimaryColor: '#fff',
    btnPrimaryBg: '#fff', //'@primary-color',


    fontSizeBase: '14px',
    fontSizeLg: '16px',
    fontSizeSm: '12px',

    // Media queries breakpoints
    // @screenXs and @screenXsMin is not used in Grid
    // smallest break point is @screenMd
    screenXs: '480px',
    screenXsMin: '480px',
    // 👆 Extra small screen / phone
    // 👇 Small screen / tablet
    screenSm: '576px',
    screenSmMin: '576px',
    // Medium screen / desktop
    screenMd: '768px',
    screenMdMin: '768px',
    // Large screen / wide desktop
    screenLg: '992px',
    screenLgMin: '992px',
    // Extra large screen / full hd
    screenXl: '1200px',
    screenXlMin: '1200px',
    // Extra extra large screen / large desktop
    screenXxl: '1600px',
    screenXxlMin: '1600px',
    // provide a maximum
    // screenXsMax: (@screenSmMin - 1px),
    // screenSmMax: (@screenMdMin - 1px),
    // screenMdMax: (@screenLgMin - 1px),
    // screenLgMax: (@screenXlMin - 1px),
    // screenXlMax: (@screenXxlMin - 1px),


    // Layout
    layoutBodyBackground: '#f0f2f5',
    layoutHeaderBackground: '#001529',
    layoutHeaderHeight: '64px',
    layoutHeaderPadding: '0 50px',
    layoutHeaderColor: '@text-color',
    layoutFooterPadding: '24px 50px',
    layoutFooterBackground: '#f0f2f5', //@layout-body-background;
    layoutSiderBackground: '#001529', //@layout-header-background;
}