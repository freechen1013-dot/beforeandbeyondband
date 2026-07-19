import { defineType, defineField } from 'sanity'
import { localizedString, localizedText } from '../lib/localizedFields'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    localizedString('siteTitle', 'Site Title'),
    localizedText('description', 'Description'),
    defineField({ name: 'igUrl', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'ytUrl', title: 'YouTube URL', type: 'url' }),
    localizedString('footerCredit', 'Footer Credit'),
  ],
})
