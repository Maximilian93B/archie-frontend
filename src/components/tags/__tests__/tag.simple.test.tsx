import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Tag } from '../tag'

describe('Tag Component - Simple Test', () => {
  it('renders tag with name', () => {
    render(<Tag name="urgent" />)
    expect(screen.getByText('urgent')).toBeInTheDocument()
  })

  it('shows confidence score for AI tags', () => {
    render(<Tag name="financial" type="ai" confidence={0.85} />)
    expect(screen.getByText('85%')).toBeInTheDocument()
  })
  
  it('shows AI icon for AI tags', () => {
    render(<Tag name="invoice" type="ai" />)
    // Bot icon should be present
    const botIcon = screen.getByRole('img', { hidden: true })
    expect(botIcon).toHaveClass('lucide-bot')
  })
})