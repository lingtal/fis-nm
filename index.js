var fis = module.exports =  require('fis3');
//fis.require.prefixes.unshift('nm');
fis.require.prefixes = ['nm', 'fis', 'fis3'];
fis.cli.help.commands = ['server'];
fis.cli.name = 'nm';
fis.cli.info = require('./package.json');
fis.cli.version = require('./version.js');

fis
    // 排除指定目录
    .set('project.files', ['**', '.**', '.**/**'])
    .set('project.ignore', ['node_modules/**', '.gitignore', '**/_*.scss', '**/_*.less', '.docs/**', '.dist/**', '.git/**', '.svn/**', 'fis-conf.js','.DS_Store'])
    .set('project.fileType.image', 'css,js')
    .set('project.md5Length',16)
    .set('project.md5Connector','')

fis.match('*.js', {
  optimizer: fis.plugin('uglify-js',{
    mangle: {
        except: 'exports, module, require, define'
    },
    compress : {
        drop_console: false
    },
    sourceMap:false,
    output : {
        ascii_only : true,
        space_colon : false
    }
    
  }),
  lint: fis.plugin('jshint')
})


.match('*.png', {
  optimizer: fis.plugin('png-compressor',{
    type : 'pngquant'
  })
})
.match('*.php', {
    loaderLang: 'html'
})
.match('*.scss', {
    rExt: '.css',
    parser: fis.plugin('node-sass', {
        // options...
    }),
    useSprite: true,
    optimizer: fis.plugin('clean-css',{
        'keepBreaks': false
    })
})
.match('*.{css,less}', {
    rExt: '.css',
    parser: fis.plugin('less-2.x', {
        // options...
    }),
    useSprite: true,
    optimizer: fis.plugin('clean-css',{
        'keepBreaks': false
    })
})
.match('::package', {
  spriter: fis.plugin('csssprites')
})
.match('*.html:js', {
    optimizer: fis.plugin('uglify-js')
})
.match('*.html:css', {
    optimizer: fis.plugin('clean-css')
})
.match('build/**', {
    release: false
})
.match('build_config/**', {
    release: false
})
.match('*.{md,json}', {
    release: false
})