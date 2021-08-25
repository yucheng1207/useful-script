# useful-scripts

用于打包部署 useful-cli 创建的前端项目

# 编译

```
yarn compile
// 或
npm run compile
```

# 打 tags

```
yarn deploy 'xxxxx'
```

# 部署

```
npm publish
```

# 发布流程

将代码推到 github -> 编译 & 打 tag -> 发布

```
git push
yarn deploy 'xxxxx'
npm publish
```
