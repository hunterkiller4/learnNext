import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'

// Mock fetch
global.fetch = vi.fn()

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Home', () => {
  beforeEach(() => {
    // Mock successful fetch responses
    vi.mocked(global.fetch).mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      } as Response)
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders the main heading', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText('House of Gon')).toBeInTheDocument()
  })

  it('renders the hero section', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText('Explore Nations')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    renderWithRouter(<Home />)
    // Check for navigation links in the nav element
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveTextContent('Home')
    expect(nav).toHaveTextContent('Travel')
    expect(nav).toHaveTextContent('Food')
    expect(nav).toHaveTextContent('Toy')
    expect(nav).toHaveTextContent('Baby')
    expect(nav).toHaveTextContent('Admin')
  })

  it('renders tab buttons', () => {
    renderWithRouter(<Home />)
    // Check for tab buttons specifically
    expect(screen.getByRole('button', { name: 'Travel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Food' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Toy' })).toBeInTheDocument()
  })
})