
import * as R from 'ramda';


export const convertQueryStrToObj = R.curry(queryStr => {
    // i.e. ?pathname=checkout&somethingelse=x
    // returns {pathname: 'checkout', somethingelse: 'x'}
    if (R.isNil(queryStr)) { return; }
    return R.compose(R.fromPairs, R.map(R.split('=')), R.split('&'), R.replace('?', ''))(queryStr);
  });
