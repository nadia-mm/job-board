import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Card from './Card';
import { fetchJobsById } from '../api/jobs';
import { vi, describe, test, expect } from 'vitest'; 

// Create a client for react-query
const queryClient = new QueryClient();

// Mock the fetchJobsById function
vi.mock('../api/jobs', () => ({
  fetchJobsById: vi.fn(),
}));

describe('Card Component', () => {
  test('displays loading state', () => {
    (fetchJobsById as vi.Mock).mockResolvedValueOnce(undefined); // Return undefined to simulate loading state

    render(
      <QueryClientProvider client={queryClient}>
        <Card id="123" />
      </QueryClientProvider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('displays error state', async () => {
    (fetchJobsById as vi.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <QueryClientProvider client={queryClient}>
        <Card id="123" />
      </QueryClientProvider>
    );

    expect(await screen.findByText('An error occurred: Failed to fetch')).toBeInTheDocument();
  });

  test('displays no job available message', async () => {
    (fetchJobsById as vi.Mock).mockResolvedValueOnce(null); // Simulate no data

    render(
      <QueryClientProvider client={queryClient}>
        <Card id="123" />
      </QueryClientProvider>
    );

    expect(await screen.findByText('No job available')).toBeInTheDocument();
  });

  test('displays job details correctly', async () => {
    const mockData = {
      title: 'Company Name (YC21) Is Hiring Senior Back End Engineers',
      time: 1653576000,
      text: 'We are looking for experienced engineers.',
      url: 'https://example.com/job-posting',
   
