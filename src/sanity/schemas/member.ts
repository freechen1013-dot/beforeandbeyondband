import { defineType, defineField } from 'sanity'
import { localizedString, localizedText } from '../lib/localizedFields'

export default defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    localizedString('instrument', 'Instrument'),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    localizedText('bio', 'Bio'),
  ],
})
