import convert from 'color-convert';

const enum CenterVal { CENTERVAL = 130 }

/**
 * 获取对比度更高的颜色，比如参数是黑色，那么对比度高的颜色就是白色系
 * @param colors
 */
const getContrastColor = (colors: number[] | string = [0, 0, 0]) => {
  /**
   * 对比度公式：使用W3C定义的公式，确保前景和背景颜色组合在有颜色缺陷的人观看或在黑白屏幕上观看时提供足够的对比度
   * ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000
   *
   * 1.如果是hex格式的色号，先转换成rgb格式
   * 2.定义中间值，建议在130左右
   * 3.利用对比度公式运算出来的颜色数字，和中间值对比，如果大于，那么返回较深的颜色【#50616d】，相反则返回较浅的颜色【#e9f1f6】
   */
  let data: number[] = []
  if (typeof colors === 'string' && colors.indexOf("#") > -1) {
    data = convert.hex.rgb(colors)
  } else {
    data = colors as number[]
  }

  const [r, g, b] = data

  /**
   * 对比度公式 <br />
   * ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000
   * @param r
   * @param g
   * @param b
   */
  const colorBrightness = (r: number, g: number, b: number) => {
    return ((r * 299) + (g * 587) + (b * 114)) / 1000
  }

  return colorBrightness(r, g, b) > CenterVal.CENTERVAL ? "#50616d" : "#e9f1f6"
}
export {
  getContrastColor
}