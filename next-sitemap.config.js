/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.BASE_URL || 'https://www.fixius.de',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/dashboard*', '/registrieren*', '/api*'],
  // Default sitemap for static pages
  sitemapBaseFileName: 'sitemap-handwerker',
  // robotsTxtOptions: {
  //   additionalSitemaps: [
  //     'https://oficios24.de/sitemap.xml', // Our master sitemap index
  //   ],
  // },
}
