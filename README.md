
# make-doc
**make-doc** is a tool based on React, Webpack and atom-highlights to nicely document your javascript files.

## **GET STARTED**

```
npm install
```
```
npm start
```

You will be prompt. Enter the path of a javascript file name then press enter (leave empty for demo). Makedoc script will parse your file and then render it in your browser at.

http://localhost:8080

or

http://localhost:8080/webpack-dev-server (with react-hot-loader)


**Note**: This is not mandatory but your javascript file must contains comments
```javascript
//A comments
```

or
```javascript
/*
I can comment this way to !
*/
```

You can change css styles in `./doc/components/App.jsx`

```javascript
import '../styles/themes/monokai/monokai.less';
//Could be replace by
import '../styles/themes/batman/batman.less';
```

**Note**: For the while only `monokai` and `batman` themes are available.

## Roadmap
**0.0.1**:

This is the WIP current version. Its only work for local and development environment. Only JS file are covered. It contains only 2 CSS theme. The css layout is a mess.

## Possible improvements

* Theme could be dynamic as input javascript file.
* Add some theme from atom.
* CSS layout could be better as well user interaction.
* Highlights grammar (ES6 or other) could be implemented.
* Only work in local and development environment.
Enjoy to fork me :)
