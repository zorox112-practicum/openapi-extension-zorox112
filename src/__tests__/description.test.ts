import {DocumentBuilder, run} from './__helpers__/run';

describe('description', () => {
    it('renders correct description', async () => {
        const spec = new DocumentBuilder('description')
            .component('Pet', {
                allOf: [
                    DocumentBuilder.ref('Cat', 'From allOf in Pet'),
                ],
                description: 'From pet',
            })
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
            .response(200, {schema: {
                properties: {
                    pet: {
                        allOf: [
                            DocumentBuilder.ref('Pet', 'From response'),
                        ],
                    },
                    petWithoutDescription: {
                        allOf: [
                            DocumentBuilder.ref('Cat'),
                        ],
                    },
                    refToSchemaWithDescription: {
                        allOf: [
                            DocumentBuilder.ref('Dog'),
                        ],
                    },
                    simpleDescription: {
                        type: 'object',
                        description: 'Simple description',
                    },
                },
            }});

        const fs = await run(spec.build());

        const page = fs.match('description.md');

        expect(page).toMatchSnapshot();
    });

});
