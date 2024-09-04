import {evalExp} from '@diplodoc/transform/lib/liquid/evaluation';

import {OpenApiIncluderParams, Specification, V3Endpoint, V3Tag} from './models';

export function concatNewLine(prefix: string, suffix: string) {
    return prefix.trim().length ? `${prefix}<br>${suffix}` : suffix;
}

export function matchFilter(
    filter: OpenApiIncluderParams['filter'],
    vars: Record<string, string>,
    action: (endpoint: V3Endpoint, tag?: V3Tag) => void,
) {
    const {endpoint: endpointExpr, tag: tagExpr} = filter || {};
    const matchTag = tagExpr ? (tag: V3Tag) => evalExp(tagExpr as string, {...tag, vars}) : null;
    const matchEndpoint = endpointExpr
        ? (endpoint: V3Endpoint) => evalExp(endpointExpr, {...endpoint, vars})
        : null;

    return (spec: Specification): void => {
        const {tags, endpoints} = spec;

        for (const endpoint of endpoints) {
            if (matchEndpoint && matchEndpoint(endpoint)) {
                action(endpoint);
            }
        }

        for (const [, tag] of tags) {
            // eslint-disable-next-line no-shadow
            const {endpoints: endpointsOfTag} = tag;

            if (matchTag && matchTag(tag)) {
                for (const endpoint of endpointsOfTag) {
                    action(endpoint, tag);
                }
            }

            if (matchEndpoint) {
                for (const endpoint of endpointsOfTag) {
                    if (matchEndpoint(endpoint)) {
                        action(endpoint, tag);
                    }
                }
            }
        }
    };
}
