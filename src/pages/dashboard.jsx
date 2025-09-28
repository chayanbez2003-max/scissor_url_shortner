import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Filter } from 'lucide-react'
import { getUrls } from '@/db/apiUrls'
import useFetch from '@/hooks/use.fetch'
import getClicksForUrls  from '@/db/apiClicks.js'
import { UrlState } from '@/context'
import LinkCard from '@/components/link-card'
import CreateLink from '@/components/create-link.jsx'



function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  const { user } = UrlState()
  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user?.id)

  const {
    loading: loadingClicks, data: clicks, fn: fnClicks
  } = useFetch(getClicksForUrls,
    urls?.map((url) => url.id)
  )
  useEffect(()=>{
    fnUrls();
  },[])

  useEffect(() => {
    if (urls?.length) fnClicks((url) => url.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [urls?.length])

  const filteredUrls = urls?.filter((url)=>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className=" flex flex-col gap-8 ml-3 mr-3">
      {(loading || loadingClicks) && <BarLoader width={"100%"} color={"#36d7b7"} />}

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle> Created Links </CardTitle>
          </CardHeader>

          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Click</CardTitle>
          </CardHeader>

          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between ml-3 mr-3">
        <h1>My Links</h1>
        {/* <Button className="bg-white text-black hover:bg-gray-200 w-1/8">Create</Button> */}
        <CreateLink/>
      </div>

      <div className="relative">
        <Input type="text"
          placeholder="Filter Links"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error?.message} />}
      {(filteredUrls || []).map((url,i) =>{
        return <LinkCard key={i} url={url} fetchUrls= {fnUrls}/>
      }) }
    </div>
  )
}

export default Dashboard
