# React Chess

## Docker

### Build Docker Image

```shell
$ npm run build
  ...
  Creating an optimized production build
  ...
```

```shell
$ docker build -t roryclaasen/reactchess .
  ...
```

## Branches

| Branch | Travis CI | Server |
|:-------|:----------|:-------|
| [Production](https://github.com/roryclaasen/ReactChess/tree/master) | [![Build Status][CI-MASTER]](https://travis-ci.com/roryclaasen/ReactChess) | [GitHub Pages](https://roryclaasen.github.com/ReactChess) |
| [Develop](https://github.com/roryclaasen/ReactChess/tree/develop) | [![Build Status][CI-DEVELOP]](https://travis-ci.com/roryclaasen/ReactChess) | [Heroku](https://react-chessgame-dev.herokuapp.com) |
| [Custom](https://github.com/roryclaasen/ReactChess/tree/Custom) | [![Build Status][CI-CUSTOM]](https://travis-ci.com/roryclaasen/ReactChess) | N/A |

## License

This project is licensed under the MIT License - see the [license file](LICENSE) for details

[CI-MASTER]: https://travis-ci.com/roryclaasen/ReactChess.svg?branch=master
[CI-DEVELOP]: https://travis-ci.com/roryclaasen/ReactChess.svg?branch=develop
[CI-CUSTOM]: https://travis-ci.com/roryclaasen/ReactChess.svg?branch=custom
