
# Setting up Sanity Studio for the Healthcare Bulletin Board

This guide explains how to set up Sanity Studio to manage content for the Healthcare Bulletin Board.

## Step 1: Install Sanity CLI

```bash
npm install -g @sanity/cli
```

## Step 2: Initialize a new Sanity project

```bash
# Create a new folder for your Sanity Studio
mkdir sanity-bulletin-board
cd sanity-bulletin-board

# Initialize a new Sanity project
sanity init
```

Follow the prompts to set up your project. Choose a project name, and when asked about the dataset configuration, choose "production".

## Step 3: Create schemas for the bulletin board content

Create the following schema files in the `schemas` directory of your Sanity Studio project:

### `newsItem.js`

```js
export default {
  name: 'newsItem',
  title: 'News Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const {title, publishedAt} = selection
      return {
        title,
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString() : ''
      }
    }
  }
}
```

### `categoryItem.js`

```js
export default {
  name: 'categoryItem',
  title: 'Category Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    }
  ]
}
```

### `category.js`

```js
export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'File Text', value: 'fileText'},
          {title: 'Hospital', value: 'hospital'},
          {title: 'Book', value: 'book'},
          {title: 'Calendar', value: 'calendar'},
          {title: 'Shield', value: 'shield'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'items',
      title: 'Category Items',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'categoryItem'}]}]
    }
  ]
}
```

## Step 4: Update the schema.js file

Make sure to import and register all your schemas in the `schema.js` file:

```js
import newsItem from './newsItem'
import categoryItem from './categoryItem'
import category from './category'

export const schemaTypes = [
  newsItem, 
  categoryItem, 
  category
]
```

## Step 5: Start Sanity Studio

```bash
npm run dev
```

Visit `http://localhost:3333` to access your Sanity Studio.

## Step 6: Update the React app with your Sanity credentials

In the `src/lib/sanity.ts` file of your React app, replace the placeholder values with your actual Sanity project ID and dataset name:

```typescript
export const client = createClient({
  projectId: 'your-project-id', // Replace with your actual project ID
  dataset: 'production', // Replace with your dataset name (usually 'production')
  useCdn: true,
  apiVersion: '2023-05-03',
});
```

You can find your project ID in the sanity.config.js file in your Sanity Studio project.

## Step 7: Deploy Sanity Studio (optional)

To deploy your Sanity Studio to make it available online:

```bash
sanity deploy
```

This will make your Sanity Studio available at a URL like `yourproject.sanity.studio`.
