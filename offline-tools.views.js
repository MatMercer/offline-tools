const path = require("path");
const fs = require('fs')

const recursiveReadSync = require('recursive-readdir-sync')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Translator = require('./src/lib/i18n/translator');
const UrlHelper = require('./src/lib/url/url');

const offlineToolsChunk = 'offlineTools';

// TODO: separate this in a config file
const viewsRoot = 'src/views';
const partialsRoot = 'src/views/partials/';

const availableLanguages = ['en-US', 'pt-BR']
const indexLang = 'en-US';
const urlBase = '/';

function buildViewObjects() {
  return recursiveReadSync(viewsRoot)
    .filter(file => {
      return !isPartialView(file) && isEjs(file);
    }).map(file => {
      const viewFolder = path.dirname(file);
      const viewPath = viewFolder.replace(viewsRoot, '.');

      const viewJsFile = path.join(viewFolder, 'index.js');
      const indexJs = fs.existsSync(viewJsFile) ? viewJsFile : null;
      return ({
          path: viewPath,
          template: file,
          js: indexJs
        }
      );
    });
}

function isPartialView(f) {
  return f.indexOf(partialsRoot) === 0;
}

function isEjs(file) {
  return path.parse(file).ext.toLowerCase() === '.ejs';
}

function getViewsForEachLanguage(views) {
  return availableLanguages.map(lang => {
    return views.map(v => ({
      path: v.path,
      translatedPath: createViewPath(lang, v.path),
      template: v.template,
      lang: lang
    }));
  }).flat();
}

function createViewPath(lang, viewPath) {
  if (lang === indexLang) {
    return viewPath;
  } else {
    return path.join(lang, viewPath);
  }
}

function getUrlHelperFor(view) {
  let rootPath = urlBase;
  if (view.lang !== indexLang) {
    rootPath = path.join(rootPath, view.lang);
  }

  return UrlHelper.UrlHelper.createHelper(rootPath);
}


function createView(view) {
  return new HtmlWebpackPlugin({
    filename: `${view.translatedPath && view.translatedPath + '/'}index.html`,
    template: `!!ejs-webpack-loader!${view.template}`,
    title: null,
    pageName: null,
    chunks: [offlineToolsChunk, buildEntrypointName(view)],
    inject: "head",
    offlineTools: {
      lang: view.lang,
      i18n: Translator.get(`${__dirname}/src/i18n`, view.lang),
      url: getUrlHelperFor(view),
      relativeUrl: UrlHelper.UrlHelper.createHelper(view.translatedPath),
      translateUrl: UrlHelper.TranslateUrlHelper.createHelper(urlBase, view, indexLang)
    },
  });
}

function getViewsEntries(entries, views) {
  views.filter(v => v.js)
    .forEach(v => {
      const entrypointName = buildEntrypointName(v);
      entries[entrypointName] = createEntrypointFor(v);
    });

  return entries;
}

function createEntrypointFor(view) {
  return {
    import: './' + view.js,
    dependOn: offlineToolsChunk // very important, if not configured, offlineTools.js is duplicated between view chunks
  };
}

function buildEntrypointName(view) {
  return view.path.replace('./', '')
    .replace('/', '_');
}

module.exports = {
  getViews: buildViewObjects,
  getViewsForEachLanguage: getViewsForEachLanguage,
  createView: createView,
  getViewEntries: getViewsEntries,
}
