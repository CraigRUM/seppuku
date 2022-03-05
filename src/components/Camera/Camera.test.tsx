import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Camera from './Camera';

describe('<Camera />', () => {
  test('it should mount', () => {
    render(<Camera ctxReady={() => {}}/>);
    
    const decector = screen.getByTestId('Camera');

    expect(decector).toBeInTheDocument();
  });
});