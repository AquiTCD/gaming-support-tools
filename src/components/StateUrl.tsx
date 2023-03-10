import { useStore } from '@nanostores/react'
import { currentLoadout } from '@/stores/armor-sim'

type Props={
  baseUrl: URL;
}

export default function StateUrl({baseUrl}:Props): JSX.Element {
  const $currentLoadout = useStore(currentLoadout)

  const fullUrl = () => {
    const url = baseUrl.toString()

    const queryParams = Object.entries($currentLoadout).map(([key, value]) => {
      if(value) { return `${key}=${value}` }
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

  return (
    <>
      <div className="flex">
        <span className="inline-flex items-center px-1 py-0 md:px-3 md:py-1 text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
          この装備のURL
        </span>
        <input type="url" id="currentUrl" value={fullUrl()} readOnly={true} className="text-right font-mono rounded-none rounded-r-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full border-gray-300 px-1 py-0 md:px-3 md:py-1" />
        <button onClick={() => copyToClipboard()} type="button" className="ml-2 block border border-gray-300 text-gray-700 hover:text-gray-50 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-1 py-0 md:px-3 md:py-1 text-center inline-flex items-center mr-2">
          <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 -ml-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
          コピー
        </button>
      </div>
    </>
  )
}
