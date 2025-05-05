import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'bulletinItem',
  title: 'Bulletin Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'bulletinCategory'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Optional link for more information',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.name',
    },
    prepare(selection) {
      const {title, category} = selection
      return {
        title,
        subtitle: category ? `Category: ${category}` : '',
      }
    },
  },
}) 