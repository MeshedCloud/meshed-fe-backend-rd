import {successMsg} from "@/common/messages";

export const authentication = () => {
  if ("clipboard" in navigator) {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      navigator.permissions.query({name: "clipboard-read"}).then(
        (result) => {
          if (result.state == "granted" || result.state == "prompt") {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  } else {
    alert("该浏览器暂不支持，请使用最新版本的GoogleChrome浏览");
    return Promise.resolve(false);
  }
};

export const clipboardWrite = (text: string | undefined) => {
  if (text === undefined) {
    return
  }
  navigator.clipboard.writeText(text).then(
    () => {
      successMsg("复制成功")
    },
    () => {
      console.log("clipboard write failed");
    }
  );
}
