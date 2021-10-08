import * as qiniu from "qiniu-js";
import { guid } from "./util";

export const uploadImage = (
  uptoken: string,
  file: File,
  overwrite: boolean,
  callback: Function
) => {
  const putExtra = {
    // 文件原文件名
    fname: "",
    // 自定义变量
    params: {},
    // 限制上传文件类型
    mimeType: "image/*",
  };

  const qiniuConfig = {
    useCdnDomain: true,
    disableStatisticsReport: false,
    retryCount: 5,
    region: qiniu.region.z0,
  };

  const fileName = overwrite
    ? file.name
    : `${guid(8, 16)}${
        file.name ? file.name.substr(file.name.lastIndexOf(".")) : ".png"
      }`;

  let observer = {
    next() {},
    error(err: any) {
      alert("上传失败！");
      console.log("---上传失败---", err);
    },
    complete(res: any) {
      const domain = "https://cdn-icare.qingtime.cn/";
      const url = domain + encodeURIComponent(res.key);
      callback(url);
    },
  };

  // 上传
  let observable = qiniu.upload(file, fileName, uptoken, putExtra, qiniuConfig);

  // 上传开始
  observable.subscribe(observer);
};

export function dataURItoBlob(dataURI: string) {
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]; // mime类型
  var byteString = atob(dataURI.split(",")[1]); //base64 解码
  var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
  var intArray = new Uint8Array(arrayBuffer); //创建视图

  for (var i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([intArray], { type: mimeString });
}

export const uploadImg = (
  uptoken: string,
  file: File,
  overwrite?: boolean,
  allType?: boolean,
  updatePercent?: any
) => {
  const putExtra = allType
    ? {
        // 文件原文件名
        fname: "",
        // 自定义变量
        params: {},
      }
    : {
        // 文件原文件名
        fname: "",
        // 自定义变量
        params: {},
        // 限制上传文件类型
        mimeType: "image/*",
      };

  const qiniuConfig = {
    useCdnDomain: true,
    disableStatisticsReport: false,
    retryCount: 5,
    region: qiniu.region.z0,
  };

  const fileName = overwrite
    ? file.name
    : `${guid(8, 16)}${
        file.name ? file.name.substr(file.name.lastIndexOf(".")) : ".png"
      }`;

  return new Promise(async function (resolve, reject) {
    try {
      let observer = {
        next(res: any) {
          if (updatePercent) {
            updatePercent(res.total.percent.toFixed(2));
          }
        },
        error(err: any) {
          alert("上传失败！");
          console.log("---上传失败---", err);
        },
        complete(res: any) {
          const domain = "https://cdn-icare.qingtime.cn/";
          const url = domain + encodeURIComponent(res.key);
          resolve(url);
        },
      };

      // 上传
      let observable = qiniu.upload(
        file,
        fileName,
        uptoken,
        putExtra,
        qiniuConfig
      );
      // 上传开始
      observable.subscribe(observer);
    } catch (error) {
      reject(error);
    }
  });
};
