import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Jobboard from './Jobboard';
import { fetchJobs } from '../api/jobs';
import { vi,it, expect, describe } from 'vitest';
import { StyledButton } from './JobBoard.styles';
import { StyledBox } from '../components/Card.styles';

// Create a client for react-query
const queryClient = new QueryClient();

// Mock the fetchJobs function
vi.mock('../api/jobs', () => ({
  fetchJobs: vi.fn(),
}));

describe('Jobboard Component', () => {
  it('displays loading spinner', () => {
    (fetchJobs as vi.Mock).mockImplementation(() => new Promise(() => {})); // Simulate loading state

    render(
      <QueryClientProvider client={queryClient}>
        <Jobboard />
      </QueryClientProvider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays error message', async () => {
    (fetchJobs as vi.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <QueryClientProvider client={queryClient}>
        <Jobboard />
      </QueryClientProvider>
    );

    expect(await screen.findByText('An error occurred: Failed to fetch')).toBeInTheDocument();
  });

  it('displays no jobs available message', async () => {
    (fetchJobs as vi.Mock).mockResolvedValueOnce([]); // Simulate no jobs

    render(
      <QueryClientProvider client={queryClient}>
        <Jobboard />
      </QueryClientProvider>
    );

    expect(await screen.findByText('No jobs available')).toBeInTheDocument();
  });

  it('displays job cards and loads more jobs on button click', async () => {
    const mockData = Array.from({ length: 15 }, (_, i) => i + 1); // Simulate 15 job IDs

    (fetchJobs as vi.Mock).mockResolvedValueOnce(mockData);

    render(
      <QueryClientProvider client={queryClient}>
        <Jobboard />
      </QueryClientProvider>
    );

    // Wait for initial 9 job cards to be rendered
    await waitFor(() => {
      mockData.slice(0, 9).forEach(id => {
        expect(screen.getByText(`Job ${id}`)).toBeInTheDocument(); // Assuming each card renders job ID
      });
    });

    // Simulate button click to load more jobs
    const loadMoreButton = screen.getByText('Load more');
    fireEvent.click(loadMoreButton);

    // Wait for more jobs to be loaded
    await waitFor(() => {
      mockData.slice(9, 15).forEach(id => {
        expect(screen.getByText(`Job ${id}`)).toBeInTheDocument(); // Check if more job IDs are rendered
      });
    });
  });
});
