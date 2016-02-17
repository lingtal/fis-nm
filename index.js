var fis = module.exports =  require('fis3');
//fis.require.prefixes.unshift('nm');
fis.require.prefixes = ['bobo', 'fis','fis3'];
fis.cli.help.commands = ['server'];
fis.cli.name = 'nm';
fis.cli.info = require('./package.json');
fis.cli.version = require('./version.js');


fis.match('*.js', {
  optimizer: fis.plugin('uglify-js',{
    mangle: {
        except: 'exports, module, require, define, NMUI'
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
})
.match('*.{css,scss}', {
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
.match('config/**', {
    release: false
})
.match('*.(json)', {
    release: false
});