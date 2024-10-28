/*import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Card from './Card';
import { fetchJobsById } from '../api/jobs';

vi.mock('../api/jobs');

const queryClient = new QueryClient();

const renderWithQueryClient = (ui) => {
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('Card Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('displays a loading skeleton when loading', () => {
    (fetchJobsById as jest.Mock).mockReturnValue(new Promise(() => {})); // Simulate loading state
    renderWithQueryClient(<Card id="1" />);
    
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays an error message when an error occurs', async () => {
    (fetchJobsById as jest.Mock).mockRejectedValue(new Error('Network Error'));
    renderWithQueryClient(<Card id="1" />);
    
    // Wait for the error message to appear
    expect(await screen.findByText(/an error occurred: network error/i)).toBeInTheDocument();
  });

  it('displays a message when no job is available', async () => {
    (fetchJobsById as jest.Mock).mockResolvedValue([]);
    renderWithQueryClient(<Card id="1" />);
    
    // Wait for the no job message to appear
    expect(await screen.findByText(/no job available/i)).toBeInTheDocument();
  });

  it('displays the job details correctly', async () => {
    const mockJobData = {
      text: '<strong>Job Description</strong>',
      time: '2023-10-25T12:00:00Z',
      title: 'Company XYZ is hiring for a Software Engineer',
      url: 'https://example.com/job',
    };
    (fetchJobsById as jest.Mock).mockResolvedValue(mockJobData);
    renderWithQueryClient(<Card id="1" />);

    expect(await screen.findByText(/company xyz/i)).toBeInTheDocument();
    expect(screen.getByText(/is hiring for a software engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/job description/i)).toBeInTheDocument();
    expect(screen.getByText(/10\/25\/2023/i)).toBeInTheDocument(); // Check formatted date
  });
});
*/