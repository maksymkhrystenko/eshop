// General imports
import { expect } from 'chai';

// Components and helpers
import Renderer from '../../../../client/testHelpers/Renderer';
import Routes from '../../../../client/Routes';

describe('Upload UI works', () => {
  const renderer = new Renderer({});
  let app;
  let content;

  it('Upload page renders on mount', () => {
    app = renderer.mount(Routes);
    renderer.history.push('/upload');
    content = app.find('#content');
    expect(content).to.not.be.empty;
  });
});
