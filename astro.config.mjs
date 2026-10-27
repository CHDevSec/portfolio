import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeMermaid from 'rehype-mermaid';
import rehypeShiki from '@shikijs/rehype';

export default defineConfig({
  site: 'https://chdevsec.com.br',
  base: '/portfolio',
  trailingSlash: 'always',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx({
      syntaxHighlight: false,
      rehypePlugins: [
        [
          rehypeMermaid,
          {
            strategy: 'inline-svg',
            // Mermaid renders through Playwright at build time. On Vercel the
            // `playwright install` postinstall provides the browser; set
            // CHROMIUM_PATH locally to reuse a system Chromium instead of
            // downloading another copy.
            ...(process.env.CHROMIUM_PATH
              ? { launchOptions: { executablePath: process.env.CHROMIUM_PATH } }
              : {}),
            mermaidConfig: {
              theme: 'base',
              themeVariables: {
                primaryColor: '#141414',
                primaryTextColor: '#f2f2ec',
                primaryBorderColor: '#1e6bff',
                lineColor: '#6fa3ff',
                secondaryColor: '#101010',
                tertiaryColor: '#0a0a0a',
                background: '#0a0a0a',
                mainBkg: '#141414',
                secondBkg: '#101010',
                tertiaryBkg: '#0a0a0a',
                edgeLabelBackground: '#0a0a0a',
                fontFamily: 'monospace',
                fontSize: '13px',
              },
            },
          },
        ],
        [rehypeShiki, { theme: 'github-dark' }],
      ],
    }),
    sitemap(),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    // Images ship as authored (pixel art and screenshots), so no optimizer is
    // needed and the build does not depend on sharp being installed.
    service: passthroughImageService(),
    domains: [],
  },
});
