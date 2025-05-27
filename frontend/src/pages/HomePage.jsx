import React from 'react'
import Hero from '../components/home/Hero'
import ServiceCard from '../components/home/ServiceCard'
import StylistCard from '../components/home/StylistCard'
import TestimonialCard from '../components/home/TestimonialCard'
import Newsletter from '../components/home/Newsletter'
import Accomplishment from '../components/home/Accomplishment'

function HomePage() {
  return (
    <div>
    <Hero />
    <Accomplishment />
    <ServiceCard />
    <StylistCard />
    <TestimonialCard />
    <Newsletter />
    </div>
  )
}

export default HomePage