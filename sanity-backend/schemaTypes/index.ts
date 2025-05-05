import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import bulletinCategory from './bulletinCategory'
import bulletinItem from './bulletinItem'
import newsItem from './newsItem'

export const schemaTypes = [
  // Blog related schemas
  post, 
  author, 
  category, 
  blockContent,
  
  // Bulletin board related schemas
  bulletinCategory,
  bulletinItem,
  newsItem
]
