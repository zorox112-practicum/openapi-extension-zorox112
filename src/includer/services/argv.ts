import {CustomTag, OpenApiIncluderParams} from '../models';

type Config = Exclude<OpenApiIncluderParams['tags'], undefined>;

let _config: Config = {};

function init(config: Config) {
    _config = config || {};
}

function tags() {
    return _config;
}

function tag(id: string): CustomTag | undefined {
    return _config[id];
}

export default {init, tags, tag};
