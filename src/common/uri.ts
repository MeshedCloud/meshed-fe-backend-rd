export function strToUri(str?: string) {

  if (str === undefined || str.length == 0) {
    return ''
  }
  const s = str + '';
  const words = s.split("");  //将字符串进行拆分
  const reg = /^[A-Z]+$/;    //正则A-Z
  for (let i = 1; i < words.length; i++) {
    if (reg.test(words[i])) {   //判断单个字符是否大写
      words[i] = '/' + words[i];
    }
  }
  return "/" + words?.join('').toLowerCase();
}
