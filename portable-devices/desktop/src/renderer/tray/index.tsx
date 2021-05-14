import { createRenderer } from 'fela';
import React from 'react';
import { RendererProvider } from 'react-fela';
import HeaderTimerHandler from './HeaderTimerHandler';

const CustomMenu = () => {
    const renderer = createRenderer();

    return (
        <div>
            <RendererProvider renderer={renderer}>
                <HeaderTimerHandler />
            </RendererProvider>
        </div>
    );
};

export default function App() {
    return (<CustomMenu />);
}