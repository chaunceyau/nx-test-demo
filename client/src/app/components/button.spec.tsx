import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from './button';

describe('Button', () => {
  it('should render successfully', () => {
    const mockOnClickHandler = vi.fn();
    const { baseElement } = render(<Button onClick={mockOnClickHandler} />);
    expect(baseElement).toBeTruthy();
  });
  it('should call on click handler when clicked', () => {
    const mockOnClickHandler = vi.fn();
    render(<Button onClick={mockOnClickHandler}>Submit</Button>);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(mockOnClickHandler).toHaveBeenCalledOnce();
  });
  it('should not call on click handler when disabled', () => {
    const mockOnClickHandler = vi.fn();
    render(
      <Button disabled onClick={mockOnClickHandler}>
        Submit
      </Button>
    );
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(mockOnClickHandler).not.toHaveBeenCalled();
  });
});
