import React from 'react'
import AcceptOffers from '../../components/Offer';

export default function AcceptedOfferHs({job_title,listing_ID,price,posted_on,status}:{ job_title: string;listing_ID: string;price: string;posted_on: {date: string;time: string;};status:string}) {
  return (
    <AcceptOffers {...{job_title,listing_ID,price,posted_on,status}}/>
  )
}
