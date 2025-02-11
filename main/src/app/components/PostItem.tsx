// src/components/PostItem.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PostAuthor from './PostAuthor';
import { useTranslation } from 'react-i18next';
import { slugify } from '../../utils/slugify';

interface PostItemProps {
  _id: string;             // Fallback id
  slug?: string;           // Optional slug field
  category: string;
  title?: string;
  description?: string;
  authorID: string;
  thumbnail?: string;
  createdAt?: string;
}

const PostItem: React.FC<PostItemProps> = ({
  _id,
  slug,
  category,
  title = '',
  description = '',
  authorID,
  thumbnail,
  createdAt,
}) => {
  const { t } = useTranslation();
  const shortDescription =
    description.length > 145 ? description.substring(0, 145) + '...' : description;
  const postTitle =
    title.length > 30 ? title.substring(0, 30) + '...' : title;
  const defaultThumbnail = '/assets/Blog-default.webp';

  // Generate a slug if it doesn't exist
  const generatedSlug = slug || slugify(title);

  return (
    <article className="post">
      <div className="post-thumbnail">
        <Link href={`/blog/${generatedSlug}`}>
          <Image
            src={thumbnail || defaultThumbnail}
            alt={title}
            width={600}
            height={400}
            className="post-image"
          />
        </Link>
      </div>
      <div className="post-content">
        <Link href={`/blog/${generatedSlug}`}>
          <h3>{postTitle}</h3>
        </Link>
        <p className="blog-text" dangerouslySetInnerHTML={{ __html: shortDescription }} />
        <div className="post-footer">
          <PostAuthor authorID={authorID} createdAt={createdAt} />
          <Link
            href={`/blog/categories/${category}`}
            className="btn btn-secondary btn-postitem"
          >
            {t(`categories.${category}`)}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;