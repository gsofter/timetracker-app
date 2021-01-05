import { IThemeSettings } from '../../../Themes/interfaces';
import { GlobalThemeSettings } from '../default-styles';


export const styleSheet = {
	pageContainer: ({ theme }: { theme: IThemeSettings }) => {
		const { antPrefix, screenLg, screenMd, screenSm, screenXl } = GlobalThemeSettings;

		// less variables
		const proLayoutPageContainer = `${antPrefix}-pro-page-container`;


		return {
			[`& .${proLayoutPageContainer}-children-content`]: {
				margin: '24px 24px 0',
			},
			[`& .${proLayoutPageContainer}`]: {

				'&-warp': {
					'background-color': `${GlobalThemeSettings.componentBackground}`,
					[`& .${antPrefix}-tabs-nav`]: {
						margin: '0',
					},
				},
				'&-ghost': {
					[`& .${proLayoutPageContainer}-warp`]: {
						'background-color': 'transparent',
					},

					[`& .${proLayoutPageContainer}-children-content`]: {
						'margin-top': '0',
					}
				}
			},
			[`& .${proLayoutPageContainer}-main`]: {
				[`& .${proLayoutPageContainer}-detail`]: {
					display: 'flex',
				},

				[`& .${proLayoutPageContainer}-row`]: {
					display: 'flex',
					width: '100%',
				},

				[`& .${proLayoutPageContainer}-title-content`]: {
					'margin-bottom': '16px',
				},

				[`& .${proLayoutPageContainer}-title`]: {
					flex: 'auto',

				},
				[`& .${proLayoutPageContainer}-content`]: { // merge it into one
					flex: 'auto',
					'margin-bottom': '16px',
				},

				[`& .${proLayoutPageContainer}-extraContent`]: { // merge it into one
					flex: '0 1 auto',
					'min-width': '242px',
					'margin-left': '88px',
					'text-align': 'right',
				},
				[`& .${proLayoutPageContainer}-main`]: {
					flex: '0 1 auto',

					width: '100%',
				},
				[`& .${proLayoutPageContainer}-logo`]: {
					'margin-bottom': '16px',
				},
			},
			[`@media screen and (max-width: ${screenXl})`]: {
				[`& .${proLayoutPageContainer}-main`]: {
					[`& .${proLayoutPageContainer}-extraContent`]: {
						'margin-left': '44px',
					}
				}
			},
			
			[`@media screen and (max-width: ${screenLg})`]: {
				[`& .${proLayoutPageContainer}-main`]: {
					[`& .${proLayoutPageContainer}-extraContent`]: {
						'margin-left': '20px',
					}
				}
			},
			
			[`@media screen and (max-width: ${screenMd})`]: {
				[`& .${proLayoutPageContainer}-main`]: {
					[`& .${proLayoutPageContainer}-row`]: {
						display: 'block',
					},
			
					[`& .${proLayoutPageContainer}-action`]: {
						'margin-left': '0',
						'text-align': 'left',
					},
					[`& .${proLayoutPageContainer}-extraContent`]: {
						'margin-left': '0',
						'text-align': 'left',
					}
				}
			},
			
			[`@media screen and (max-width: ${screenSm})`]: {
				[`& .${proLayoutPageContainer}-detail`]: {
					display: 'block',
				},
				[`& .${proLayoutPageContainer}-extraContent`]: {
					'margin-left': '0',
				},
			}
		};
	},
};
