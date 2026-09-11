import React from 'react'
import SentOfferHS from '../../components/Offer';
export default function UnAcceptedOfferCS({job_title,listing_ID,price,posted_on,status}:{ job_title: string;listing_ID: string;price: string;posted_on: {date: string;time: string;};status:string}) {
  return (
   <SentOfferHS {...{job_title,listing_ID,price,posted_on,status}}/>
  )
}
