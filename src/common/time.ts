import moment from "moment";

export const timeToDateTime = (time: any): string => {
  return moment(time).format('YYYY-MM-DD HH:mm:ss');
}

export const timeToDate = (time: any): string => {
  return moment(time).format('YYYY-MM-DD');
}
export const formatDuring = (millisecond: number): string => {
  const days = parseInt(String(millisecond / (1000 * 60 * 60 * 24)));
  const hours = parseInt(String((millisecond % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = parseInt(String((millisecond % (1000 * 60 * 60)) / (1000 * 60)));
  return days + " 天 " + hours + " 小时 " + minutes + " 分钟 ";
}
