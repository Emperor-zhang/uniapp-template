import { instance } from "./request.js";
export function getResquest(url, params) {
  return instance.get(url, { params });
}
export function postResquest(url, data) {
  return instance.post(url, data);
}

// 调用方法
//  getResquest("categories", {}).then((res) => {
//    console.log(res);
//  });
