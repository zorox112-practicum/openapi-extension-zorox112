import path from 'node:path';
import {OpenAPIV3} from 'openapi-types';
import {includerFunction} from '../../includer';
import {when} from 'jest-when';
import {dump} from 'js-yaml';
import {fs} from './virtualFS';
import nodeFS from 'fs';

export const PERSET_PATH = path.resolve('spec.yaml');

const baseDocument = {
    openapi: '3.0.2',
    info: {
        title: 'OpenAPI definition',
        version: 'v0',
    },
    servers: [
        {
            url: 'http://localhost:8080',
            description: 'Generated server url',
        },
    ],
};

type Schema = {
    description?: string;
} & OpenAPIV3.MediaTypeObject;

export class DocumentBuilder {
    static oneOf<T extends unknown[]>(...variants: T): T {
        return variants;
    }

    static allOf<T extends unknown[]>(...variants: T): T {
        return variants;
    }

    private id: string;
    private responses: [code: number, response: OpenAPIV3.ResponseObject][] = [];
    private parameters: OpenAPIV3.ParameterObject[] = [];
    private requestBody?: OpenAPIV3.RequestBodyObject = undefined;

    constructor(id: string) {
        this.id = id;
    }

    response(code: number, skeleton: Schema) {
        const {description, ...schema} = skeleton;
        const response: OpenAPIV3.ResponseObject = {
            description: description || '',
            content: {
                'application/json': schema,
            },
        };

        this.responses.push([code, response]);

        return this;
    }

    request(skeleton: Schema) {
        if (this.requestBody) {
            throw new Error('Test case error: request can\'t have several requests');
        }
        const {description, ...schema} = skeleton;
        const request: OpenAPIV3.RequestBodyObject = {
            description: description,
            content: {
                'application/json': schema,

            },
        };

        this.requestBody = request;

        return this;
    }

    parameter(parameter: OpenAPIV3.ParameterObject) {
        this.parameters.push(parameter);

        return this;
    }

    build(): OpenAPIV3.Document {
        if (!this.responses.length) {
            throw new Error('Test case error: endpoint can\'t have no responses');
        }

        return {
            ...baseDocument,
            paths: {
                '/test': {
                    post: {
                        requestBody: this.requestBody,
                        operationId: this.id,
                        responses: Object.fromEntries(this.responses),
                    },
                    parameters: this.parameters,
                },
            },
        };
    }

}

export function run(spec: OpenAPIV3.Document) {
    const id = Date.now().toString();
    const yaml = dump(spec);

    console.log(yaml);

    when(jest.spyOn(nodeFS, 'readFile')).mockImplementation((_, callback) => {
        callback(null, Buffer.from(yaml, 'utf-8'));
    });

    when(jest.spyOn(nodeFS.promises, 'writeFile')).mockImplementation(async (file, content) => {
        fs.writeFile(file.toString(), content);
    });

    when(jest.spyOn(nodeFS.promises, 'mkdir')).mockImplementation(async () => undefined);

    return includerFunction({
        index: 0,
        readBasePath: '',
        writeBasePath: '',
        vars: {},
        passedParams: {
            input: id,
        },
        tocPath: 'toc',
        item: {
            name: id,
            href: '',
            include: {
                path: 'openapi',
                repo: '__tests__',
            },
            items: [],
        },
    });
}

