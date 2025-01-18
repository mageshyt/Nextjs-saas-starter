import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useUser } from '@clerk/nextjs';
import Navbar from '@/app/(marketing)/components/navbar';

vi.mock('@clerk/nextjs', async () => {
  const actual = await vi.importActual('@clerk/nextjs');
  return {
    ...actual,
    useUser: vi.fn(),
    UserButton: () => <button>Mocked UserButton</button>, // Mock UserButton
  };
});
describe('Navbar', () => {

  it('renders the logo image with the correct alt text', () => {
    (useUser as ReturnType<typeof vi.fn>).mockReturnValue({ isSignedIn: false });
    render(<Navbar />);
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  it('shows Sign In and Sign Up buttons if the user is signed out', () => {
    (useUser as ReturnType<typeof vi.fn>).mockReturnValue({ isSignedIn: false });
    render(<Navbar />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('renders UserButton when the user is signed in', () => {
    (useUser as ReturnType<typeof vi.fn>).mockReturnValue({ isSignedIn: true });
    render(<Navbar />);
    expect(screen.getByText('Mocked UserButton')).toBeInTheDocument();
  });

  it("renders 'Dashboard' link when user is signed in", () => {
    (useUser as ReturnType<typeof vi.fn>).mockReturnValue({ isSignedIn: true });
    render(<Navbar />);
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });   
     expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute('href', '/dashboard'); // Optional
  });

  it('handles uninitialized user state gracefully', () => {
    (useUser as ReturnType<typeof vi.fn>).mockReturnValue(null);
    render(<Navbar />);
    expect(screen.queryByText('Sign In')).toBeInTheDocument();
  });

  it('matches the snapshot when user is signed in', () => {
    (useUser as ReturnType<typeof vi.fn>).mockReturnValue({ isSignedIn: true });
    const { container } = render(<Navbar />);
    expect(container).toMatchSnapshot();
  });
});