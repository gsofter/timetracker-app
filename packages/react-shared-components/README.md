# React Shared Components


This package is suppose to have customized components for this App

It has layout components similar to `ant-design/ant-design-pro/tree/master/src/layouts`. 

1. We can track the new changes from `ant-desig/ant-design-pro` by create a PR agains the cloned repository `reboxjs/ant-design-pro` like below. 

https://github.com/reboxjs/ant-design-pro/pull/1

We create the PR with name as the date (of last snap clone) when it was created so we can see if any layout components changes has happen then we sync those change mannually in this package.

2. We use `less` as in `ant-design-pro` and they need to be converted to `fela` styles. 

3. We don't use some of the ant related packages for `routes`, `history` or anything starts in their `imports {...} from '@/....'` we use natively. 
