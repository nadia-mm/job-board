import { useQuery } from "@tanstack/react-query";
import Card from "../components/Card";
import { fetchJobs } from "../api/jobs";
import { Alert, Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { StyledButton } from "./JobBoard.styles";
import { StyledBox } from "../components/Card.styles";

const Jobboard = () => {
  const [jobIds, setJobIds] = useState<number[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
    
  });

  useEffect(() => {
    if (data) {
      setJobIds(data.slice(0, 9));
    }
  }, [data]);
  console.log(data)

  if (isLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error">An error occurred: {error.message}</Alert>
      </Box>
    );
  }
  if (!data || data.length === 0)
    return (
      <Box>
        <Typography variant="h6">No jobs available</Typography>
      </Box>
    );

  const loadMoreJobs = () => {
    setJobIds((prevJobIds) => data.slice(0, prevJobIds.length + 6));
  };

  return (
    <StyledBox>
      <h1>HN Jobs</h1>

      <Grid container spacing={2}>
        {jobIds.map((id: number) => (
          <Grid item xs={12} sm={12} md={4} key={id}>
            <Card id={id.toString()} key={id} />
          </Grid>
        ))}
      </Grid>
      <StyledButton onClick={loadMoreJobs}>Load more</StyledButton>
    </StyledBox>
  );
};

export default Jobboard;
