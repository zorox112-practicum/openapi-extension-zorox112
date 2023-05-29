import {Stage} from '../types';

export type VarsPreset = 'internal'|'external';

export type YfmPreset = Record<string, string>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Metadata = Record<string, any>;

export enum IncludeMode {
    ROOT_MERGE = 'root_merge',
    MERGE = 'merge',
    LINK = 'link'
}

export interface Filter {
    when?: boolean|string;
    [key: string]: unknown;
}

export interface TextItem extends Filter {
    text: string | string[];
}

export type TextItems = string | (TextItem | string)[];

export interface YfmToc extends Filter {
    name: string;
    href: string;
    items: YfmToc[];
    stage?: Stage;
    base?: string;
    title?: TextItems;
    include?: YfmTocInclude;
    id?: string;
    singlePage?: boolean;
    hidden?: boolean;
}

export interface YfmTocItem extends Filter {
    name: string;
    href?: string;
    items?: YfmTocItem[];
    include?: YfmTocInclude;
    id?: string;
}

export interface YfmTocInclude {
    repo: string;
    path: string;
    mode?: IncludeMode;
    includers?: YfmTocIncluders;
}

export type YfmTocIncluders = YfmTocIncluder[];

export type YfmTocIncluder = {
    name: 'openapi';
    // arbitrary includer parameters
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & Record<string, unknown>;


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Includer<FnParams = any> = {
    name: 'openapi';
    includerFunction: IncluderFunction<FnParams>;
};

export type IncluderFunction<PassedParams> = (args: IncluderFunctionParams<PassedParams>) => Promise<void>;

export type IncluderFunctionParams<PassedParams> = {
    /** item that contains include that uses includer */
    item: YfmToc;
    /** base read directory path */
    readBasePath: string;
    /** base write directory path */
    writeBasePath: string;
    /** toc with includer path */
    tocPath: string;
    vars: YfmPreset;
    /** arbitrary includer parameters */
    passedParams: PassedParams;
    index: number;
};
