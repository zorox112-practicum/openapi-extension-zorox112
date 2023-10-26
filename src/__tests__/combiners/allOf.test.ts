import {DocumentBuilder, run} from '../__helpers__/run';

describe('allOf operator support', () => {
    it('renders simple allOf', async () => {
        const spec = new DocumentBuilder('allOf')
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
            .component('Mice', {
                allOf: [DocumentBuilder.ref('Cat')],
            })
            .request({
                schema: {
                    allOf: [
                        DocumentBuilder.ref('Cat'),
                        {
                            properties: {
                                name: {
                                    type: 'string',
                                },
                            },
                        },
                    ],
                },
            })
            .response(200, {
                description: 'Base 200 response',
                schema: {
                    properties: {
                        name: {
                            type: 'string',
                            default: 'a',
                        },
                    },
                    allOf: [DocumentBuilder.ref('Dog')],
                },
            })
            .build();

        const fs = await run(spec);

        const page = fs.match('allOf');

        expect(page).toMatchSnapshot();
    });

    it('renders single allOf', async () => {
        const spec = new DocumentBuilder('allOf')
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
            .component('Mice', {
                allOf: [DocumentBuilder.ref('Cat')],
            })
            .request({
                schema: {
                    properties: {
                        pet: {
                            allOf: [DocumentBuilder.ref('Mice')],
                        },
                    },
                },
            })
            .response(200, {
                description: 'Base 200 response',
                schema: {
                    properties: {
                        pet: {
                            allOf: [DocumentBuilder.ref('Mice')],
                        },
                    },
                },
            })
            .build();

        const fs = await run(spec);

        const page = fs.match('allOf');

        expect(page).toMatchSnapshot();
    });
});
