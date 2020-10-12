import * as React from 'react';
import { connect } from 'react-redux';
const { compose } = require('redux');
import { ThemeProvider } from 'react-fela';
import { loadTheme } from '../redux';
import { WorkbenchComponent } from '../components';
import { getTheme } from '../redux';

export interface IProps {
  currentTheme?: any;
  loadTheme?: Function;
}

const currentTheme = getTheme(localStorage.getItem('site-theme') || 'light');

export class WorkbenchTheme extends React.Component<IProps, {}> {
  public componentDidMount() {
    this.props.loadTheme();
  }

  public render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={currentTheme}>
        <WorkbenchComponent>{children}</WorkbenchComponent>
      </ThemeProvider>
    );
  }
}

export default compose(
  ...[
    connect(
      (state: any) => ({
        currentTheme: state.theme,
      }),
      dispatch => ({
        loadTheme: () => dispatch(loadTheme()),
      }),
    ),
  ])(WorkbenchTheme);
