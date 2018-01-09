import { expect } from 'chai';

import Renderer from '../../../../client/testHelpers/Renderer';

describe('Page not found example UI works', () => {
  const renderer = new Renderer({});
  let app;
  let content;

  it('404 page renders with sample text', () => {
    app = renderer.mount();
    renderer.history.push('/non-existing-page');
    app.update();
    content = app.find('#content').last();
    expect(content.text()).to.include('Page not found - 404');
  });
});
