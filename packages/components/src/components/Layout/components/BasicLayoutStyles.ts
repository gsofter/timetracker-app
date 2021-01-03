import { getTokenColorsScopeSettings } from '../../Themes/redux/utils';
import { IThemeState } from '../../Themes/redux';
import { GlobalThemeSettings, LocalThemeSettings } from './default-styles';
import { Property, Properties } from 'csstype';


export const styleSheet = {
	basicLayout: ({ theme, prefixCls }: { theme: IThemeState, prefixCls: string }) => {
		const { defaultSettings: { colors: { primaryColor }, } } = theme;
		const { antPrefix } = GlobalThemeSettings;
		// less variables
		const basicLayoutPrefixCls = `${antPrefix}-pro-basicLayout`;
		const proLayoutHeaderHeight = LocalThemeSettings.proLayoutHeaderHeight;
		return {
			// @sri modified to work with Fela
			display: 'flex',
			width: '100%',
			'min-height': '100%',
			[`& .${basicLayoutPrefixCls}`]: {
			// BFC
			display: 'flex',
			'flex-direction': 'column',
			width: '100%',
			'min-height': '100%',

				[`& .${antPrefix}-layout-header`]: {
					[`&.${antPrefix}-pro-fixed-header`]: {
						position: 'fixed',
						top: '0',
					}
				},

				'&-content': {
					position: 'relative',
					margin: '24px',

					[`& .${antPrefix}-pro-page-container`]: {
						margin: '-24px -24px 0',
					},

					'&-disable-margin': {
						margin: '0',

						[`& .${antPrefix}-pro-page-container`]: {
							margin: '0',
						}
					},
					[`> .${antPrefix}-layout`]: {
						'max-height': '100%',
					}
				},

				// children should support fixed
				[`& .${basicLayoutPrefixCls}-is-children.${basicLayoutPrefixCls}-fix-siderbar`]: {
					height: '100vh',
					overflow: 'hidden',
					transform: 'rotate(0)',
				},

				[`& .${basicLayoutPrefixCls}-has-header`]: {
					// tech-page-container
					'& .tech-page-container': {
						height: `calc(100vh - ${proLayoutHeaderHeight})`,
					},
					[`& .${basicLayoutPrefixCls}-is-children.${basicLayoutPrefixCls}-has-header`]: {
						'& .tech-page-container': {
							height: `calc(100vh - ${proLayoutHeaderHeight} - ${proLayoutHeaderHeight})`,
						},
						[`& .${basicLayoutPrefixCls}-is-children`]: {
							'min-height': `calc(100vh - ${proLayoutHeaderHeight})`,
							[`&.${basicLayoutPrefixCls}-fix-siderbar`]: {
								height: `calc(100vh - ${proLayoutHeaderHeight})`,
							}
						}
					}
				}
			}
		};
	},
};
