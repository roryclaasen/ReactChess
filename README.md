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

| Branch | Build Status | Server |
|:-------|:----------|:-------|
| [Production](https://github.com/roryclaasen/ReactChess/tree/master) | [GitHub Actions](https://github.com/roryclaasen/ReactChess/actions) | [Heroku](https://react-chessgame.herokuapp.com) |
| [Develop](https://github.com/roryclaasen/ReactChess/tree/develop) | [GitHub Actions](https://github.com/roryclaasen/ReactChess/actions) | [Heroku](https://react-chessgame-dev.herokuapp.com) |
| [Custom](https://github.com/roryclaasen/ReactChess/tree/Custom) | [![Build Status][CI-CUSTOM]](https://travis-ci.com/roryclaasen/ReactChess) | N/A |

## License

This project is licensed under the MIT License - see the [license file](LICENSE) for details

[CI-CUSTOM]: https://travis-ci.com/roryclaasen/ReactChess.svg?branch=custom
