import { defineType, defineField } from 'sanity'
import { localizedString, localizedText } from '../lib/localizedFields'

export default defineType({
  name: 'carouselSlide',
  title: 'Carousel Slide',
  type: 'document',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    localizedString('title', 'Title'),
    localizedText('description', 'Description'),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
})
