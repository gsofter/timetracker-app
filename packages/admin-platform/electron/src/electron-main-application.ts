import { inject, injectable, named } from 'inversify';
import * as path from 'path';
import { Argv } from 'yargs';


/**
 * Fields related to a launch event.
 * 
 * This kind of event is triggered in two different contexts:
 * 1. The app is launched for the first time, `secondInstance` is false.
 * 2. The app is already running but user relaunches it, `secondInstacne` is true.
 */
export interface ElectronMainExecutionParams {
    readonly secondIntance: boolean;
    readonly argv: string[];
    readonly cwd: string;
}

export const ElectronMainApplicationGlobals = Symbol('ElectronMainApplicationGlobals');
export interface ElecctronMainApplicationGlobals {
    readonly APP_PROJECT_PATH: string;
    readonly BACKEND_MAIN_PATH: string;
    readonly FRONTEND_HTML_PATH: string;
}

export const ElectronMainApplicationContribution = Symbol('ElectronMainApplicationContribution');
export interface ElectronMainApplicationContribution {
    /**
     * The application is ready and is starting. This is the time to initialize
     * services global to this process.
     * 
     * Invoked when the electron-main process starts for the first time.
     */
    onStart?(application: ElectronMainApplication): PromiseLike<void>;
    /**
     * The application is stopping. Contributions must perform only synchronous operations.
     */
    onStop?(application: ElectronMainApplication): void;
}

@injectable()
export class ElectronMainApplication {

    @inject(ContributionProvider)
    @named(ElectronMainApplicationContribution)
    protected readonly contributions: ContributionProvider<ElectronMainApplicationContribution>;

    @inject(ElectronMainApplicationGlobals)
    protected readonly globals: ElectronMainApplicationGlobals;

    @inject(ElectronMainProcessArgv)
    protected processArgv: ElectronMainProcessArgv;

    @inject(ElectronSecurityToken)
    protected readonly electronSecurityToken: ElectronSecurityToken;

    protected readonly electronStorage = new Stroage();

    protected readonly _backendPort = new Deferred<number>();
    readonly backendPort = this._backendPort.promise;

    async start(config:)
}