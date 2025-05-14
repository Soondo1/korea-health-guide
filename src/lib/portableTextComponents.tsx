import React from 'react';
import { urlFor } from './sanity';
import type { PortableTextBlockComponent, PortableTextMarkComponent, PortableTextTypeComponent } from '@portabletext/react';
import { ImageType } from '@/lib/sanity';

interface LinkType {
  href: string;
  blank?: boolean;
  [key: string]: any;
}

// Define custom components for rendering Portable Text content
const portableTextComponents = {
  types: {
    image: ({ value }: { value: ImageType }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-6">
          <img
            src={urlFor(value).width(800).url()}
            alt={value.alt || ''}
            className="rounded-md w-full"
          />
          {value.caption && (
            <figcaption className="text-sm text-center text-gray-500 mt-2">
              {value.caption}
            </figcaption>
          )}
        </div>
      );
    },
    callout: ({ value }: any) => {
      return (
        <div className={`p-4 my-6 rounded-md bg-${value.tone || 'blue'}-50 border-l-4 border-${value.tone || 'blue'}-500`}>
          <p className="text-gray-800">{value.text}</p>
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode, value: LinkType }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a 
          href={value.href} 
          rel={rel} 
          target={value.blank ? '_blank' : '_self'} 
          className="text-kare-600 hover:text-kare-800 underline"
        >
          {children}
        </a>
      );
    },
    highlight: ({ children }: { children: React.ReactNode }) => (
      <span className="bg-yellow-100 px-1 rounded">{children}</span>
    ),
  },
  block: {
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 text-kare-800">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl font-bold mt-6 mb-3 text-kare-700">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-xl font-bold mt-5 mb-2 text-kare-600">{children}</h3>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-kare-300 pl-4 italic my-6 text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc pl-5 my-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal pl-5 my-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => <li>{children}</li>,
    number: ({ children }: { children: React.ReactNode }) => <li>{children}</li>,
  },
};

export default portableTextComponents; 