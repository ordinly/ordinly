import { format } from "date-fns";

const formatDate = (date: Date, dateFormat: string = "MMM dd, yyyy") => {
  let dateToFormat = date;

  if (!(dateToFormat instanceof Date)) {
    dateToFormat = new Date(dateToFormat);
  }

  return format(dateToFormat, dateFormat);
};

export default formatDate;
