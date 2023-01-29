import Circle from '../Circle';
import {colors} from 'src/static/colors'
import {useEffect, useState} from "react";
import {debounce, throttle} from 'src/utils/debounce'

interface IProps {
  title: string,
  CYMK: string,
  RGB: string,
  hex: string,
  pingyin: string
}

const mockData = colors.filter((item, index) => index < 100)
const Colors = () => {

  const [currentIndex, setCurrentIndex] = useState<number | null>(null)

  const transformFormat = (hexStr: string) => {
    let hex = hexStr.split('#')[1]
    return hex.toUpperCase()
  }

  const touched = throttle((index) => {
    setCurrentIndex(index)
    console.log(index)
  }, 1000)

  return (
    <>
      {mockData.map((item, index) => {
        return (
          <div
            onTouchStart={() => touched(index)}
            onTouchMove={() => touched(index)}
            onTouchEnd={() => {
              setTimeout(() => {
                setCurrentIndex(null)
              }, 300)
            }}
            className={'colors__item flex flex-col mt-1 items-center sm:mr-4'} style={{opacity: index === currentIndex ? '0.3' : '1'}}
            key={index}>
            <div
              className={'w-12 h-2'}
              style={{background: item.hex}}
            />
            <div className={'colors__item--center-cmyk-box flex mt-2'}>
              <div className={'colors__item--center-cmyk w-4'}>
                {
                  item.CMYK.map((cmyk, index) => (
                    <Circle
                      className={'colors__item--center-cmyk--circle w-4 h-4 mb-1.5'}
                      progress={cmyk}
                      key={index}
                      animate
                      showPercentage={false}
                      lineWidth={'80'}
                      responsive/>
                  ))
                }
              </div>
              <div className={'colors__item--center--name text-sm ml-1.5'}>{item.name}</div>
            </div>
            <div className={'colors__item--bottom-rgb-box flex'}>
              <div className={'colors__item--bottom-rgb-box--hex'}>{transformFormat(item.hex)}</div>
              <div className={'colors__item--bottom-rgb-box--rgb flex'}>
                {item.RGB.map((rgb, index) => {
                  return <div key={index} className={'colors__item--bottom-rgb-box--rgb--bar'}></div>
                })}
              </div>
              <div className={'colors__item--bottom-rgb-box--pinyin'}>{item.pinyin}</div>
            </div>
          </div>
        )
      })}
      <div className={'colors__item--not-item'}></div>
      <div className={'colors__item--not-item'}></div>
    </>
  );
};

export default Colors;
