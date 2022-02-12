import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Decector from './Decector';

describe('<Decector />', () => {
  test('it should mount', () => {
    render(<Decector />);
    
    const decector = screen.getByTestId('Decector');

    expect(decector).toBeInTheDocument();
  });
});