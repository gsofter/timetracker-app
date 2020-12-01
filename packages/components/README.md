# Components


It has `layout` component which is sync with https://github.com/reboxjs/pro-components/tree/master/packages/layout



1. We can track the new changes from `ant-desig/pro-components` by create a PR agains the cloned repository `reboxjs/pro-components` like below. 

https://github.com/reboxjs/pro-components/pull/1

We create the PR with name as the date when it was created so we can see if any layout changes has happen then we sync those change mannually in this package.


2. We don't use `less` styles as in `ant-design/pro-components`. Instead we convert them to `css` and add into the stylesheet object so `Fela` package can absorb them. 


Following tools will help to migrate `less` to `css` format. 


Less to Css
Following tool helps convert from less to css. 

https://jsonformatter.org/less-to-css

You need to define few variables before you run it. 

For example like below and copy rest of the `less` styles of the component in it. 


```
@ant-prefix: ant;
@basicLayout-prefix-cls: ant-pro-basicLayout;
```

[image](./docs/less-to-css-screenshot.png)



css-beautify: to check the converted css from fela when open the app page and beautify it using following tool. 
https://www.cleancss.com/css-beautify/



3. Write tests for fela styles so the styles can be compared. 

https://fela.js.org/docs/recipes/TestingFelaComponents.html