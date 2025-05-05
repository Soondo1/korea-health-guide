import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'bulletinCategory',
  title: 'Bulletin Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Daily Life Support', value: 'Daily Life Support'},
          {title: 'Policy News', value: 'Policy News'},
          {title: 'Experience Activities', value: 'Experience Activities'},
          {title: 'Benefits', value: 'Benefits'},
          {title: 'Announcements', value: 'Announcements'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Hospital', value: 'hospital'},
          {title: 'Shield', value: 'shield'},
          {title: 'Book', value: 'book'},
          {title: 'Calendar', value: 'calendar'},
          {title: 'File Text', value: 'fileText'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
}) 