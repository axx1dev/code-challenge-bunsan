import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import FirstLevel from "./components/FirstLevel/FirstLevel"
import renderer from 'react-test-renderer';

test('renders Total: word', () => {
  render(<App />);
  const word = screen.getByText(/Total:/i);
  expect(word).toBeInTheDocument();
});

it('rendered FirstLevel Component snapshot', () => {
  const component = renderer.create(
    <FirstLevel title='Manager X' allocation={2300} classFather='ms-5' classSon='badge text-bg-info' />,
  );

  let result = component.toJSON();
  expect(result).toMatchSnapshot();
});

test('Simulate click to add Role Position', async () => {
  render(<App/>);
  const btn = await waitFor(() => screen.getAllByText('+'))
  fireEvent.click(btn[0])
  expect(screen.getByText('Add role position')).toBeInTheDocument();
});