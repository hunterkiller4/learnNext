import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
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
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Travel')).toBeInTheDocument()
    expect(screen.getByText('Food')).toBeInTheDocument()
    expect(screen.getByText('Toy')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()
  })

  it('renders tab buttons', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText('Travel')).toBeInTheDocument()
    expect(screen.getByText('Food')).toBeInTheDocument()
    expect(screen.getByText('Toy')).toBeInTheDocument()
  })
})