import App from '../App.svelte';
import { render } from '@testing-library/svelte';

it('hello world works', async () => {
    const { getByRole } = render(App, {
        name: 'world',
    });
    const title = getByRole('heading');
    expect(title.textContent).toBe('Hello world!');
});
