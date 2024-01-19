## 关于模块化

<https://juejin.cn/post/7117673524692516895>

<https://juejin.cn/post/7116783579677327397>

## 引入nanoid之后，遇到报错
>
> ts-node 会编译成commonjs，然后执行。但是nanoid只有esm的包,所以会报错。
![20240118145648](https://raw.githubusercontent.com/Delta1035/tuchuang/main/2024-01-1620240118145648.png)

![20240118145712](https://raw.githubusercontent.com/Delta1035/tuchuang/main/2024-01-1620240118145712.png)

### 解决办法

1. 将nanoid降级为支持commonjs的版本
2. 把当前项目的打包格式从commonjs改为esm

#### 方案1 找到commonjs版本的nanoid

![20240118150103](https://raw.githubusercontent.com/Delta1035/tuchuang/main/2024-01-1620240118150103.png)

#### 方案2 将项目打包格式升级为esm

- 因为构建编译是由ts-node来执行的，那么可以通过修改tsconfig.json文件调整编译产物。通过修改compilerOptions的module和target字段来让编译后的代码直接使用import引入的依赖（也就是说编译成支持esm代码）。

``` json
{
  "compilerOptions": {
    "outDir": "dist",
    "skipLibCheck": true,
    "strict": true,
    "noEmit": false,
    "module":"ES2022",
    "target": "ES5"
  },
  "include": ["src/**/*.ts"]
}
```
