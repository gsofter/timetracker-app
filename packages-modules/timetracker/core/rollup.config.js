import graphql from '@rollup/plugin-graphql';
import image from '@rollup/plugin-image';
import typescript from '@rollup/plugin-typescript';
import { string } from 'rollup-plugin-string';

const bundle = (config) => ({
    ...config,
    input: ['src/index.ts', 'src/generated/react-hooks.ts'],
    // marking all node modules as external
    external: (id) => !/^[./]/.test(id),
});

export default [
    bundle({
        plugins: [
            typescript(),
            image(),
            graphql({
                include: '**/*.gql',
            }),
            string({
                include: '**/*.graphql',
            }),
        ],
        output: [
            {
                dir: 'lib',
                format: 'es',
                name: 'timetracker-core',
                compact: true,
                exports: 'named',
                sourcemap: true,
                preserveModules: true,
                chunkFileNames: '[name]-[hash].[format].js',
            },
        ],
    }),
];
