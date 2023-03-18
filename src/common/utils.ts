export const convertVersion = (version: number | undefined) => {
  if (version === undefined || version === 0) {
    return "未发布"
  }
  //获取第一位 major and minor

  let major = version / 10000;
  let minor = 0;
  if (version > 100) {
    minor = (version % 1000) / 100
  }
  return parseInt(String(major)) + "." + parseInt(String(minor)) + "." + (version % 100)
};

