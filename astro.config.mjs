import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeMermaid from 'rehype-mermaid';
import rehypeShiki from '@shikijs/rehype';

export default defineConfig({
  site: 'https://caiohenrique.dev',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx({
      syntaxHighlight: false,
      rehypePlugins: [
        [
          rehypeMermaid,
          {
            strategy: 'inline-svg',
            mermaidConfig: {
              theme: 'base',
              themeVariables: {
                primaryColor: '#7C5CD8',
                primaryTextColor: '#D4D0E0',
                primaryBorderColor: '#4A3680',
                lineColor: '#D4A82C',
                secondaryColor: '#150E1F',
                tertiaryColor: '#0C0712',
                background: '#050308',
                mainBkg: '#150E1F',
                secondBkg: '#0C0712',
                tertiaryBkg: '#020104',
                edgeLabelBackground: '#150E1F',
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
    domains: [],
  },
});
