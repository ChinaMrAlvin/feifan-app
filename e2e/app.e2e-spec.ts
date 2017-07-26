import { FeifanAppPage } from './app.po';

describe('feifan-app App', () => {
  let page: FeifanAppPage;

  beforeEach(() => {
    page = new FeifanAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
