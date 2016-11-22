#TrustPilot widget
This is an example widget made for TrustPilot recruitment process.

In order to explore the widget you must launch a local Node.js server. Data from the widget are fetched from a file called trust-data.json served via http thanks to the mentioned server. The widget will not work if the server is down (for instance when the index.html is opened but the express.js server is not running.)

### Assumptions
The whole widget is rendered with JavaScript, as I have assumed, that the widget might be embedded on a page. Of course it is far from being production-ready, but that was the general idea, hance the usage of JS, loading the json file from a server etc...
 
### Launching the widget

A modern version of Node.js is required to build this project (current v6 LTS would be perfect!).

To build and view the widget, execute:

```bash
$ git clone git clone git@bitbucket.org:gpluta/trustpilot-widget.git
$ cd trustpilot-widget
$ npm install
$ gulp 
```

Visit `http://localhost:3000`

### Comment

The source code for this widget consists of `index.html` file located in the root directory of the project and files in `src/` folder.

The whole build pipeline is managed with **gulp**. It includes some simple build steps (JS concat, babel transpilation and uglify, clean-css for CSS, imagemin for image minification and browser-sync for serving the assets)
 
The project uses **SASS** for stylesheets, some **ES6** syntax (block-scopa variables, arrow functions and template strings) transpiled to ES5 via **babel**
