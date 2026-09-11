import React from 'react'
import UnAcceptedOffer from '../../components/Offer';
export default function UnAcceptedOfferCS({job_title,listing_ID,price,posted_on,status}:{ job_title: string;listing_ID: string;price: string;posted_on: {date: string;time: string;};status:string}) {
  return (
   <UnAcceptedOffer {...{job_title,listing_ID,price,posted_on,status}}/>
  )
}
