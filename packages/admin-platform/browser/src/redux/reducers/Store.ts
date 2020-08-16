export namespace Store {
    export type Counter = { value: number };

    export type Sample = {
        '@admin-layout/counter': Counter,
        '@admin-layout/isSaving': boolean,
        '@admin-layout/isLoading': boolean,
        '@admin-layout/error': string,
    };
}
