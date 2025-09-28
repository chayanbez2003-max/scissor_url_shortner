import React from 'react'
import { Button } from '@/components/ui/button'
import {Accordion,AccordionContent,AccordionItem,AccordionTrigger} from "@/components/ui/accordion"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const LandingPage = () => {
  
  const [longUrl, setLongUrl]= useState()
  const navigate = useNavigate()

  const handelShorten = (e) =>{
    e.preventDefault();
    if(longUrl) navigate(`/auth?createNew=${longUrl}`)
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-16 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only url shortner <br/> you&rsquo;ll ever need 👇!
      </h2>
      <form onSubmit={handelShorten} className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2">
        <input type="url"
        value = {longUrl}
        placeholder= "Enter your loooong url"
        onChange={(e)=> setLongUrl(e.target.value)}
        className = "bg-transparent text-white border border-gray-600 rounded h-full flex-1 py-4 px-4"
        />
        <Button className="text-whit bg-red-500 h-full" type="submit" variant= "destructive">Shorten!</Button>
      </form>
      <img src="/banner.png" alt="banner" className="w-full my-11 md:px-14" />

      <Accordion type="multiple"  className="w-full md:px-11">
  <AccordionItem value="item-1">
    <AccordionTrigger>1. What is Scissor URL Shortener?</AccordionTrigger>
    <AccordionContent>
      Scissor is a simple tool that lets you turn long, messy links into short, clean, and shareable URLs.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>2. Do shortened links ever expire?</AccordionTrigger>
    <AccordionContent>
      No, your shortened links will never expire unless you choose to delete them.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>3. Is it free to use?</AccordionTrigger>
    <AccordionContent>
      Yes! Scissor is completely free to use for shortening unlimited URLs.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-4">
    <AccordionTrigger>4. Can I track clicks on my shortened links?</AccordionTrigger>
    <AccordionContent>
Yes, you can see how many times your link was clicked, helping you track engagement.    </AccordionContent>
  </AccordionItem>
</Accordion>
    </div>
  )
}

export default LandingPage
