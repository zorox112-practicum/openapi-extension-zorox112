import {OpenapiMD} from '../typings';

function isMetaOrHTML(line: string): boolean {
    return line.includes('<');
}

export function clear(md: OpenapiMD): OpenapiMD {
    const lines = md.split('\n').filter((line) => !isMetaOrHTML(line));

    return lines.join('\n');
}
