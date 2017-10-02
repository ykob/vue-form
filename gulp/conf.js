// 設定ファイル
// 対象パスやオプションを指定

const DIR = module.exports.DIR =  {
  PATH: '',
  SRC: 'src',
  DEST: 'dst',
  BUILD: 'build'
};
const PROXY = '192.168.33.10';

module.exports.serve = {
  dest: {
    //tunnel: 'test',
    notify: false,
    startPath: DIR.PATH,
    ghostMode: false,
    proxy: PROXY
  },
  build: {
    //tunnel: 'test',
    notify: false,
    startPath: DIR.PATH,
    ghostMode: false,
    proxy: PROXY
  }
};

module.exports.scripts = {
  common: '',
  entryFiles: [
    `./${DIR.SRC}/js/main.js`,
  ],
  browserifyOpts: {
    transform: [
      ['babelify', {
        babelrc: false,
        presets: ['es2015']
      }],
      'vueify',
      'envify'
    ]
  },
  dest: `${DIR.DEST}${DIR.PATH}/js`
};

module.exports.pug = {
  src: [
    `${DIR.SRC}/**/*.pug`,
    `!${DIR.SRC}/**/_**/*.pug`,
    `!${DIR.SRC}/**/_*.pug`
  ],
  dest: `${DIR.DEST}${DIR.PATH}`,
  json: `${DIR.SRC}/data.json`,
  opts: {
    pretty: true
  }
};

module.exports.sass = {
  src: [
    `${DIR.SRC}/**/*.{sass,scss}`,
    `!${DIR.SRC}/**/_**/*.{sass,scss}`,
    `!${DIR.SRC}/**/_*.{sass,scss}`
  ],
  dest: `${DIR.DEST}${DIR.PATH}/css`,
  browsers: [
    'last 2 versions',
    'ie >= 9',
    'Android >= 4',
    'ios_saf >= 8',
  ]
};

module.exports.replace = {
  html: {
    src: [
      `${DIR.DEST}${DIR.PATH}/**/*.html`
    ],
    dest: `${DIR.BUILD}${DIR.PATH}`,
    path: `${DIR.PATH}`
  }
};

module.exports.sprite = {
  src: [
    `${DIR.SRC}/img/sprite/**/*.png`
  ],
  dest: {
    img: `${DIR.DEST}${DIR.PATH}/img/common`,
    css: `${DIR.SRC}/css/foundation`
  },
  opts: {
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    imgPath: '../img/common/sprite.png',
    padding: 10,
    cssOpts: {
      functions: false
    }
  }
};

module.exports.cleanCss = {
  src: `${DIR.DEST}${DIR.PATH}/css/main.css`,
  dest: `${DIR.BUILD}${DIR.PATH}/css`
};

module.exports.uglify = {
  src: [
    `./${DIR.DEST}${DIR.PATH}/js/vendor.js`,
    `./${DIR.DEST}${DIR.PATH}/js/main.js`,
  ],
  dest: `${DIR.BUILD}${DIR.PATH}/js`,
  opts: {
  }
};

module.exports.copy = {
  dest: {
    src: [
      `${DIR.SRC}/img/**/*.*`,
      `${DIR.SRC}/font/**/*.*`,
    ],
    dest: `${DIR.DEST}${DIR.PATH}`,
    opts: {
      base: `${DIR.SRC}`
    }
  },
  build: {
    src: [
      `${DIR.DEST}${DIR.PATH}/img/**/*.ico`,
      `${DIR.DEST}${DIR.PATH}/font/**/*.*`,
    ],
    dest: `${DIR.BUILD}${DIR.PATH}`,
    opts: {
      base: `${DIR.DEST}${DIR.PATH}`
    }
  },
  php: {
    src: [
      `${DIR.SRC}/html/**/*.php`,
    ],
    dest: `${DIR.BUILD}${DIR.PATH}`,
    opts: {
      base: `${DIR.SRC}/html/`
    }
  }
};

module.exports.imagemin = {
  src: [
    `${DIR.DEST}${DIR.PATH}/**/*.{jpg,jpeg,png,gif,svg}`
  ],
  dest: `${DIR.BUILD}${DIR.PATH}/img`
};

module.exports.clean = {
  dest: {
    path: [
      `${DIR.DEST}${DIR.PATH}/**/*.html`,
      `${DIR.DEST}${DIR.PATH}/css/`,
      `${DIR.DEST}${DIR.PATH}/js/`
    ]
  },
  build: {
    path: [`${DIR.BUILD}${DIR.PATH}`]
  }
};
