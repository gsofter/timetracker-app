import React from 'react';

import Spinner from '../Spinner';

export interface ILoading {
    flag?: boolean;
    children?: any;
    mode: string;
    withLogo?: boolean;
    width?: string | number;
    height?: string | number;
    circle?: string | number | boolean;
}

export const Loading: React.FC<ILoading> = ({ flag, children, mode, withLogo, width, height, circle }) => {
    if (mode === 'overlay' && width && height) {
        const style = width && height ? { width, height } : {};

        return flag ? (
            <div style={{ display: 'inline-block', position: 'relative', ...style }}>
                <Spinner mode={mode} circle={circle} withLogo={withLogo} />
                {children}
            </div>
        ) : (
            children
        );
    } else if (mode === 'overlay') {
        return flag ? (
            <>
                <Spinner mode={mode} withLogo={withLogo}/>
                {children}
            </>
        ) : (
            children
        );
    } else {
        return flag ? <Spinner mode={mode} withLogo={withLogo} /> : children;
    }
};
