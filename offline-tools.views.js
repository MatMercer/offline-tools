const path = require("path");
const recursiveReadSync = require('recursive-readdir-sync')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Translator = require('./src/lib/i18n/translator');

// TODO: separate this in a config file
const viewsRoot = './src/views';
const excludes = ['partials'];

const availableLanguages = ['en-US', 'pt-BR']
const indexLang = 'en-US';
const urlBase = '/';

function getViews() {
  const views = getViewsForEachLanguage(buildViewObjects());
  return views.map((v) => {
    if (indexLang === v.lang) {
      v.path = v.path.replace(`${indexLang}`, '.');
    }
    return v;
  });
}

function buildViewObjects() {
  return recursiveReadSync(viewsRoot)
    .filter(file => {
      return !isPartialView(file) && isEjs(file);
    }).map(file => {
      let viewPath = path.basename(path.dirname(file));
      if (viewPath === 'views') {
        viewPath = '';
      }
      return ({
          path: viewPath,
          template: file
        }
      );
    });
}

function isPartialView(f) {
  const parentDir = path.basename(path.dirname(f));
  return excludes.indexOf(parentDir) === 0;
}

function isEjs(file) {
  return path.parse(file).ext.toLowerCase() === '.ejs';
}

function getViewsForEachLanguage(views) {
  return availableLanguages.map(lang => {
    return views.map(v => ({
      path: path.join(lang, v.path),
      template: v.template,
      lang: lang
    }));
  }).flat();
}

module.exports = {
  getViews: getViews,
  createView: (view) => {
    return new HtmlWebpackPlugin({
      filename: `${view.path && view.path + '/'}index.html`,
      template: `!!ejs-webpack-loader!${view.template}`,
      title: null,
      pageName: null,
      // chunks: ['global'],
      inject: "head",
      offlineTools: {
        lang: view.lang,
        i18n: Translator.get(`${__dirname}/i18n`, view.lang),
      },
      // url: require('./src/lib/views/url').withBase(urlBase) // TODO: implement url logic
    })
  },
};
