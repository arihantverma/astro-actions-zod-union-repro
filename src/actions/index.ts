import { defineAction, z } from 'astro:actions';

const schema1 = z.object({
  type: z.literal('only-first-name'),
  firstname: z.string(),
});

const schema2 = z.object({
  type: z.literal('full'),
  firstname: z.string(),
  lastname: z.string().optional(),
  age: z.number(),
});

const schema3 = z.object({
  type: z.literal('only-first-name'),
  first_name: z.string(),
});

const schema = z.union([schema1, schema2]);

export const server = {
  sendFormDataUnion: defineAction({
    accept: 'form',
    input: schema,
    handler: async (incoming) => {
      // this comes true with zod union, but the type information is that of a javascript literal object
      console.info(incoming instanceof FormData);

      // logging `incoming` logs form object
      console.log(incoming);
      return { success: true };
    },
  }),
  sendFormObject: defineAction({
    accept: 'form',
    input: schema3,
    handler: async (incoming) => {
      console.info(incoming.type, incoming.first_name)
      return { success: true };
    },
  }),
};
