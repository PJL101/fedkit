# fedkit
Version: 0.4.1

[![Build Status](https://travis-ci.org/PJL101/fedkit.svg?branch=master)](https://travis-ci.org/PJL101/fedkit)
[![devDependency Status](https://david-dm.org/PJL101/fedkit/dev-status.svg)](https://david-dm.org/PJL101/fedkit
  #info=devDependencies)

* Author: [Phil Lennon](http://iampjl.co.uk)
* Source: [github.com/PJL101/fedkit](http://github.com/PJL101/fedkit)
* Twitter: [@PJL101](http://twitter.com/pjl101)
* Email: [enquiry@iampjl.co.uk](mailto:enquiry@iampjl.co.uk)

-

This kit is designed to go hand in hand with a static site generator but can happily work standalone. See variants for more information.

fedkit is a fast, stable, well tested and opinionated frontend development workflow, containing:

* Grunt 0.4,
* Libsass 3.2,
* Susy 2.2,
* SASS-MQ 3,
* PostCSS with Autoprefixer, will change fallback and media query packer,
* CSS Comb,
* CSS PX to REM,
* Critical CSS,
* Imagemin,
* Grunticon,
* JSHint,
* Automatic custom Modernizr build,
* HTMLmin,
* All frontend dependences use bower for easy management.

Use fedkit as a base and tailor to your specific needs. Comments, suggestions & pull requests are always welcome. See the [issues list](https://github.com/PJL101/fedkit/issues) for more information about future enhancements and changes.

## Variants

There are several variants of fedkit either in development or available now. They have the base frontend workflow with a site generator included. The current variants are:

* [fedkit-assemble](https://github.com/PJL101/fedkit-assemble) - Good for quick website prototyping,
* [fedkit-hugo](https://github.com/PJL101/fedkit-hugo) - Designed for a static website, with or without a blog.

## Install

Download the latest stable release from [GitHub](https://github.com/PJL101/fedkit/releases). Once this has been done:

* Install Node 0.12 or io.js 2.0 (Node 0.10.x is not supported but may work),
* run `npm install grunt-cli -g && npm install bower -g && npm install bower-installer -g`,
* Navigate to the workflow folder in command line terminal,
* run `npm install`,
* run `grunt`.

## How to use

* `grunt` - Build website, watch for changes & start server,
* `grunt prd` - Build minified website,
* `grunt reset` - Delete generated website and downloaded bower files.

## Bower

[Bower](http://bower.io) is used to automatically pull in frontend dependences such as jQuery. The workflow takes the relevant files and integrates them into the relevant folders ready for use. Please see bower.json for an example on how this works.

## Known Issues

* io.js v3 is unsupported due to node-sass. See [https://github.com/sass/node-sass/issues/1053](https://github.com/sass/node-sass/issues/1053),
* Documentation is TBA.
