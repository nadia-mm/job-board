import { useQuery } from "@tanstack/react-query";
import { fetchJobsById } from "../api/jobs";
import { Alert, CircularProgress, Typography } from "@mui/material";
import { StyledBox } from "./Card.styles";

interface ICard {
  id: string;
}

function decodeHtml(html: string): string {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
}

/*
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
      return text;
  }
  return text.slice(0, maxLength - 3) + '...';
}*/

const Card = ({ id }: ICard) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobsById(id),
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">An error occurred: {error.message}</Alert>;
  }
  if (!data || data.length === 0)
    return <Typography variant="h6">No job available</Typography>;

  const { text, time, title, url } = data;
  const [companyName, ...position] = title
    .replace(/:|is/i, "")
    .split(/hiring/i);

  const date = new Date(time);

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return (
    <a
      href={
        url ??
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      }
      target="_blank"
    >
      <StyledBox>
        <p>{companyName.trim()}</p>
        <p>{`Is hiring ${position.join(" ").trim().toLowerCase()}`}</p>
        <p><div dangerouslySetInnerHTML={{ __html: decodeHtml(text) }}></div></p>
        <p>{`${month}/${day}/${year}`}</p>
      </StyledBox>
    </a>
  );
};

export default Card;
