interface DailyWordDTO {
  /**
   * 句子类型：
   * a  动画
   * b  漫画
   * c  游戏
   * d  文学
   * e  原创
   * f  来自网络
   * g  其他
   * h  影视
   * i  诗词
   * j  网易云
   * k  哲学
   * l  抖机灵
   * 其他  作为 动画 类型处理
   */
  collection: string[]
  /**
   * 最小长度，默认 0
   */
  min_length?: number
  /**
   * 最大长度，默认 30
   */
  max_length?: number
}

interface DailyVO {
  id: number
  uuid: string
  hitokoto: string
  type: string
  from: string
  from_who: string
  creator: string
  creator_uid: number
  reviewer: number
  commit_from: string
  created_at: string
  length: number
}
