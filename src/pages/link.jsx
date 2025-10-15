
import DeviceStats from '@/components/device.stats'
import LocationStats from '@/components/location-stats'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UrlState } from '@/context'
import { getClicksForUrl } from '@/db/apiClicks'
import { deleteUrl, getUrl } from '@/db/apiUrls'
import useFetch from '@/hooks/use.fetch'
import { Copy, Download, LinkIcon, Trash } from 'lucide-react'
import  { useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { BarLoader } from 'react-spinners'

const Link = () => {

  // const BASE_URL = import.meta.env.VITE_BASE_URL;


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

  const {id} =useParams()
  const {user} = UrlState()
  const navigate = useNavigate() 
  const{
    loading,
    data:url,
    fn,
    error
  } = useFetch(getUrl,{id,user_id:user?.id});

  const{
    loading:loadingStats,
    data:stats,
    fn:fnStats,
  } = useFetch(getClicksForUrl,id);

  const {loading:loadingDelete, fn:fnDelete} = useFetch(deleteUrl, id)
  
  useEffect(()=>{
    fn()
    fnStats()

  },[])

   useEffect(() => {
    if (!error && loading === false) fnStats();
  }, [loading, error]);

  if(error){
    navigate("/dashboard")
  }
  
  let link = ""
  if(url){
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  return (
    <>
    {(loading ||loadingStats) && (
      <BarLoader className="mb-4" width = {"100%"} color="#36d7b7"/>
    )}
    <div className="ml-4 sm:ml-12 flex flex-col gap-8 sm:flex-row justify-between">
      <div className="flex flex-col items-start gap-6 sm:gap-8 rounded-lg sm:w-5/12 w-full">
        <span className="text-4xl sm:text-6xl font-extrabold hover:underline cursor-pointer">
          {url?.title}</span>

        <a
         href={`https://scissor/url_shortner.com/${link}`} 
        //  href={`${BASE_URL}/${id}`} 
         target="_blank"
         className="text-xl sm:text-3xl md:text-3xl  text-blue-400 font-bold hover:underline cursor-pointer break-words"
        >
          https://scissor/url_shortner.com/{link}
        </a>

        <a 
        href={url?.original_url} 
        target="_blank"
        className="flex items-center gap-1  hover:underline cursor-pointer break-words"

        >
          <LinkIcon className="p-1"/>
          {url?.original_url}
        </a>
        <span className="flex items-end font-extralight text-xs sm:text-sm">
           {new Date(url?.created_at).toLocaleString()}
        </span>

         <div className="flex gap-2 flex-wrap">
            <Button className="bg-transparent text-white hover:bg-white/20 "
            variant="ghost"
            onClick={()=>
                navigator.clipboard.writeText(`https://scissor/url_shortner.com/${url?.short_url}`)
            }
            >
             <Copy/>
            </Button>
            <Button onClick={downloadImage} className="bg-transparent text-white hover:bg-white/20 ">
                <Download/>
            </Button>
            <Button onClick={()=>fnDelete()} className="bg-transparent text-white hover:bg-white/20 ">
                {loadingDelete?<BarLoader size={5} color="white"/>:
                <Trash/>}
            </Button>
        </div>
            <img 
              src={url?.qr} 
              alt="qr code"
              className="w-full max-w-[300px] sm:max-w-none self-center sm:self-start ring ring-blue-500 p-1 object-contain" 
            />

      </div>

    
      <Card className="sm:w-6/12 w-full mt-6 sm:mt-0">
          <CardHeader>
            <CardTitle className = "text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>

          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-6">
                <Card>
                    <CardHeader>
                      <CardTitle>Total Click</CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p>{stats?.length}</p>
                    </CardContent>
                </Card>            

              <CardTitle>Location Data</CardTitle>
              <LocationStats stats={stats}/>
              <CardTitle>Device Info</CardTitle>
              <DeviceStats stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              { loadingStats === false

                ? "No statisitic yet"
                : "Loading statistics ..."

              }
            </CardContent>
          )}
      </Card>
    </div>
    </>
  )
}

export default Link
