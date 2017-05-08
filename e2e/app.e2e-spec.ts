import { MbvGramAngularPage } from './app.po';

describe('mbv-gram-angular App', () => {
  let page: MbvGramAngularPage;

  beforeEach(() => {
    page = new MbvGramAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
