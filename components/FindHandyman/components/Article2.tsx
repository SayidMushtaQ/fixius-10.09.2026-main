import React from 'react'
import {Find_handyman} from '@/constants/FindHandyman';
export default function Article() {
  const {Article2} = Find_handyman;
  return (
    <article className='space-y-5'>
      <h2 className='text-3xl font-bold'><span className='text-orange'>{Article2.color_text}</span>{Article2.heading}</h2>
      <section className='w-full  space-y-4 text-gray-600'>
        <p>{Article2.paragraph.text1}</p>
        <p>{Article2.paragraph.text2}</p>
      </section>
    </article>
  )
}
