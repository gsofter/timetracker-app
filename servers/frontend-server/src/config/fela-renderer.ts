import { createRenderer, IRenderer } from 'fela';
import webPreset from 'fela-preset-web';

export default () => {
  const renderer = createRenderer({
    plugins: [
      ...webPreset,
    ],
    devMode: process.env.NODE_ENV ? process.env.NODE_ENV !== 'production' : false,
  });
  renderer.renderStatic(
    `
        html, body, #root{
            height: 100%;
          }
          .ant-picker-dropdown, .ant-select-dropdown {
            
          }
          @media only screen and (min-width: 768px) {
            .userMenuMenuStyle {
              position: fixed;
              bottom: 40px;
              display: inline-table;
            }
          }
        `,
  );

  return renderer;
};

