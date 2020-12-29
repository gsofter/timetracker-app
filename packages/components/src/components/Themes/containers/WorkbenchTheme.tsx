import * as React from 'react';
import { connect } from 'react-redux';
const { compose } = require('redux');
import { ThemeProvider } from 'react-fela';
import { loadTheme } from '../redux';
import { WorkbenchComponent } from '../components';

export interface IProps {
  themeReducer?: any;
  settings?: any;
  loadTheme?: Function;
}

export class WorkbenchTheme extends React.Component<IProps, {}> {
  public componentDidMount() {
    this.props.loadTheme();
  }

  public render() {
    const { themeReducer, children, settings } = this.props;
    const theme = { ...themeReducer, primaryColor: settings.primaryColor };
    return (
      <ThemeProvider theme={theme}>
        <WorkbenchComponent>{children}</WorkbenchComponent>
      </ThemeProvider>
    );
  }
}

export default compose(
  ...[
    connect(
      (state: any) => ({
        themeReducer: state.themeReducer,
        settings: state.settings, //@sri modified ...
      }),
      dispatch => ({
        loadTheme: () => dispatch(loadTheme()),
      }),
    ),
  ],
)(WorkbenchTheme);
