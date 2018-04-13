Table of Important Contents

- Quick non-developer start


## Quick non-developer start


Download:
1) Open in browser:
 https://github.com/StephenCataldo/comment-better/blob/master/build.zip
1b)  Click "Download" button (toward bottom, right)
 build.zip downloads. Click it open to "unzip" it. (or ask for help if not
 automatic!)  Move the resulting folder called "build" whereever 
 you'd like to keep it.

Run:
2) In your chrome browser, enter into the address bar:
chrome://extensions
2b) Click on
√ Developer Mode
2c) Push the button "Load Unpacked Extension" (top left area) and then
 select the directory called "build" (that you just unzipped)

Open facebook, and look for a comment box — right next to the smiling 
emojii for uploading an image should be the "Comment Better Button."
Click it and send us feedback!
Note: the extension sometimes fails to run, especially when you first
download it. Reload facebook. Let us know how well it works overall.


If that was confusing, read the version below, written at a different time.
@ToDo: somebody *new* go through all the steps and combine these/erase.



##### Non-Developer Version 0

1. Get the Code
1a. Clone or download this repository, or *easiest* grab the "build" directory here
    https://github.com/StephenCataldo/guide-comment-insert--react/raw/master/build.zip
 and unzip it (try clicking on it after downloading to unzip it; ask for help
if you get stuck).
   Note: Non-developers use only the /build directory of the download.

  Open in browser:
  https://github.com/StephenCataldo/comment-better/blob/master/build.zip
  Click "Download" button (toward bottom, right)
  build.zip downloads. Click it open (or ask for help if not!)
    

2. In your chrome browser, enter into the address bar:   
chrome://extensions 
2a. Click on
√ Developer Mode
2b. Click "Load Unpacked Extension" and the select the extension directory
called "build" within the download/cloned code.  

It should be running! When you go to a website with a keyword for which 
the guide (currently set to CognitivePolitics.com) has a suggestion,
it will be available in a drop-down in the bullhorn next to the address bar
of your browser.

Developers should follow instructions from the boilerplate, below. Note that
the /build directory will often be behind your own    'npm run dev'
See: "Basic Setup for new developers" below the description of the project.

## Purpose & Plan

###There are three intertwined variants here:
All help you leave more civil, more effective, better framed comments
when you are online, providing cut-and-paste templates from which you can
leave replies faster.

####1) A "Comment Better Button" that you install as an extension for your browser, 
providing general advice on improved (and civil) communications techniques,
starting with facebook comments (intending to expand where it shows up,
one day).
####2) A "Comment Better Button" that you install on websites you host, such
as a Drupal blog, for your readers to use.
####3) The project CBB was based on, guide-comment-insert--react:
When you read an article online, this chrome extension checks a list of keywords of "issues" connected to URLs from a guide, and makes them accessible. 
The beta-test guide is at CognitivePolitics.org, but that can be switched.


#### Phase 2: DIY

This may one day become (or be integrated with) a bookmark tool,
so that when you come across an article you find convincing,
or a well-footnoted source that backs up your opinions on a topic,
 you can connect it to a keyword or hashtag and have it available
when commenting on that topic.


## Developer Guide: the Boilerplate, our version, and developer installs

Thank you to https://github.com/jhen0409/react-chrome-extension-boilerplate/
for the original react + redux + chrome extension boilerplate.


### Installation for Developers

#### Short explanation if you like: 

Very high-level intro: we run a package manager (npm) to gather up the files
we need and do some translating to the right version of javascript. For
example, there are two variants to create a working version that is updated as
you change the files [dev] or pack everything up in a build.

We'll write code in ES2015+ (Javascript 2015 version) 
but then a program called Babel 
rewrites it to be more compatible across browswers, and Webpack packs our code up in two ways: live when we are developing
(so if you make a change and refresh your browser, it will be normally be there) and also built into a zip. I've sometimes heard this called an "artifact" or
an "artifact generation pipeline" — basically a way to compile your code using
a variety of tools that you can ignore thanks to the boilerplate, and 
something of a surprise if you're used to just writing and perhaps minimizing
javascript scripts.

#### Prep: install npm if needed.

To get that all working, you need npm — the Node web server and package manager running. This varies depending on your machine
(Mac/Windows/Linux) and was surprisingly challenging for the first couple machines we worked on — most of the instructions
assume you are a developer; i.e., if you have a Mac, of course you will have already have installed XCode, so the web
tutorial might leave that out.

Try these tutorials AND PLEASE TAKE NOTES. We need feedback — I installed XCode long ago so I can't do it for the first
time again, notes from beginner experiences will really help:

It's good to have a package manager like HomeBrew (mac) https://brew.sh/
For Mac, I believe these instructions usually fail, because they skip the XCode part, but might reference after you do that:
https://www.taniarascia.com/how-to-install-and-use-node-js-and-npm-mac-and-windows/


Volunteers: talk to Stephen, where are you stuck. I think the safe if slow way is this:
1) XCode. Untested so far, might be as simple as getting a terminal and typing:
  xcode-select --install
  and following instructions.
2) Package Manager. Mac = Homebrew or Fink, https://docs.brew.sh/Installation.html Linux: apt-get (Ubuntu) or similar
3) you might need curl ... feedback request, is it there already? Any other stumbling blocks?

