import {CSSProperties, useEffect, useRef, useState} from 'react';

interface IProps {
  /**
   * 样式
   */
  className?: string;
  /**
   * 改变进度条和百分比 1-100
   */
  progress: number;
  /**
   * 圆半径，范围在60~175之间，常规值175
   */
  radius?: number;
  /**
   * 是否开启过渡动画
   */
  animate?: boolean;
  /**
   * 动画持续时间
   */
  duration?: string;
  /**
   * 是否显示进度条百分比
   */
  showPercentage?: boolean;
  /**
   * 是否显示进度条百分比符号
   */
  showPercentageSymbol?: boolean;
  /**
   * 进度条颜色
   */
  progressColor?: string;
  /**
   * 底层进度条的背景颜色
   */
  bgColor?: string;
  /**
   * 进度条文字颜色
   */
  textColor?: string;
  /**
   * 圆整体size
   */
  size?: number;
  /**
   * 进度条宽度，默认值10
   */
  lineWidth?: string;
  /**
   * 百分比 间隔
   */
  percentSpacing?: number;
  /**
   * 进度条文字样式
   */
  textStyle?: CSSProperties;
  /**
   * 进度条圆角矩形
   */
  roundedStroke?: boolean;
  /**
   * 是否继承父元素大小
   */
  responsive?: boolean;

  /**
   * 分隔符
   */
  symbol?: string;

  /**
   * 动画结束回调
   */
  onAnimationEnd?(): void;
}

const Circle = (props: IProps) => {
  const {
    progress = 0,
    size = 100,
    bgColor = '#f9f9f93d',
    progressColor = '#f9f9f9',
    lineWidth = 10,
    animate = true,
    duration = '1s',
    roundedStroke,
    responsive,
    onAnimationEnd,
    textStyle = {font: 'bold 4rem Helvetica, Arial, sans-serif'},
    textColor = '#000',
    showPercentageSymbol = true,
    percentSpacing = 10,
    showPercentage = true,
    symbol = '%',
    radius = 175,
    className
  } = props;

  const diameter = Math.round(Math.PI * radius * 2);
  const getOffset = (val = 0) => Math.round(((100 - Math.min(val, 100)) / 100) * diameter);

  const svgSize = responsive ? '100%' : size;
  const strokeLinecap = roundedStroke ? 'round' : 'butt';
  const transition = animate ? `stroke-dashoffset ${duration} ease-out` : '';
  const strokeDashoffset = getOffset(progress);

  const circleRef = useRef<SVGCircleElement | null>(null);
  const [strokeDash, setStrokeDash] = useState<number>(0);

  useEffect(() => {
    if (circleRef.current) {
      setStrokeDash(circleRef.current.getTotalLength());
    }
  }, [circleRef]);

  const text = () => {
    return (
      <>
        {showPercentage ? (
          <text style={textStyle} fill={textColor} x={radius} y={radius} textAnchor="middle" dominantBaseline="central">
            {progress}
            {showPercentageSymbol ? <tspan dx={percentSpacing}>{symbol}</tspan> : null}
          </text>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <div className={className}>
      <svg width={svgSize} height={svgSize} viewBox={'-25 -25 400 400'}>
        <circle stroke={bgColor} cx="175" cy="175" r={radius} strokeWidth={lineWidth} fill="none"/>
        <circle
          ref={circleRef}
          style={{transition, strokeDashoffset}}
          cx="175"
          cy="175"
          r={radius}
          fill="transparent"
          strokeDasharray={strokeDash}
          strokeDashoffset={strokeDash}
          stroke={progressColor}
          strokeWidth={lineWidth}
          transform="rotate(-90 175 175)"
          strokeLinecap={strokeLinecap}
          onTransitionEnd={onAnimationEnd}
        />
        {text()}
      </svg>
    </div>
  );
};

export default Circle;
