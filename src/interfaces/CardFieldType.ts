export interface CardFieldType {
  // _key: string;
  // // 关联的卡片id
  // cardKey: string;
  // 字段类型（此条字段的中文解释）
  fieldType: string;
  dataType: string;
  // 字段类型图标
  fieldIcon: string;
  // 字段名
  fieldName: string;
  // 字段中文意思
  meaning: string;
  // 正则表达式
  regex?: any;
  // 是否显示
  show?: boolean;
  // 是否可查询
  beQuery?: boolean;
  // 精度
  precision?: 0 | 1 | 2 | 3 | 4;
  // 选项
  optionArr?: object[];
  // 对齐方式
  alignment?: "left" | "right" | "center";
  // 评分图标
  subIcon?: string;
  // 评分最高值
  maxScore?: number;
  // 数据数量
  limitNum?: number;
  // 数字单位
  unit?: string;
  // 是否千分位显示
  thousandthShow?: boolean;
  // 货币符号
  symbol?: string;
  // 附件地址
  urlList?: string[];
}
