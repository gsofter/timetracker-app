

import { PureSettings } from './defaultSettings';
import { WithFalse } from '../interfaces';
import { GlobalHeaderProps } from './GlobalHeader';

export type HeaderViewProps = Partial<PureSettings> &
  GlobalHeaderProps & {
    isMobile?: boolean;
    collapsed?: boolean;
    logo?: React.ReactNode;

    headerRender?: WithFalse<
      (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
    >;
    headerTitleRender?: WithFalse<
      (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
    >;
    headerContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
    siderWidth?: number;
    hasSiderMenu?: boolean;
  };

interface HeaderViewState {
  visible: boolean;
}