Then go to any of the tutorials and get npm and node running:
http://blog.teamtreehouse.com/install-node-js-npm-mac (I suspect this is a good choice for Mac, feedback?)  Or
https://www.taniarascia.com/how-to-install-and-use-node-js-and-npm-mac-and-windows/ (untried for Windows)

#### Commands to run the dev version

```bash
# clone it
$ git clone git@github.com:StephenCataldo/comment-better.git
(also would follow same instructs for the Guide-Comment-Insert extension, into a separate folder)
$ git clone git@github.com:StephenCataldo/guide-comment-insert--react.git

# cd guide-comment-insert--react

# Install dependencies
$ npm install
```

## Development. Create a Node server that watches for your code changes and updates your extension. Many changes will appear as soon as you reload a page; css changes tend to require breaking out of the command and running again.

* Run script
```bash
# build files to './dev'
# start webpack development server
$ npm run dev
```
* If you're developing Inject page, please allow `https://localhost:3000` connections. (Because `injectpage` injected GitHub (https) pages, so webpack server procotol must be https.)
* [Load unpacked extensions](https://developer.chrome.com/extensions/getstarted#unpacked) with `./dev` folder.

What you'll see if it works, something like:
"webpack building...
webpack built 7eff4817f3d4a59be59d in 74ms"
(And it behaves as if it hanging ... but it's hanging working.)

Every time you change your code, npm will still be running, and the extension
in the dev directory will be updated.


#### React/Redux hot reload

This boilerplate uses `Webpack` and `react-transform`, and use `Redux`. You can hot reload by editing related files of Popup & Window & Inject page.

#### Using Redux DevTools Extension

You can use [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) on development mode.

## Build. Produce a version we can upload to Chrome store.

```bash
# build files to './build'
$ npm run build
```The dev plus patient participants version:
$ npm run build && zip -r build.zip build
(untested! if this works, erase this line!)

#> Our process. Run builds on up-to-date master, then
git add .
git commit -m "This is a standard commit `after npm run dev`"



## Compress

```bash
# compress build folder to {manifest.name}.zip and crx
$ npm run build
$ npm run compress -- [options]
```



### React Chrome Extension Boilerplate

> Boilerplate for Chrome Extension React.js project.

## Features

 - Simple [React](https://github.com/facebook/react)/[Redux](https://github.com/rackt/redux) examples of Chrome Extension Window & Popup & Inject pages
 - Hot reloading React/Redux (Using [Webpack](https://github.com/webpack/webpack) and [React Transform](https://github.com/gaearon/react-transform))
 - Write code with ES2015+ syntax (Using [Babel](https://github.com/babel/babel))
 - E2E tests of Window & Popup & Inject pages (Using [Chrome Driver](https://www.npmjs.com/package/chromedriver), [Selenium Webdriver](https://www.npmjs.com/package/selenium-webdriver))

## Examples

The example is edited from [Redux](https://github.com/rackt/redux) TodoMVC example.

#### Popup

![Popup](https://cloud.githubusercontent.com/assets/3001525/14128490/dc05e9f8-f653-11e5-9de6-82d1de01844a.gif)

The `todos` state will be saved to `chrome.storage.local`.

#### Window

![Window](https://cloud.githubusercontent.com/assets/3001525/14128489/da176b62-f653-11e5-9bff-fefc35232358.gif)

The context menu is created by [chrome/extension/background/contextMenus.js](chrome/extension/background/contextMenus.js).

#### Inject page

The inject script is being run by [chrome/extension/background/inject.js](chrome/extension/background/inject.js). A simple example will be inject bottom of page(`https://github.com/*`) if you visit.

If you are receiving the error message `Failed to load resource: net::ERR_INSECURE_RESPONSE`, you need to allow invalid certificates for resources loaded from localhost. You can do this by visiting the following URL: `chrome://flags/#allow-insecure-localhost` and enabling **Allow invalid certificates for resources loaded from localhost**.

#### Options

If you want to build `crx` file (auto update), please provide options, and add `update.xml` file url in [manifest.json](https://developer.chrome.com/extensions/autoupdate#update_url manifest.json).

* --app-id: your extension id (can be get it when you first release extension)
* --key: your private key path (default: './key.pem')  
  you can use `npm run compress-keygen` to generate private key `./key.pem`
* --codebase: your `crx` file url

See [autoupdate guide](https://developer.chrome.com/extensions/autoupdate) for more information.

## Test

* `test/app`: React components, Redux actions & reducers tests
* `test/e2e`: E2E tests (use [chromedriver](https://www.npmjs.com/package/chromedriver), [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver))

```bash
# lint
$ npm run lint
# test/app
$ npm test
$ npm test -- --watch  # watch files
# test/e2e
$ npm run build
$ npm run test-e2e
```

## LICENSE

[MIT](LICENSE)




## Crap notes go below here!

### Thoughts on UX

#### When a keyword loads how does user see it?

Original code creates a menu-like link, dropped over the page, kindof 
annoying. Very annoying. Don't do that. Go with the usual extension
approach of adding a little icon next to the top bar. When a keyword is 
found in the page:
1) highlight it.
2) perhaps create a small dropdown menu under the icon at the top. Perhaps
temporary, just long enough to get the mouse to it if people want to react
right away, then out of the way... but having reminded user that the tool
is active for this page.


