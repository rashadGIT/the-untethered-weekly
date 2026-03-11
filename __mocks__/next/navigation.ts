// Default mock – tests can override per-test with jest.mocked(usePathname).mockReturnValue(...)
export const usePathname = jest.fn().mockReturnValue("/");
export const useRouter = jest.fn().mockReturnValue({
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
});
export const useSearchParams = jest.fn().mockReturnValue(new URLSearchParams());
