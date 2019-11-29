# Hamming_Code
![](https://img.shields.io/badge/yarn-v1.19.1-ff69b4) ![](https://img.shields.io/badge/node.js_support-v10.16.3-ff69b4) ![](https://img.shields.io/badge/JavaScript_library-React-blue) ![](https://img.shields.io/badge/React_components-Material--UI-blue) ![](https://img.shields.io/badge/build-passing-brightgreen)

This project is a group assignment on Computer Network, aimed to explain how hamming code works on network aspects to amateurs. It is coded by a trio from Tongji University, China. Feel free to contact us if any issues occur.

## Try It Out!
Click [Hamming_Code](https://xpnice.github.io/Hamming_Code/) and have a quick view of our project!
## config.json中的变量说明
### code
信息码的长度与内容

| 变量名      |  类型  |  缺省  |        备注        |
| ----------- | :----: | :----: | :----------------: |
| inf_length  | number |   4    | 首页信息码长(1~11) |
| inf_code    | string | "1111" |     首页信息码     |
| show_length | number |   4    | 次页信息码长(3~5)  |
| show_code   | string | "1101" |     次页信息码     |
### color  
配色
| 变量名     |  类型  |   缺省    |            备注             |
| ---------- | :----: | :-------: | :-------------------------: |
| text       | string | "#45454d" |          文本颜色           |
| primary    | string | "#ffd5d5" |          按钮颜色           |
| square_inf | string | "#ffd5d5" |     次页信息码方块颜色      |
| square_s   | string | "#fc7fb2" |     次页校验码方块颜色      |
| secondary  | string | "#fff1e9" |     首页信息码方块颜色      |
| highlight  | string | "#fc7fb2" | 首页校验码方块颜色\高亮颜色 |
| backgroud1 | string | "#f9f6f2" |      次页导航栏背景色1      |
| backgroud2 | string | "#fff1e9" |      次页导航栏背景色2      |

### square
码元方块的基本配置，注意width和height务必与css文件中的code-box-shape中的同名项保持一致，只修改这里会动画错位
| 变量名     |  类型  | 缺省  |      备注      |
| ---------- | :----: | :---: | :------------: |
| width      | number |  50   |    方块宽度    |
| height     | number |  50   |    方块高度    |
| marginLeft | number |  10   |   方块列间距   |
| marginTop  | number |  10   |   方块行间距   |
| col_width  | number |  120  | 左侧边栏的宽度 |

### animation
动画配置
| 变量名 |  类型  |        备注        |
| ------ | :----: | :----------------: |
| ani1   | object |  海明码检测页动画  |
| ani2   | object | 校验位数的计算动画 |
| ani3   | object |   校验位移位动画   |
| ani4   | object |   校验位计算动画   |
| ani5   | object | 最终海明码展示动画 |
| ani6   | object |      纠错动画      |
对象内部的配置
| 变量名   |  类型  | 缺省  |               备注               |
| -------- | :----: | :---: | :------------------------------: |
| delay    | number | 1000  |        动画延时（单位ms）        |
| duration | number |  450  |           动画持续时间           |
| scale    | number |  0.7  | 以方块中心为中心缩放到scale(0~1) |
| repeat   | number |   1   |           动画重复次数           |
## Befor You Start
Make sure you have a recent version of [Node.js](https://nodejs.org/en/) installed.

## How To Run

### 1.Create React App
```Bash
npx create-react-app my-app
cd my-app
dir
```
Create React App is a comfortable environment for learning React, and is the best way to start building a new single-page application in React.

It sets up your development environment so that you can use the latest JavaScript features, provides a nice developer experience, and optimizes your app for production. You’ll need to have Node >= 8.10 and npm >= 5.6 on your machine. 

See [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) for more information. Or visit [React环境搭建教程](https://www.runoob.com/react/react-install.html) if you understand Chinese.
### 2.Clone The Project
After the previous step, you make a new directory "my-app" as your project directory. Overlay all the files and directories other than node_modules by the clone.

### 3.Install Yarn
```Bash
yarn 
```
Follow the steps to [install yarn](https://yarnpkg.com/zh-Hans/docs/install#windows-stable).

### 3.Install Material-UI
```Bash
#with npm, but part of the code may not be compiled
npm install @material-ui/core 
#with yarn, recomonded
yarn add @material-ui/core
```
### 4.Install React-Motion
```Bash
yarn add rc-tween-one
yarn add rc-banner-anim
```
View more on [React-Motion](https://motion.ant.design/api/tween-one-cn)
### 5.Enjoy

```Bash
yarn start
```
Runs the app in the development mode.Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.You will also see any lint errors in the console.


