import { useEffect } from 'react'
import FloatingHearts from '../components/FloatingHearts.jsx'
import Hero from '../sections/Hero.jsx'
import Timeline from '../sections/Timeline.jsx'
import Letter from '../sections/Letter.jsx'
import Reasons from '../sections/Reasons.jsx'
import Gallery from '../sections/Gallery.jsx'
import Wishes from '../sections/Wishes.jsx'
import LoveMeter from '../sections/LoveMeter.jsx'
import GiftBox from '../sections/GiftBox.jsx'
import Finale from '../sections/Finale.jsx'
import DateInvite from '../sections/DateInvite.jsx'

export default function Surprise() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative">
      <FloatingHearts count={26} zClass="z-30" />
      <div className="relative z-10">
        <Hero />
        <Timeline />
        <Letter />
        <Reasons />
        <Gallery />
        <Wishes />
        <LoveMeter />
        <GiftBox />
        <Finale />
        <DateInvite />
      </div>
    </div>
  )
}
