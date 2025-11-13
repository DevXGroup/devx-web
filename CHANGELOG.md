## [1.1.0](https://github.com/DevXGroup/devx-web/compare/v1.0.0...v1.1.0) (2025-11-13)

### Features

- add dynamic version display in footer ([777fc96](https://github.com/DevXGroup/devx-web/commit/777fc96e8e21598d9ad8d5a36538990606b88bab))
- add vercel.json with deployment skip configuration ([10ca601](https://github.com/DevXGroup/devx-web/commit/10ca601e132523ce192815bc6e6719ea31915d89))
- **ci:** add GitHub Actions CI/CD pipeline with quality gates and automated releases ([d9be240](https://github.com/DevXGroup/devx-web/commit/d9be2401f90f9f9a0bffb52a9873f86be1b3bd6f)), closes [#16](https://github.com/DevXGroup/devx-web/issues/16)
- **ci:** add Prettier for consistent code formatting across codebase ([2eeb4b8](https://github.com/DevXGroup/devx-web/commit/2eeb4b89d4b45de8682cdc3625d48dc606f0cc02)), closes [#12](https://github.com/DevXGroup/devx-web/issues/12)
- **ci:** add Prettier for consistent code formatting across codebase ([c6bff9f](https://github.com/DevXGroup/devx-web/commit/c6bff9f579a761b6488c93ad94389821171df781)), closes [#12](https://github.com/DevXGroup/devx-web/issues/12)
- **ci:** implement automated semantic versioning and changelog generation ([2109c40](https://github.com/DevXGroup/devx-web/commit/2109c403fa06be54543ac9b4174214584756e285)), closes [#15](https://github.com/DevXGroup/devx-web/issues/15)
- **config:** add Vercel Live support and refine about page styling ([e7135a4](https://github.com/DevXGroup/devx-web/commit/e7135a4e3a76e0c9dc1f69f00ea5c30d9f76eaca))
- **config:** add Vercel Live support and refine about page styling ([6d69a22](https://github.com/DevXGroup/devx-web/commit/6d69a22c7561835525dacb04011f81e5fa6d8fca))

### Bug Fixes

- add vercel.live to frame-src CSP directive ([ba0af08](https://github.com/DevXGroup/devx-web/commit/ba0af0893b3f5c49d75cacf10ebbcd6c8709e9d9))
- add vercel.live to frame-src CSP directive ([d447371](https://github.com/DevXGroup/devx-web/commit/d447371b56379d2db274cc50dee802b3b20a516c))
- **ci:** prevent CI cascading and Vercel deployment issues on semantic-release commits ([e72af92](https://github.com/DevXGroup/devx-web/commit/e72af92925935416a32ce7b4f3e290ce6f34cc4f))
- **ci:** remove hardcoded pnpm version to use packageManager field ([7c36cb5](https://github.com/DevXGroup/devx-web/commit/7c36cb5cbb97751330af77a86940ab0b7636eedd))
- explicitly return undefined in useEffect to satisfy TypeScript ([4264109](https://github.com/DevXGroup/devx-web/commit/426410947d8afec1b85387b33cf670023c19a88b))
- remove package.json and pnpm-lock.yaml from .vercelignore to fix Vercel builds ([8e19ce4](https://github.com/DevXGroup/devx-web/commit/8e19ce44d260619c041d7d4532497a0d6219a1af))
- resolve hydration mismatch in ConditionalLayout ([89a722a](https://github.com/DevXGroup/devx-web/commit/89a722a1a2fcc7a61c68edfa926535ea11a7a9db)), closes [#418](https://github.com/DevXGroup/devx-web/issues/418)
- resolve navbar visibility and transition hydration issues ([6add958](https://github.com/DevXGroup/devx-web/commit/6add9585f5a635739da3e2dbc1835a975aa0a295))
- resolve navbar visibility issue on home page transition ([5616d98](https://github.com/DevXGroup/devx-web/commit/5616d983a16efab7cc37dd287b318c127c80b26f))
- resolve TypeScript error and reorganize documentation ([cabe046](https://github.com/DevXGroup/devx-web/commit/cabe0461a2151f7d9e705a0c9c8978fe55d7284b))

### Performance Improvements

- add force-dynamic to image generation routes ([50cef2f](https://github.com/DevXGroup/devx-web/commit/50cef2fcb36edd48ab3f55436d80c9f5b206224a))
- add Safari requestIdleCallback polyfill ([41b83ca](https://github.com/DevXGroup/devx-web/commit/41b83cac2b33b54b5e2fe0a079e69e8f336b2eda))
- optimize animation performance with lazy loading ([a302adf](https://github.com/DevXGroup/devx-web/commit/a302adfc2430414241adb2a6c00b5d86a7452b71))
- optimize Core Web Vitals with layout stability and font loading improvements ([ba3e01f](https://github.com/DevXGroup/devx-web/commit/ba3e01f7a5bbac9d1916bd197244d4d1569a50c3))
- optimize Core Web Vitals with layout stability and font loading improvements ([6c65bef](https://github.com/DevXGroup/devx-web/commit/6c65bef9edefd6036aa7fd4ed99b4e532dcea256))
- reduce layout complexity and monitoring overhead ([b790c00](https://github.com/DevXGroup/devx-web/commit/b790c007b1697af1c45e8e485d21ad931c16f660))

# Changelog

All notable changes to this project will be documented in this file by [semantic-release](https://github.com/semantic-release/semantic-release).
