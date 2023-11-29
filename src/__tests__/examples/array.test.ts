import {DocumentBuilder, run} from '../__helpers__/run';

const name = 'example.array';
describe('openapi project with examples', () => {
    it('renders example field', async () => {
        const spec = new DocumentBuilder(name)
            .request({
                schema: {
                    example: [
                        {
                            test: 1,
                        },
                        {
                            test: 2,
                        },
                    ],
                    type: 'array',
                    items: {},
                },
            })
            .response(200, {
                description: 'Base 200 response',
                schema: {
                    type: 'object',
                },
            })
            .build();

        const fs = await run(spec);

        const page = fs.match(name);

        expect(page).toMatchSnapshot();
    });

    it('renders infered example', async () => {
        const spec = new DocumentBuilder(name)
            .request({
                schema: {
                    type: 'array',
                    items: DocumentBuilder.ref('Cat'),
                },
            })
            .response(200, {
                description: 'Base 200 response',
                schema: {
                    type: 'object',
                },
            })
            .component('Cat', {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                    },
                },
            })
            .build();

        const fs = await run(spec);

        const page = fs.match(name);

        expect(page).toMatchSnapshot();
    });

    it('renders nested arrays exmaple', async () => {
        const spec = new DocumentBuilder(name)
            .request({
                schema: {
                    type: 'array',
                    items: {
                        type: 'array',
                        items: DocumentBuilder.ref('Cat'),
                    },
                },
            })
            .response(200, {
                description: 'Base 200 response',
                schema: {
                    type: 'object',
                },
            })
            .component('Cat', {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                    },
                },
            })
            .build();

        const fs = await run(spec);

        const page = fs.match(name);

        expect(page).toMatchSnapshot();
    });
});
