import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

function formatDate(date, format) {
  return dayjs(date).format(format)
}

export {formatDate}