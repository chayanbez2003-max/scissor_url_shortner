import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Copy, Download, Trash } from 'lucide-react'
import  {deleteUrl} from '@/db/apiUrls'
import { BarLoader } from 'react-spinners'
import useFetch from '@/hooks/use.fetch'

const LinkCard = (props) => {
    const {url,fnUrls} = props
const downloadImage =() =>{
    const imageUrl = url?.qr
    const fileName = url?.title

    const anchor = document.createElement("a")
    anchor.href = imageUrl
    anchor.download = fileName

    document.body.appendChild(anchor)

    anchor.click()
    document.body.removeChild(anchor)
}

const {loading:loadingDelete, fn: fnDelete}=  useFetch(deleteUrl, url?.id)


  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <img 
      src= {props.url?.qr} 
      className="h-32 object-contain ring ring-blue-500 self-start"
      alt="qr code" />
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
      <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold hover:underline cursor-pointer">{url.title}</span>
      <span className="text-sm sm:text-lg md:text-xl lg:text-2xl text-blue-400 font-bold hover:underline cursor-pointer">https://scissor/url_shortner.com/{url?.custom_url ? url?.custom_url : url.short_url}</span>
      <span className="flex item-center gap-1 hover:underline cursor-pointer">{url?.original_url}</span>
      <span className="flex items-end font-extralight text-sm flex-1">{new Date(url?.created_at).toLocaleString()}</span>
      </Link>

      <div className="flex gap-2">
            <Button className="bg-white text-black hover:bg-gray-200"
            variant="ghost"
            onClick={()=>
                navigator.clipboard.writeText(`https://scissor/url_shortner.com/${url?.short_url}`)
            }
            >
             <Copy/>
            </Button>
            <Button onClick={downloadImage} className="bg-white text-black hover:bg-gray-200">
                <Download/>
            </Button>
            <Button onClick={()=>fnDelete().then(()=> fetchUrls())} className="bg-white text-black hover:bg-gray-200">
                {loadingDelete?<BarLoader size={5} color="white"/>:
                <Trash/>}
            </Button>
      </div>
    </div>
  )
}

export default LinkCard
