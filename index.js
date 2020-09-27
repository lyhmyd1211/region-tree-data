import REGION_DATA from './index_2019__level_3.json';
import cloneDeep from 'lodash/cloneDeep';

let CodeToText = {};
let TextToCode = {};
let regionData = [];
let provinceAndCityData = [];
// const totalObj = {}
CodeToText[''] = '全部';
let provinceAndCityDataPlus = [];
let regionDataPlus = [];
let originData = cloneDeep(REGION_DATA);
export function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

function getByArea(area, data = cloneDeep(originData), level = 1) {
  if (!isNumber(area) || area < 1) {
    return data;
  }
  return data.map(item => {
    if (area === level) {
      if (item.children) {
        delete item.children;
      }
      return item;
    } else {
      if (item.children) {
        item.children = getByArea(area, item.children, level + 1);
      }
      return item;
    }
  });
}

function watchData(data, child) {
  return data.map(item => {
    Object.assign(CodeToText, { [item.value]: item.label });
    Object.assign(child || TextToCode, { [item.label]: { code: item.value } });
    if (item.children) {
      watchData(item.children, child ? child[item.label] : TextToCode[item.label]);
    }
  });
}
function setData(data) {
  initData(data);
  originData = data;
}
function initData(data) {
  CodeToText = {};
  TextToCode = {};
  watchData(cloneDeep(data));
  // setProvinceAndCityData(data)
  provinceAndCityData = getByArea(2, cloneDeep(data));
  provinceAndCityDataPlus = cloneDeep(provinceAndCityData);
  provinceAndCityDataPlus.unshift({ label: '全部', value: '' });
  regionData = cloneDeep(data);
  regionDataPlus = cloneDeep(data);
  regionDataPlus.unshift({ label: '全部', value: '' });
}
setData(originData);
export { setData, getByArea, provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode };