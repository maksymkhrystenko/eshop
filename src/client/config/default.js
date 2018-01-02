module.exports = {
  host: process.env.NODE_HOST || 'localhost', // Define your host from 'package.json'
  port: process.env.PORT,
  language: 'ru',
  app: {
    htmlAttributes: { lang: 'ru' },
    title: 'EShop',
    paginationLength: 2,
    titleTemplate: 'EShop - %s',
    meta: [
      {
        name: 'description',
        content: 'Best products for people.'
      }
    ]
  }
};
