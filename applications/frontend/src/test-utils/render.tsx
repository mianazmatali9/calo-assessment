import React from 'react';
import { render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

export const queryClient = new QueryClient();

/** Renders a React component for testing purposes.
@param {React.ReactElement} componentUnderTest - The component to render.
@param {RenderOptions} [renderOptions] - Additional options for the render function.
@returns {RenderResult} - The rendered component and testing utilities.
*/
const render = (componentUnderTest: React.ReactElement, renderOptions: RenderOptions = {}): RenderResult => {
  return rtlRender(
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      {componentUnderTest}
    </QueryClientProvider>,
    {
      ...renderOptions,
    },
  );
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
