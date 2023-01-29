import React, {Fragment, useEffect, useState} from 'react';
import {formatTwo} from 'src/utils/conver';
import styled from 'styled-components'

interface IProps {
  speed?: number; //动画速度
  data: number; //初始化值
  iniAnimate?: boolean; //是否要初始化动画效果，即全部数字首帧转动至传入的target数字，然后再进行变化
  symbol?: string; //默认的分割符号，千，万，千万
  dot?: number; //保留几位小数点
}

const DomWrapper = styled.div`
  align-self: flex-start;
  width: 20px;
  text-align: center;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  transition: all ${props => props.speed}s;
`

const AniNumber = (props: IProps) => {
  const {data, speed = 1000, symbol, dot = 0} = props;
  const [domRef, setDomRef] = useState<HTMLDivElement | null>(null);
  const [spanHeight, setSpanHeight] = useState(0);
  // const length = data.length; // 传入值的长度，用于计算分割符渲染的位置
  const [numStr, setNumStr] = useState('');
  const [isDecimal, setIsDecimal] = useState(false);

  useEffect(() => {
    const dataStr = `${data}`;

    // let num = ''
    // if (dataStr.includes('.')) {
    //
    //   num = formatTwo(data, dot);
    //   setIsDecimal(true);
    // } else {
    //   // int
    //   num = dataStr;
    //   setIsDecimal(false);
    // }


    // dataStr.includes('.') => true:float | false:int
    let num = dataStr.includes('.') ? formatTwo(data, dot) : dataStr
    setIsDecimal(dataStr.includes('.'))
    setNumStr(num);
  }, [data, dot]);

  useEffect(() => {
    domRef && setSpanHeight(domRef.offsetHeight);
  }, [domRef]);

  const converStrArr = (num: string) => num.split('');

  /**
   * 传入symbol渲染的dom元素
   * @param num
   * @returns
   */
  const renderSymbol = (num: string) => {
    return (
      <>
        {symbol && <div className={'mtNumberAnimateDot'}>{symbol}</div>}
        {renderSpan(num)}
      </>
    );
  };

  /**
   * 传入的strArr分解后的num渲染span函数
   * @param num 当前渲染的num
   * @returns
   */
  const renderSpan = (num: string) => {
    let attrNum = num === '.' ? 10 : num;
    let allSpanHeight = spanHeight / 11;
    let top = -attrNum * allSpanHeight;
    const style = {transform: `translateY(${top}px)`};
    return (
      <DomWrapper
        id="dom"
        ref={(ref) => setDomRef(ref)}
        data-num={num}
        speed={speed / 1000}
        style={{...style}}
      >
        <span className={'mtNumberAnimateSpan'}>0</span>
        <span className={'mtNumberAnimateSpan'}>1</span>
        <span className={'mtNumberAnimateSpan'}>2</span>
        <span className={'mtNumberAnimateSpan'}>3</span>
        <span className={'mtNumberAnimateSpan'}>4</span>
        <span className={'mtNumberAnimateSpan'}>5</span>
        <span className={'mtNumberAnimateSpan'}>6</span>
        <span className={'mtNumberAnimateSpan'}>7</span>
        <span className={'mtNumberAnimateSpan'}>8</span>
        <span className={'mtNumberAnimateSpan'}>9</span>
        <span className={'mtNumberAnimateSpan'}>.</span>
      </DomWrapper>
    );
  };
  // https://juejin.cn/post/6877773443715203079#heading-0
  /**
   * 判断是否有symbol分隔符
   * @param num 当前数字
   * @param index 索引
   * @returns true=有分隔符 false=无分隔符
   */
  const isSymbol = (num: string, index: number) => {
    if (isDecimal) {
      const numStrLen = formatTwo(data, dot).split('.')[0].length;
      const newIndex = index >= numStrLen ? numStrLen - 1 : index;
      return newIndex !== 0 && num !== '' && !!symbol && (numStrLen - newIndex) % 3 === 0;
    } else {
      return index !== 0 && num !== '' && !!symbol && (numStr.length - index) % 3 === 0;
    }
  };

  return (
    <div className={'mtNumberAnimate'}>
      {converStrArr(numStr).map((num, index) => {
        return <Fragment key={index}>{isSymbol(num, index) ? renderSymbol(num) : renderSpan(num)}</Fragment>;
      })}
    </div>
  );
};

export default AniNumber;
