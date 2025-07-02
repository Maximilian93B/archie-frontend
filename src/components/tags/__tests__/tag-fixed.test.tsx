import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Tag } from '../tag'

describe('Tag Component - Fixed Tests', () => {
  it('renders tag with name', () => {
    render(<Tag name="urgent" />)
    expect(screen.getByText('urgent')).toBeInTheDocument()
  })

  it('shows confidence score for AI tags', () => {
    render(<Tag name="financial" type="ai" confidence={0.85} />)
    expect(screen.getByText('85%')).toBeInTheDocument()
  })
  
  it('shows AI bot icon for AI tags', () => {
    const { container } = render(<Tag name="invoice" type="ai" />)
    // Check for bot icon by class
    const botIcon = container.querySelector('.lucide-bot')
    expect(botIcon).toBeInTheDocument()
  })

  it('shows user icon for user tags', () => {
    const { container } = render(<Tag name="review" type="user" />)
    // Check for user icon by class
    const userIcon = container.querySelector('.lucide-user')
    expect(userIcon).toBeInTheDocument()
  })

  it('applies AI tag styling', () => {
    const { container } = render(<Tag name="invoice" type="ai" />)
    const badge = container.firstChild?.firstChild
    expect(badge).toHaveClass('bg-gray-50')
  })

  it('shows remove button for user tags with onRemove', () => {
    const onRemove = vi.fn()
    const { container } = render(<Tag name="draft" type="user" onRemove={onRemove} />)
    
    // Find the X icon button
    const removeButton = container.querySelector('button')
    expect(removeButton).toBeInTheDocument()
    
    // Click and verify callback
    removeButton?.click()
    expect(onRemove).toHaveBeenCalled()
  })

  it('does not show remove button for AI tags', () => {
    const onRemove = vi.fn()
    const { container } = render(<Tag name="invoice" type="ai" onRemove={onRemove} />)
    
    const removeButton = container.querySelector('button')
    expect(removeButton).not.toBeInTheDocument()
  })

  it('applies correct size classes', () => {
    const { container: smallContainer } = render(<Tag name="test" size="sm" />)
    expect(smallContainer.firstChild?.firstChild).toHaveClass('text-xs')
    
    const { container: medContainer } = render(<Tag name="test" size="md" />)
    expect(medContainer.firstChild?.firstChild).toHaveClass('text-sm')
  })

  it('confidence score color changes based on value', () => {
    const { container: highConf } = render(<Tag name="test" type="ai" confidence={0.9} />)
    const highScore = highConf.querySelector('span:last-child')
    expect(highScore).toHaveClass('text-green-600')
    
    const { container: medConf } = render(<Tag name="test" type="ai" confidence={0.7} />)
    const medScore = medConf.querySelector('span:last-child')
    expect(medScore).toHaveClass('text-amber-600')
    
    const { container: lowConf } = render(<Tag name="test" type="ai" confidence={0.4} />)
    const lowScore = lowConf.querySelector('span:last-child')
    expect(lowScore).toHaveClass('text-gray-500')
  })
})