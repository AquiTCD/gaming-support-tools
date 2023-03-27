import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import { currentLoadout, equip } from '@/stores/wildhearts/armor-sim'

export default function StateUrl(): JSX.Element {
  const $currentLoadout = useStore(currentLoadout)
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  const rootUrl = import.meta.env.DEV ? 'http://localhost:3000' : 'https://tools.solunita.net'
  const baseUrl = new URL('/wildhearts/armor-sim', rootUrl)
  const fullUrl = () => {
    const url = baseUrl.toString()

    const queryParams = Object.entries($currentLoadout).map(([key, value]) => {
      if(value) { return `${key}=${value.id}` }
    }).filter(Boolean).join('&')

    return queryParams === '' ? url : `${url}?${queryParams}`
  }

  const copyToClipboard = async () => {
    const copyTarget = fullUrl()
    if (copyTarget) {
      await navigator.clipboard.writeText(copyTarget)
      alert('URLをクリップボードにコピーしました')
    }
  }
  const twitterUrl = () => {
    // %20=space %23=# %26=& %0a=\n
    const twitterUrl = 'http://twitter.com/share'
    const url = fullUrl().replace(/&/g, '%26')
    const text = 'ワイルドハーツの防具はコレで決まり！'
    const hashTags = ['PlayWildHearts', 'WILDHEARTS', 'WILDHEARTS防具シム'].join('%0a%23')
    const fullText = `${text}%0a%0a%23${hashTags}%0a${url}`
    // return (showChild ? `${twitterUrl}?url=${url}&text=${text}&hashtags=%0a${hashTags}` : '#')
    return (showChild ? `${twitterUrl}?&text=${fullText}` : '#')
  }

  return (
    <>
      <div className="flex text-xs md:text-sm mt-2">
        <span className="inline-flex items-center px-1 py-0 md:px-3 text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
          この装備のURL
        </span>
        <input type="url" id="currentUrl" value={fullUrl()} readOnly={true} className="text-left text-xs font-mono rounded-none rounded-r-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full border-gray-300 px-1 py-0 md:px-3" />
        <button onClick={() => copyToClipboard()} type="button" className="ml-2 block border border-gray-300 text-gray-700 hover:text-gray-50 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-2 py-0 md:px-3 text-center inline-flex items-center">
          <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 -ml-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
          コピー
        </button>
        <a href={twitterUrl()} target="_blank" data-tooltip-id="global-tooltip" data-tooltip-content="Twitter投稿の確認画面が開きます"
          className="text-white bg-[#1da1f2] hover:bg-[#0b76b8]/90 focus:ring-4 focus:outline-none focus:ring-[#0b76b8]/50 ml-2 block rounded-lg px-2 py-0 md:px-3 text-center inline-flex items-center">
          <svg className="w-4 h-4 mr-1 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"></path>
          </svg>
          装備をTweet
        </a>
      </div>
    </>
  )
}
