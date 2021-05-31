import './src/config/public-config';
import {AppRegistry} from 'react-native';
import {expo} from './app.json'
import App from './src/App';

export default App;

AppRegistry.registerComponent(expo.name, () => App);