import { SettlersPrimeChromePage } from './app.po';

describe('settlers-prime-chrome App', () => {
  let page: SettlersPrimeChromePage;

  beforeEach(() => {
    page = new SettlersPrimeChromePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
