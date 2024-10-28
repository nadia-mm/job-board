import { useQuery } from "@tanstack/react-query";
import { fetchJobById } from "../api/jobs";
import React from "react";
import { formatDate } from "../utils";
import "./Card.css";

interface ICard {
  id: string;
}

const Card: React.FC<ICard> = React.memo(({ id }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id),
  });

  if (isLoading) {
    return <div className="skeleton-loader"></div>;
  }

  if (error) {
    return <p className="error-text">An error occurred: {error.message}</p>;
  }

  if (!data || data.length === 0) {
    return <p className="no-job">No job available</p>;
  }

  const { time, title, url } = data;
  const [companyName, ...position] = title.split(/is|hiring/i);

  return (
    <a
      href={
        url ??
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      }
      target="_blank"
      rel="noopener noreferrer"
      className="card-link"
    >
      <div className="styled-box">
        <p className="company-name">{companyName.trim()}</p>
        <p className="position">Is hiring {position.join(" ").trim()}</p>
        <p className="date">{formatDate(time)}</p>
      </div>
    </a>
  );
});

export default Card;
