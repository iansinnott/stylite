# Stylite

A super lightweight style editor. Apply any styles you want to any site.

👉 [Chrome Web Store Link](https://chrome.google.com/webstore/detail/stylite/alghcdmjanomnafjjmmhegabkilpbaea) 👈

![Stylite Demo Gif](http://dropsinn.s3.amazonaws.com/stylite-demo.gif)

## Usage

* Install it ([Chrome Web Store Link](https://chrome.google.com/webstore/detail/stylite/alghcdmjanomnafjjmmhegabkilpbaea))
* Click the paint palette icon to bring up the style editor for the current site
* Click outside the editor to save
  * You can also press <kbd>cmd</kbd>+<kbd>enter</kbd> to save at any time

## Why?

* Many sites have styling issues. Small text, low contrast, useless sidebars, etc. Now you can fix that.
* **Super lightweight**. The project has zero dependencies except for the editor, which will only be loaded if you want to edit styles. This means the extension is super small when your browsing **and even** when custom styles are applied. You will only load the editor when you open it up to edit something, and even then it's not loaded from within Chrome so it's instantaneous.

## Why not [Stylus][] or [Stylebot][]?

In short: Less is more.

**Stylebot:** It was last updated in 2013 and some features don't seem to work any more. Also too many features.
**Stylus:** Looks like a great project. It might be what you're looking for if you want community driven stylesheets. However, if you just want to add your own custom styles now and then you are probably in the right place with Stylite.

[Stylus]: https://github.com/openstyles/stylus
[Stylebot]: https://github.com/ankit/stylebot

## Dev Reference

Some useful Chrome Extension resources.

* [Permissions][]

[Permissions]: https://developer.chrome.com/extensions/declare_permissions

## Dev

You will probably warn Yarn installed, but you can also use NPM. If you're using NPM just replace `yarn` with `npm run` in all the commands below.

* `yarn install`
* `yarn watch` to during dev
* `yarn test` to test things
* `yarn build` to build and zip the app for distribution

## TODO

* Change extension icon when styles are being applied
* Options page with listing of existing stylesheets
* Convert `background.js` to event script rather than background script
* Add automated script for packaging (see: https://developer.chrome.com/extensions/crx)
