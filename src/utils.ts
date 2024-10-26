export const decodeHtml = (html: string): string => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML =  html;
  return textarea.value;
};

export const formatDate = (time: string): string => {
  const date = new Date(time);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export const truncateText = (text: string, maxLength: number): string => {
    console.log(maxLength, text.length)
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - 3) + "...";
};
