/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'React Native Big List',
  tagline: 'Dinosaurs are cool',
  url: 'https://marcocesarato.github.io/react-native-big-list-docs/',
  baseUrl: '/react-native-big-list-docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'marcocesarato', // Usually your GitHub org/user name.
  projectName: 'react-native-big-list-docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'React Native Big List',
      logo: {
        alt: 'React Native Big List Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Documentation',
        },
        {href: 'https://marcocesarato.github.io/react-native-big-list/', label: 'Demo', position: 'left'},
        {
          href: 'https://github.com/marcocesarato/react-native-big-list',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Links',
          items: [
            {
              label: 'Open an issue',
              href: 'https://github.com/marcocesarato/react-native-big-list/issuest',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/react-native-big-list',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Demo',
              href: 'https://marcocesarato.github.io/react-native-big-list/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/marcocesarato/react-native-big-list',
            },
          ],
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/marcocesarato/react-native-big-list/edit/master/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
