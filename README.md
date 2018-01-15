### Comment Better is using everything below here as boilerplate, from
guide-comment-insert--react
The projects might or might not be combined.


#### Quick non-developer start


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






#### Original Version, 

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

#### Purpose & Plan

# guide-comment-insert
When you read an article online, this chrome extension checks a list of keywords of "issues" connected to URLs from a "guide," and makes them accessible. It is intended for commenting: providing cut-and-paste quick replies to articles. 


## Guide to Issues
  
# Phase 1: Expert Guides

When you read an article, this chrome extension checks a list of keywords
of "issues" or topics connected to URLs from a "guide," and makes them
accessible. It is intended for commenting: providing cut-and-paste
quick replies to articles. The initial client is CogntivePolitics.org
and perhaps a facebook group Social Media Approaches for Respect and
Tolerance.

# Phase 1B: Facebook and Twitter.

The main use-case is for commenting on facebook and twitter (as well
as news articles and blogs). Phase 1B is more tight integration with these
particular sites, integrating with posts or tweets instead of entire
pages.

# Phase 2: DIY

This may one day become (or be integrated with) a bookmark tool,
so that when you come across an article you find convincing,
or a well-footnoted source that backs up your opinions on a topic,
 you can connect it to a keyword or hashtag and have it available
when commenting on that topic.

## Thoughts on UX

# When a keyword loads how does user see it?

Original code creates a menu-like link, dropped over the page, kindof 
annoying. Very annoying. Don't do that. Go with the usual extension
approach of adding a little icon next to the top bar. When a keyword is 
found in the page:
1) highlight it.
2) perhaps create a small dropdown menu under the icon at the top. Perhaps
temporary, just long enough to get the mouse to it if people want to react
right away, then out of the way... but having reminded user that the tool
is active for this page.

#### Below here related to original boilerplate, 
####              and how to do builds 
> Thank you to https://github.com/jhen0409/react-chrome-extension-boilerplate/
for the original react + redux + chrome extension boilerplate.

# React Chrome Extension Boilerplate

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

### Installation


## Basic Setup for new developers

Short explanation if you like: we'll write code in ES2015+ (Javascript 2015 version) but then a program called Babel 
rewrites it to be more compatible across browswers, and Webpack packs our code up in two ways: live when we are developing
(so if you make a change and refresh your browser, it will be normally be there) and also built into a zip.

To get that all working, you need npm — the Node web server and package manager running. This varies depending on your machine
(Mac/Windows/Linux) and was surprisingly challenging for the first couple machines we worked on — most of the instructions
assume you are a developer; i.e., if you have a Mac, of course you will have already have installed XCode, so the web
tutorial might leave that out.

Try these tutorials. We need feedback — I have the same problem, I installed XCode long ago...
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


```bash
# clone it
$ git clone git@github.com:StephenCataldo/comment-better.git
(also would follow same instructs for the Guide-Comment-Insert extension, into a separate folder)
$ git clone git@github.com:StephenCataldo/guide-comment-insert--react.git

# cd guide-comment-insert--react

# Install dependencies
$ npm install
```

## Development. Create a Node server that watches for your code changes and updates your extension.

* Run script
```bash
# build files to './dev'
# start webpack development server
$ npm run dev
```
* If you're developing Inject page, please allow `https://localhost:3000` connections. (Because `injectpage` injected GitHub (https) pages, so webpack server procotol must be https.)
* [Load unpacked extensions](https://developer.chrome.com/extensions/getstarted#unpacked) with `./dev` folder.

#### React/Redux hot reload

This boilerplate uses `Webpack` and `react-transform`, and use `Redux`. You can hot reload by editing related files of Popup & Window & Inject page.

#### Using Redux DevTools Extension

You can use [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) on development mode.

## Build. Produce a version we can upload to Chrome store.

```bash
# build files to './build'
$ npm run build
```

## Compress

```bash
# compress build folder to {manifest.name}.zip and crx
$ npm run build
$ npm run compress -- [options]
```

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
