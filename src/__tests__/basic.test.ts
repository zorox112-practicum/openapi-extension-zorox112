import {fs} from './__helpers__/virtualFS';
import {DocumentBuilder, run} from './__helpers__/run';

describe('basic openapi project', () => {
    it('renders description', async () => {
        const spec = new DocumentBuilder('basic')
            .response(200, {
                description: 'Base 200 response',
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
            })
            .response(404, {
                description: 'Base 200 response',
                schema: {
                    type: 'object',
                    properties: {
                        type: {
                            type: 'string',
                        },
                        bar: {
                            type: 'string',
                        },
                    },
                },
            })
            .build();

        await run(spec);

        const page = fs.match('basic');

        expect(page).toMatchSnapshot();
    });
});
