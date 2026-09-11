import React from 'react'
import {Find_handyman} from '@/constants/FindHandyman';
export default function Article() {
  const {Article3} = Find_handyman;
  return (
    <article className='space-y-5'>
      <h2 className='text-3xl font-bold'><span className='text-orange'>{Article3.color_text}</span>{Article3.heading}</h2>
      <section className='w-full  space-y-4 text-gray-600'>
        <p>{Article3.paragraph.text1}</p>
        <p>{Article3.paragraph.text2}</p>
        <p>{Article3.paragraph.text3}</p>
        <p>{Article3.paragraph.text4}</p>
        <p>{Article3.paragraph.text5}</p>
        <p>{Article3.paragraph.text6}</p>
      </section>
    </article>
  )
}
