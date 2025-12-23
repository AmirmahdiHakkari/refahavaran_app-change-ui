import dayjs from 'dayjs';
import { toJalaali } from 'jalaali-js';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

// ----------------------------------------------------------------------

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
