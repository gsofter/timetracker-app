import { getTokenColorsScopeSettings } from '../../../Themes/redux/utils';
import { IThemeState } from '../../../Themes/redux';
import { GlobalThemeSettings, LocalThemeSettings } from '../default-styles';


export const styleSheet = {
	siderMenuStyles: ({ theme, prefixCls }: { theme: IThemeState, prefixCls: string }) => {
		const { defaultSettings: { colors: { primaryColor }, type: themeName } } = theme;
		const {borderColorSplit, borderStyleBase, borderWidthBase, antPrefix } = GlobalThemeSettings;

		const headerColor = getTokenColorsScopeSettings(theme, 'header');
		// less variables
		const proLayoutSiderMenuPrefixCls = `${antPrefix}-pro-sider`;
		const navHeaderHeight = LocalThemeSettings.proLayoutHeaderHeight;
		const layoutSiderBackground = headerColor.background;
		return {
			[`& .${proLayoutSiderMenuPrefixCls}`]: {
				position: 'relative',
				'background-color': headerColor.background,
				borderRight: '0',
				transition: 'background-color 0.3s, min-width 0.3s, max-width 0.3s',

				[`& .${antPrefix}-menu`]: {
					background: 'transparent',
					'&-submenu-title': {
						'& span.anticon': {
							'transition': 'none',
						},
						'transition': 'none',
					},
					'&-item': {
						'& span.anticon': {
							'transition': 'none',
						},
						'transition': 'none',
					}
				},
				[`&.${antPrefix}-layout-sider-light`]: {
					[`& .${antPrefix}-menu-item a`]: {
						color: `${headerColor.foreground}`,
					},
					[`& .${antPrefix}-menu-item-selected a`]: {
						color: `${primaryColor}`,
					},
					[`& .${antPrefix}-menu-item a:hover`]: {
						color: `${primaryColor}`,
					}
				},

				'&-logo': {
					position: 'relative',
					display: 'flex',
					'align-items': 'center',
					padding: '16px 16px',
					'line-height': '32px',
					cursor: 'pointer',

					'> a': {
						display: 'flex',
						'align-items': 'center',
						'justify-content': 'center',
						'min-height': '32px',
					},

					'& img': {
						display: 'inline-block',
						height: '32px',
						'vertical-align': 'middle',
					},

					'& h1': {
						display: 'inline-block',
						height: '32px',
						margin: '0 0 0 12px',
						color: 'white',
						'font-weight': '600',
						'font-size': '18px',
						'line-height': '32px',
						'vertical-align': 'middle',
					},
				},

				'&-extra': {
					'margin-bottom': '16px',
					padding: '0 16px',
					'&-no-logo': {
						'margin-top': '16px',
					},
				},
				'&-menu': {
					position: 'relative',
					'z-index': '10',
					'min-height': '100%',
					'box-shadow': '2px 0 6px rgba(0, 21, 41, 0.35)',

					[`& span.${antPrefix}-pro-menu-item-title`]: {
						transition: 'none',
					},
				},
				[`& .${antPrefix}-layout-sider-children`]: {
					display: 'flex',
					'flex-direction': 'column',
					height: '100%',

					'::-webkit-scrollbar': {
						width: '6px',
						height: '6px',
					},

					'::-webkit-scrollbar-track': {
						background: 'rgba(255, 255, 255, 0.15)',
						'border-radius': '3px',
						'-webkit-box-shadow': 'inset 0 0 5px rgba(37, 37, 37, 0.05)',
					},

					/* 滚动条滑块 */
					'::-webkit-scrollbar-thumb': {
						background: 'rgba(255, 255, 255, 0.2)',
						'border-radius': '3px',
						'-webkit-box-shadow': 'inset 0 0 5px rgba(255, 255, 255, 0.05)',
					},
				},
				[`&.${antPrefix}-layout-sider-collapsed`]: {
					[`& .${antPrefix}-menu-inline-collapsed`]: {
						width: '48px',
					},
					[`& .${proLayoutSiderMenuPrefixCls}`]: {
						'&-logo': {
							padding: '16px 8px'
						}
					},
				},
				[`&.${antPrefix}-layout-sider.${proLayoutSiderMenuPrefixCls}-fixed`]: {
					position: 'fixed',
					top: '0',
					left: '0',
					'z-index': '100',
					height: '100%',
					overflow: 'auto',
					'overflow-x': 'hidden',
					'box-shadow': '2px 0 8px 0 rgba(29, 35, 41, 0.05)',
					[`> .${antPrefix}-menu-root`]: {
						[`:not(.${proLayoutSiderMenuPrefixCls}-link-menu)`]: {
							height: `~calc(100vh - ${navHeaderHeight})`,
							'overflow-y': 'auto',
						},
					},
				},

				'&-light': {
					[`& .${antPrefix}-layout-sider-children`]: {
						'::-webkit-scrollbar-track': {
							background: 'rgba(0, 0, 0, 0.06)',
							'border-radius': '3px',
							'-webkit-box-shadow': 'inset 0 0 5px rgba(0, 21, 41, 0.05)',
						},

						/* 滚动条滑块 */
						'::-webkit-scrollbar-thumb': {
							background: 'rgba(0, 0, 0, 0.12)',
							'border-radius': '3px',
							'-webkit-box-shadow': 'inset 0 0 5px rgba(0, 21, 41, 0.05)',
						},
					},

					'background-color': '#fff', // @white
					'box-shadow': '2px 0 8px 0 rgba(29, 35, 41, 0.05)',
					[`& .${proLayoutSiderMenuPrefixCls}-logo`]: {
						'& h1': {
							color: `${primaryColor}`,
						},
					},
					[`& .${antPrefix}-menu-light`]: {
						'border-right-color': 'transparent',
					},

					[`& .${proLayoutSiderMenuPrefixCls}-collapsed-button`]: {
						'border-top': `${borderWidthBase} ${borderStyleBase} ${borderColorSplit}`,
					},
				},

				'&-icon': {
					width: '14px',
					'vertical-align': 'baseline',
				},

				'&-links': {
					width: '100%',
					[`& ul.${antPrefix}-menu-root`]: {
						height: 'auto',
					},
				},

				'&-collapsed-button': {
					'border-top': `${borderWidthBase} ${borderStyleBase} rgba(0, 0, 0, 0.25)`,
					'& .anticon': {
						'font-size': '16px',
					},
				},

				[`& .top-nav-menu li.${antPrefix}-menu-item`]: {
					height: '100%',
					'line-height': '1',
				},
				'& .drawer .drawer-content': {
					background: `${layoutSiderBackground}`,
				},
			},
		};
	}
}

