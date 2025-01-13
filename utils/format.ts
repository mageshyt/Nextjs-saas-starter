import { format } from "date-fns";
import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);


export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};


export function dateFormat(
  date: Date | string | number,
  formatString: string = "dd MMM"
) {
  return format(new Date(date), formatString);
}

export const timeAgo= (date: Date | string | number) => {
  const timeAgo = new TimeAgo("en-US");
  return timeAgo.format(new Date(date));

}

export const timeFormat = (date: Date | string | number) => {
  return format(new Date(date), "hh:mm a");
}
