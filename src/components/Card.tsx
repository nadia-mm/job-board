import { useQuery } from "@tanstack/react-query";
import { fetchJobsById } from "../api/jobs";
import { Skeleton, Typography } from "@mui/material";
import { StyledBox } from "./Card.styles";
import React from "react";
import { decodeHtml, formatDate } from "../utils";

interface ICard {
  id: string;
}

const Card: React.FC<ICard> = React.memo(({ id }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobsById(id),
  });

  if (isLoading) {
    return <Skeleton variant="rectangular" />;
  }

  if (error) {
    return (
      <Typography component={"p"} color="error">
        An error occurred: {error.message}
      </Typography>
    );
  }

  if (!data || data.length === 0) {
    return <Typography variant="h6">No job available</Typography>;
  }

  const { text, time, title, url } = data;
  const [companyName, ...positionParts] = title
    .replace(/:|is/i, "")
    .split(/hiring/i);
  const position = positionParts.join(" ").trim().toLowerCase();

  const formattedDate = formatDate(time);
  const decodedText = decodeHtml(text);

  return (
    <a
      href={
        url ??
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      <StyledBox>
        <p>{companyName.trim()}</p>
        <p>{`Is hiring ${position}`}</p>
        <p>{decodedText}</p>
        <p>{formattedDate}</p>
      </StyledBox>
    </a>
  );
});

export default Card;
