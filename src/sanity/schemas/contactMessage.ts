import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactMessage',
  title: 'Contact Message',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'message', title: 'Message', type: 'text' }),
    defineField({ name: 'createdAt', title: 'Created At', type: 'datetime' }),
    defineField({ name: 'read', title: 'Read', type: 'boolean', initialValue: false }),
  ],
})
