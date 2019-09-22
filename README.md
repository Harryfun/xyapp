# xyapp

## Project setup
```
npm install
```
### Change Environment
- 内网：需要修改`xyapp>src>main.js line42` 地址切换成 `axios.defaults.baseURL = 'http://127.0.0.1:1337/'`
- 外网：需要修改 `xyapp>src>main.js line44` 地址切换成 `axios.defaults.baseURL = 'http://157.122.54.189:9095/'`
### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
