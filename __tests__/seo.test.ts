/**
 * @jest-environment node
 */
import sitemap from '../app/sitemap';
import robots from '../app/robots';

const BASE_URL = 'https://shannonmuruli.com';

describe('sitemap', () => {
  it('includes all 7 public routes', () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain(BASE_URL);
    expect(urls).toContain(`${BASE_URL}/about`);
    expect(urls).toContain(`${BASE_URL}/work-with-me`);
    expect(urls).toContain(`${BASE_URL}/client-results`);
    expect(urls).toContain(`${BASE_URL}/resources`);
    expect(urls).toContain(`${BASE_URL}/fearx`);
    expect(urls).toContain(`${BASE_URL}/contact`);
  });

  it('gives the homepage the highest priority', () => {
    const entries = sitemap();
    const home = entries.find((e) => e.url === BASE_URL);
    expect(home?.priority).toBe(1.0);
  });

  it('does not include noindex pages (privacy, terms)', () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).not.toContain(`${BASE_URL}/privacy`);
    expect(urls).not.toContain(`${BASE_URL}/terms`);
  });
});

describe('robots', () => {
  it('allows all crawlers', () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rules.userAgent).toBe('*');
    expect(rules.allow).toBe('/');
  });

  it('points crawlers to the sitemap', () => {
    const result = robots();
    expect(result.sitemap).toBe(`${BASE_URL}/sitemap.xml`);
  });
});
