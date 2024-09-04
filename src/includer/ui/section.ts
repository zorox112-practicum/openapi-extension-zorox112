/* eslint-disable-next-line no-shadow */
import {ENDPOINTS_SECTION_NAME} from '../constants';
import {V3Endpoint, V3Endpoints, V3Tag} from '../models';

import {block, body, link, list, page, title} from './common';

function section(tag: V3Tag) {
    const sectionPage = [
        title(1)(tag.name),
        description(tag.description),
        endpoints(tag.endpoints),
    ];

    return page(block(sectionPage));
}

function description(text?: string) {
    return text?.length && body(text);
}

function endpoints(data?: V3Endpoints) {
    const visibleEndpoints = data?.filter((ep) => !ep.hidden);
    const linkMap = ({id, summary}: V3Endpoint) => link(summary ?? id, id + '.md');

    return (
        visibleEndpoints?.length &&
        block([title(2)(ENDPOINTS_SECTION_NAME), list(visibleEndpoints.map(linkMap))])
    );
}

export {section};

export default {section};
