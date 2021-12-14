# useful-scripts

用于打包部署 useful-cli 创建的前端项目

# 编译

```
yarn compile
// 或
npm run compile
```

# 部署

```
yarn deploy
// 或
yarn deployOnly
```

# 发布流程

将代码推到 github -> 编译 & 打 tag -> 发布，执行`yarn deploy`带上部署描述即可

```
yarn deploy 'xxxxx'
```
