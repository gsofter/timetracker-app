import * as React from 'react';
import { useFela } from 'react-fela';

export interface IProps {
  showModal?: boolean;
  handleClose?: () => void;
  modalTitle: string;
  modalBody?: JSX.Element;
  modalFooter?: JSX.Element;
}

export const Modal: React.SFC<IProps> = ({
  showModal,
  handleClose,
  modalTitle,
  modalBody,
  modalFooter,
}) => {
  const { css } = useFela();
  return (
    <div className={css(stylesheet.styles)}>
      <div
        className="modalDialog"
        style={{ display: `${showModal ? 'block' : 'none'}` }}
      >
        <div style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
          <a
            href="#close"
            title="Close"
            className="close"
            onClick={handleClose}
          >
            X
          </a>
          <h2>{modalTitle}</h2>
          <div className="modalBody">{modalBody}</div>
          <footer>{modalFooter}</footer>
        </div>
      </div>
    </div>
  );
};

const stylesheet: any = {
  styles: (theme) => ({
    position: 'relative',
    zIndex: 1011,
    '& .modalDialog': {
      position: 'fixed',
      height: '100%',
      width: '100%',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      zIndex: 1,
      transition: 'opacity 100ms ease-in',
    },
    '& .modalDialog > div': {
      maxWidth: '800px',
      width: '70%',
      position: 'relative',
      margin: '2% auto',
      padding: '20px',
      borderRadius: '3px',
      background: '#fff',
      zIndex: '10000',
      height: '90%',
    },
    '& .close': {
      background: '#1890ff',
      color: '#fff',
      lineHeight: '25px',
      position: 'absolute',
      right: '-12px',
      textAlign: 'center',
      top: '-10px',
      width: '34px',
      height: '34px',
      textDecoration: 'none',
      fontWeight: 'bold',
      borderRadius: '50%',
      boxShadow: '1px 1px 3px #000',
      paddingTop: '5px',
      zIndex: 11111,
    },
    '& .close:hover': {
      background: '#1890ff',
    },
  }),
};
