import {JSONSchema6} from 'json-schema';

export const EOL = '\n';
export const TAG_NAMES_FIELD = 'x-navtitle';
export const BLOCK = EOL.repeat(2);
export const INFO_TAB_NAME = 'Info';
export const SANDBOX_TAB_NAME = 'Sandbox';
export const CONTACTS_SECTION_NAME = 'Contacts';
export const TAGS_SECTION_NAME = 'Sections';
export const ENDPOINTS_SECTION_NAME = 'Endpoints';
export const REQUEST_SECTION_NAME = 'Request';
export const PATH_PARAMETERS_SECTION_NAME = 'Path parameters';
export const HEADERS_SECTION_NAME = 'Headers';
export const QUERY_PARAMETERS_SECTION_NAME = 'Query parameters';
export const COOKIES_SECTION_NAME = 'Cookies';
export const RESPONSES_SECTION_NAME = 'Responses';
export const HTML_COMMENTS_OPEN_DIRECTIVE = '<!--';
export const HTML_COMMENTS_CLOSE_DIRECTIVE = '-->';
export const DISABLE_LINTER_DIRECTIVE = 'markdownlint-disable-file';
export const SPEC_SECTION_NAME = 'Specification';
export const SPEC_SECTION_TYPE = 'Open API';
export const LEADING_PAGE_NAME_DEFAULT = 'Overview';

export const PRIMITIVE_JSON6_SCHEMA_TYPES =
    new Set<JSONSchema6['type']>(['string', 'boolean', 'null', 'number', 'integer']);
