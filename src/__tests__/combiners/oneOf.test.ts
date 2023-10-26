import {DocumentBuilder, run} from '../__helpers__/run';

describe('oneOf operator support', () => {
    it('renders empty', async () => {
        const spec = new DocumentBuilder('oneOf')
            .component('Cat', {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                    },
                    foo: {
                        type: 'string',
                    },
                },
                description: 'Cat class',
            })
            .component('Dog', {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                    },
                    baz: {
                        type: 'string',
                    },
                },
                description: 'Dog class',
            })
            .request({
                schema: {
                    oneOf: [DocumentBuilder.ref('Dog'), DocumentBuilder.ref('Cat')],
                },
            })
            .response(200, {
                schema: {
                    description: 'Base 200 response',
                    oneOf: [DocumentBuilder.ref('Dog'), DocumentBuilder.ref('Cat')],
                },
            })
            .build();

        const fs = await run(spec);

        const page = fs.match('oneOf');

        expect(page).toMatchSnapshot();
    });

    it('renders filled', async () => {
        const spec = new DocumentBuilder('oneOf')
            .component('Cat', {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                    },
                    foo: {
                        type: 'string',
                    },
                },
                description: 'Cat class',
            })
            .component('Dog', {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                    },
                    baz: {
                        type: 'string',
                    },
                },
                description: 'Dog class',
            })
            .request({
                schema: {
                    properties: {
                        name: {
                            type: 'string',
                        },
                        age: {
                            type: 'number',
                        },
                    },
                    oneOf: [DocumentBuilder.ref('Dog'), DocumentBuilder.ref('Cat')],
                },
            })
            .response(200, {
                schema: {
                    description: 'Base 200 response',
                    properties: {
                        name: {
                            type: 'string',
                        },
                        age: {
                            type: 'number',
                        },
                    },
                    oneOf: [DocumentBuilder.ref('Dog'), DocumentBuilder.ref('Cat')],
                },
            })
            .build();

        const fs = await run(spec);

        const page = fs.match('oneOf');

        expect(page).toMatchSnapshot();
    });

    it('renders parameter', async () => {
        const spec = new DocumentBuilder('oneOf')
            .component('Cat', {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                    },
                    foo: {
                        type: 'string',
                    },
                },
                description: 'Cat class',
            })
            .component('Dog', {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                    },
                    baz: {
                        type: 'string',
                    },
                },
                description: 'Dog class',
            })
            .request({
                schema: {
                    properties: {
                        pet: {
                            oneOf: [DocumentBuilder.ref('Dog'), DocumentBuilder.ref('Cat')],
                        },
                    },
                    oneOf: [DocumentBuilder.ref('Dog'), DocumentBuilder.ref('Cat')],
                },
            })
            .response(200, {
                schema: {
                    description: 'Base 200 response',
                    properties: {
                        pet: {
                            oneOf: [DocumentBuilder.ref('Dog'), DocumentBuilder.ref('Cat')],
                        },
                    },
                    oneOf: [DocumentBuilder.ref('Dog'), DocumentBuilder.ref('Cat')],
                },
            })
            .build();

        const fs = await run(spec);

        const page = fs.match('oneOf');

        expect(page).toMatchSnapshot();
    });
});
