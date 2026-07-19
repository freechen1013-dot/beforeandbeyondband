import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({
      name: 'placement',
      title: 'Display Location',
      type: 'string',
      options: {
        list: [
          { title: 'Gallery only', value: 'gallery' },
          { title: 'Homepage Carousel only', value: 'carousel' },
          { title: 'Both', value: 'both' },
        ],
        layout: 'radio',
      },
      initialValue: 'gallery',
    }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'caption', media: 'image' },
    prepare: (v: any) => ({ title: v.title || 'Untitled', media: v.media }),
  },
})
