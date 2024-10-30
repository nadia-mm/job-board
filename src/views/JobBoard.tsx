import { useQuery } from "@tanstack/react-query";
import Card from "../components/Card";
import { fetchAllJobIds } from "../api/jobs";
import { useEffect, useState, useCallback } from "react";
import "./JobBoard.css";
import { useIntersectionObserver } from 'usehooks-ts'

const Jobboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => fetchAllJobIds(),
  });

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  })
  console.log(isIntersecting);

  const [jobIds, setJobIds] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const jobsPerPage = 9;

  const loadMoreJobs = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  useEffect(() => {
    if (isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isIntersecting, loadMoreJobs]);


  useEffect(() => {
    if (data) {
      const start = (page - 1) * jobsPerPage;
      const nextJobs = data.slice(start, start + jobsPerPage);
      setJobIds((prevJobIds) => {
        const updatedJobIds = [...prevJobIds, ...nextJobs];
        return [...new Set(updatedJobIds)];
      });
    }
  }, [page, data, jobsPerPage]);

  if (isLoading) {
    return <div className="progress-bar"></div>;
  }

  if (error) {
    return (
      <div className="alert error">An error occurred: {error.message}</div>
    );
  }

  if (!data || data.length === 0) {
    return <h6 className="no-jobs">No jobs available</h6>;
  }

  return (
    <div className="jobboard-container">
      <h1>HN Jobs</h1>
      <div className="job-grid" >
        {jobIds.map((id: number) => (
          <Card id={id.toString()} key={id} />
        ))}
      </div>
      <button onClick={loadMoreJobs}>Load</button>
      <div ref={ref} className="load-more" />
    </div>
  );
};

export default Jobboard;
