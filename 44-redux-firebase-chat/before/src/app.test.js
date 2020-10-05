import React from 'react';
import { screen, render, cleanup, fireEvent } from '@testing-library/react'
import App from './app.js'

describe('App component', () => {
  it('should have the right message in the dom', () => {
    const { container, getByText } = render(<App />);
    expect(getByText(/User Name/i)).toBeInTheDocument()
  })
})

