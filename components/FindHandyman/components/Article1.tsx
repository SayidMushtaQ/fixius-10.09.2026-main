import React from 'react'
import {Find_handyman} from '@/constants/FindHandyman';
export default function Article() {
  const {Article} = Find_handyman;
  return (
    <article className='space-y-5'>
      <h2 className='text-3xl font-bold'>{Article.heading} <span className='text-orange'>{Article.color_text}</span></h2>
      <section className='w-full space-y-4 text-gray-600'>
        <p>{Article.paragraph.text1}</p>
        <p>{Article.paragraph.text2}</p>
        <p>{Article.paragraph.text3}</p>
      </section>
    </article>
  )
}
