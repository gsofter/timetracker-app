import { createBrowserHistory, createMemoryHistory, createHashHistory } from 'history';

if (__CLIENT__) {
    module.exports = createMemoryHistory();
} else {
    module.exports = (url) => createMemoryHistory({
        initialEntries: [url],
    });
}
