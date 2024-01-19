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
    "module":"",
    "target": "ES5"
  },
  "include": ["src/**/*.ts"]
}
```

- target字段表示编译后的代码对应的js版本，可以理解为单纯的es版本号（最终的代码结果还会受到其他参数的影响，target只是标注了大方向）
- module字段表示当前项目使用的模块化方案，所以选项为js历史上出现过的模块化方案
![20240119141808](https://raw.githubusercontent.com/Delta1035/tuchuang/main/2024-01-1620240119141808.png)
es6的模块化方案随着es版本的更新在迭代进化。例如：

1. ES2020新增了动态import和import.meta
2. Node16及其以后得NodeNext/ESNext增强了esm方案的兼容性，可以原生引入commonjs模块。
[TypeScript: TSConfig Reference]<https://www.typescriptlang.org/tsconfig#module>
3. 所以上面的es版本虽然都是esm，但是都有差异。
4. module的优先级是比target高的，所以在编译模块引入相关的代码时，优先使用module指定的方案，没有的话才会通过target找对应的方案，例如，target：es3，对应会使用commonjs
