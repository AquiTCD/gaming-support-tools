import Slider from 'rc-slider'
import { useStore } from '@nanostores/react'
import { pathValueFilter } from '@/stores/armor-sim'
import 'rc-slider/assets/index.css'

export default function DualRangeSlider(): JSX.Element {
  const $pathValueFilter = useStore(pathValueFilter)

  const marks = {
    0: <span className="font-bold">0</span>,
    '-150': <span className="text-blue-800 font-bold">活人流</span>,
    '150': <span className="text-red-800 font-bold">獣道流</span>
  }

  const valueLabel = (value:number) => {
    switch (true) {
    case value > 0:
      return <span className="text-red-800">獣道流 {Math.abs(value)}</span>
    case value < 0:
      return <span className="text-blue-800">活人流 {Math.abs(value)}</span>
    default:
      return <span>0</span>
    }
  }

  return (
    <>
      <div className="w-3/4 md:w-1/2 pt-0 pb-6 pl-4 whitespace-nowrap">
        <div className="text-center w-full">
          <span className="mr-2">{valueLabel($pathValueFilter[0])}</span>
          から
          <span  className="ml-2">{valueLabel($pathValueFilter[1])}</span>
        </div>
        <Slider
          className=""
          range
          allowCross={false}
          defaultValue={[-150, 150]}
          min={-150}
          max={150}
          step={5}
          marks={marks}
          onChange={v => pathValueFilter.set(v as number[])}
          trackStyle={{ backgroundColor: '#f0abfc' }}
          railStyle={{ backgroundColor: '#e5e7eb' }}
          handleStyle={{
            borderColor: '#4b5563',
            backgroundColor: '#9ca3af'
          }}
        />
      </div>
    </>
  );
}
