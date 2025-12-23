import dayjs from 'dayjs';
import { toJalaali } from 'jalaali-js';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

// ----------------------------------------------------------------------

export const formatStr = {
  dateTime: 'DD MMM YYYY h:mm a', // 17 Apr 2022 12:00 am
  date: 'DD MMM YYYY', // 17 Apr 2022
  time: 'h:mm a', // 12:00 am
  split: {
    dateTime: 'DD/MM/YYYY h:mm a', // 17/04/2022 12:00 am
    date: 'DD/MM/YYYY', // 17/04/2022
  },
  paramCase: {
    dateTime: 'DD-MM-YYYY h:mm a', // 17-04-2022 12:00 am
    date: 'DD-MM-YYYY', // 17-04-2022
  },
};

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const convertToJalali = (isoDate) => {
  if (!isoDate) return '-';
  const date = new Date(isoDate);
  const jDate = toJalaali(date);
  return `${jDate.jy}/${jDate.jm.toString().padStart(2, '0')}/${jDate.jd
    .toString()
    .padStart(2, '0')}`;
};
