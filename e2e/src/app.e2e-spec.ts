import { AppPage } from './app.po';

describe('PRIME App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Prime in banner', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual(newFunction());
  });
});
function newFunction(): any {
  return 'Prime';
}

