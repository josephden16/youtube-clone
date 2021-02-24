import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);


export const formatVideoTime = (seconds: number) => {
  let date = new Date(0);
  date.setSeconds(seconds); // specify value in seconds
  let timeString: string = "";
  if (seconds >= 3600) {
    timeString = date.toISOString().substr(11, 8);
    return timeString;
  } else if (seconds < 3600 && seconds >= 60) {
    timeString = date.toISOString().substr(15, 4);
    return timeString;
  } else if (seconds < 60) {
    timeString = seconds < 10 ? `00:0${seconds}` : `00:${seconds}`;
    return timeString;
  }
}


export const formatTime = (seconds: number) => {
  let date = dayjs.unix(seconds);
  let time = dayjs().to(date);
  return time;
}


export const getDiff = (seconds: number) => {
  let timeViewed: any = dayjs.unix(seconds);
  let now: any = dayjs();
  let diff = Math.abs(now - timeViewed) / 1000;
  return diff;
}
