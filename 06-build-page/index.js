const path = require('path');

const ASSETS_PATH = path.resolve(__dirname, 'assets');
const STYLES_PATH = path.resolve(__dirname, 'styles');
const COMPONENTS_PATH = path.resolve(__dirname, 'components');
const DIST_DIR_PATH = path.resolve(__dirname, 'project-dist');
const TEMPLATE_PATH = path.resolve(__dirname, 'template.html');

//Create ./project-dist
const { makeDir } = require('./script/make-directory');
makeDir(DIST_DIR_PATH, () => {
  //Copy assets to ./project-dist
  const { makeCopiedDir } = require('./script/copy-directory');
  makeCopiedDir(ASSETS_PATH, path.resolve(DIST_DIR_PATH, 'assets'));
  
  const { mergeStyles } = require('./script/merge-styles');
  mergeStyles(STYLES_PATH, path.resolve(DIST_DIR_PATH, 'style.css'));
  
  const { mergeHTML } = require('./script/merge-layout');
  mergeHTML(TEMPLATE_PATH, COMPONENTS_PATH, path.resolve(DIST_DIR_PATH, 'index.html'));
});

