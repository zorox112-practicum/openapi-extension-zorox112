import {DocumentBuilder, run} from '../__helpers__/run';

const name = 'complex';
describe('operators complex test', () => {
    it('renders ok', async () => {
        const spec = new DocumentBuilder(name)
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
                    bar: {
                        type: 'string',
                    },
                },
                description: 'Dog class',
            })
            .request({
                schema: {
                    oneOf: [DocumentBuilder.ref('Dog'), DocumentBuilder.ref('Cat')],
                    properties: {
                        name: {
                            type: 'string',
                            default: 'b',
                        },
                        age: {
                            allOf: [
                                {
                                    oneOf: [
                                        {
                                            allOf: [
                                                {
                                                    type: 'number',
                                                    default: 10,
                                                },
                                            ],
                                        },
                                        {
                                            allOf: [
                                                {
                                                    type: 'boolean',
                                                    default: true,
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                },
            })
            .response(200, {
                description: 'Base 200 response',
                schema: {
                    oneOf: [DocumentBuilder.ref('Dog'), DocumentBuilder.ref('Cat')],
                    properties: {
                        name: {
                            type: 'string',
                            default: 'b',
                        },
                        age: {
                            allOf: [
                                {
                                    oneOf: [
                                        {
                                            allOf: [
                                                {
                                                    type: 'number',
                                                    default: 10,
                                                },
                                            ],
                                        },
                                        {
                                            allOf: [
                                                {
                                                    type: 'boolean',
                                                    default: true,
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                },
            })
            .build();

        const fs = await run(spec);

        const page = fs.match(name);

        expect(page).toMatchSnapshot();
    });
});
