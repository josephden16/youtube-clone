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

//TODO: add dayjs date formatting