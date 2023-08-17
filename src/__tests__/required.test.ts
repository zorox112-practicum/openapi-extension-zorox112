import {DocumentBuilder, run} from './__helpers__/run';

describe('description', () => {
    it('renders correct description', async () => {
        const spec = new DocumentBuilder('description')
            .parameter({
                name: 'a',
                in: 'query',
                schema: {
                    type: 'number',
                },
            })
            .parameter(
                {
                    name: 'b',
                    in: 'query',
                    required: false,
                    schema: {
                        type: 'number',
                    },
                })
            .parameter({
                name: 'c',
                in: 'query',
                required: true,
                schema: {
                    type: 'number',
                },
            })
            .request({schema: {
                type: 'object',
                properties: {
                    a: {
                        type: 'number',
                    },
                    b: {
                        type: 'number',
                    },
                    c: {
                        type: 'number',
                    },
                },
                required: [
                    'a',
                ],
                allOf: [{
                    properties: {
                        d: {
                            type: 'number',
                        },
                        e: {
                            type: 'number',
                        },
                    },
                    required: [
                        'b',
                        'd',
                    ],
                }],
            }})
            .response(200, {
                schema: {
                    type: 'object',
                    properties: {
                        type: {
                            type: 'string',
                        },
                        foo: {
                            type: 'string',
                        },
                    },
                },
                description: 'Cat class',
            })
            ;


        const fs = await run(spec.build());

        const page = fs.match('description.md');

        expect(page).toMatchSnapshot();
    });

});
