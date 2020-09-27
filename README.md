# region-tree-data
# region-tree-data  最新中国区域编码级联数据




## 安装

  `npm install region-tree-data`
  <br>
  或
  <br>
  `yarn add region-tree-data`


## 使用
### 参照[element-china-area-data](https://github.com/Plortinus/element-china-area-data)
```js
import {setData, getByArea, provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'region-tree-data'
```
或
```js
let {setData, getByArea, provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } = require('region-tree-data')
```
  1. `provinceAndCityData`是省市二级联动数据（不带“全部”选项）
  2. `regionData`是省市区三级联动数据（不带“全部”选项）
  3. `provinceAndCityDataPlus`是省市区三级联动数据（带“全部”选项）
  4. `regionDataPlus`是省市区三级联动数据（带“全部”选项）
  5. "全部"选项绑定的value是空字符串`""`
  6. `CodeToText`是个大对象，属性是区域码，属性值是汉字 用法例如：`CodeToText['110000']`输出`北京市`
  7. `TextToCode`是个大对象，属性是汉字，属性值是区域码 用法例如：`TextToCode['北京市'].code`输出`110000`,`TextToCode['北京市']['市辖区'].code`输出`110100`,`TextToCode['北京市']['市辖区']['朝阳区'].code`输出`110105`

### 在element-china-area-data基础上新增两个配置：
  1.`setData`是自定义数据来源。<br>
  参照格式：
  
```
 var REGION_DATA = [{ "value": "110000","label": "北京市", "children": [{ "value": "110100", "label": "市辖区",  "children": [{"value": "110101", "label": "东城区"}]}]}]
```
  用法：
  
```
import {setData, getByArea, provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'region-tree-data'
setData(REGION_DATA)
console.log('regionData',regionData)
// regionData [{ "value": "110000","label": "北京市", "children": [{ "value": "110100", "label": "市辖区",  "children": [{"value": "110101", "label": "东城区"}]}]}]

// 说明: setData之后所有对象获取到的值包括getByArea都是setData自定义数据之后的值

```
  2.`getByArea`是获取任意层级数的数据
```
/**
* area ：number 需要获取的层级数,超过数据层级则获取所有的数据 
**/
getByArea(area)
```
  用法：

```
import {setData, getByArea, provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'region-tree-data'
setData(REGION_DATA)
console.log('regionData',getByArea(1))
// regionData [{ "value": "110000","label": "北京市"}]
console.log('regionData',getByArea(2))
// regionData [{ "value": "110000","label": "北京市", "children": [{ "value": "110100", "label": "市辖区"}]}]
```

## 数据来源
我爬取的<br>
[国家统计局最新（2019）中国省市区县三级行政区划代码<br>(需要5级省市区县乡镇行政区划代码的童鞋同样可以从这里获取)](https://github.com/lyhmyd1211/AreaJson_CN)




