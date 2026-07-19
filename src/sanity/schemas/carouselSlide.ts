import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'carouselSlide',
  title: 'Carousel Slide',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'title_en',
      title: 'Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'title_zhTW',
      title: 'Title (Traditional Chinese)',
      type: 'string',
    }),
    defineField({
      name: 'title_zhCN',
      title: 'Title (Simplified Chinese)',
      type: 'string',
    }),
    defineField({
      name: 'description_en',
      title: 'Description (English)',
      type: 'text',
    }),
    defineField({
      name: 'description_zhTW',
      title: 'Description (Traditional Chinese)',
      type: 'text',
    }),
    defineField({
      name: 'description_zhCN',
      title: 'Description (Simplified Chinese)',
      type: 'text',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],
})
