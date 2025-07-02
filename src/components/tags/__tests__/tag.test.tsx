import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Tag } from '../tag'

describe('Tag', () => {
  it('renders tag with name', () => {
    render(<Tag name="urgent" />)
    expect(screen.getByText('urgent')).toBeInTheDocument()
  })

  it('applies correct color based on category', () => {
    render(<Tag name="invoice" category="document_type" />)
    
    const tag = screen.getByText('invoice').parentElement
    expect(tag).toHaveClass('bg-blue-100', 'text-blue-700')
  })

  it('shows confidence score when provided', () => {
    render(<Tag name="financial" confidence={0.85} />)
    
    expect(screen.getByText('85%')).toBeInTheDocument()
  })

  it('shows AI indicator for AI tags', () => {
    render(<Tag name="quarterly-report" isAI />)
    
    const robotIcon = screen.getByTestId('ai-tag-icon')
    expect(robotIcon).toBeInTheDocument()
  })

  it('shows remove button when onRemove provided', () => {
    const onRemove = vi.fn()
    render(<Tag name="draft" onRemove={onRemove} />)
    
    const removeButton = screen.getByRole('button', { name: /remove/i })
    expect(removeButton).toBeInTheDocument()
    
    fireEvent.click(removeButton)
    expect(onRemove).toHaveBeenCalled()
  })

  it('does not show remove button without onRemove', () => {
    render(<Tag name="final" />)
    
    const removeButton = screen.queryByRole('button', { name: /remove/i })
    expect(removeButton).not.toBeInTheDocument()
  })

  it('applies correct size classes', () => {
    const { rerender } = render(<Tag name="test" size="sm" />)
    let tag = screen.getByText('test').parentElement
    expect(tag).toHaveClass('text-xs')
    
    rerender(<Tag name="test" size="md" />)
    tag = screen.getByText('test').parentElement
    expect(tag).toHaveClass('text-sm')
  })

  it('applies custom className', () => {
    render(<Tag name="custom" className="custom-class" />)
    
    const tag = screen.getByText('custom').parentElement
    expect(tag).toHaveClass('custom-class')
  })

  it('handles all tag categories correctly', () => {
    const categories = [
      { category: 'document_type', expectedClasses: ['bg-blue-100', 'text-blue-700'] },
      { category: 'department', expectedClasses: ['bg-green-100', 'text-green-700'] },
      { category: 'project', expectedClasses: ['bg-purple-100', 'text-purple-700'] },
      { category: 'priority', expectedClasses: ['bg-red-100', 'text-red-700'] },
      { category: 'status', expectedClasses: ['bg-yellow-100', 'text-yellow-700'] },
    ]
    
    categories.forEach(({ category, expectedClasses }) => {
      const { container } = render(<Tag name="test" category={category as any} />)
      const tag = container.querySelector('[class*="bg-"]')
      
      expectedClasses.forEach(className => {
        expect(tag).toHaveClass(className)
      })
    })
  })

  it('prevents click propagation when removing', () => {
    const onRemove = vi.fn()
    const onClick = vi.fn()
    
    render(
      <div onClick={onClick}>
        <Tag name="test" onRemove={onRemove} />
      </div>
    )
    
    const removeButton = screen.getByRole('button', { name: /remove/i })
    fireEvent.click(removeButton)
    
    expect(onRemove).toHaveBeenCalled()
    expect(onClick).not.toHaveBeenCalled()
  })
})