/* eslint-disable no-loop-func */
import './index.css';
import React from 'react'
import TweenOne from 'rc-tween-one';
import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
import json_config from "./config.json";
import { Array } from 'core-js';
import 'rc-texty/assets/index.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
const BgElement = Element.BgElement;
//introduction板块类
class Introduction extends React.Component {
   //introduction构造函数
   constructor(props) {
      super(props);
      const squares = [];
      const div = [];
      const D = [[0, 1], [0, 3], [1, 3], [0, 1, 3], [0, 7]];
      var i, j = 0;
      var k;
      var s_len = this.get_huming_len(json_config.code.show_length);
      var new_length = json_config.code.show_length + s_len;
      var new_code = Array(new_length);
      var decode = Array(new_length);
      //var div=Array(new_length);
      var show_check = Array(s_len);
      for (i = 0; i < s_len; i++) {
         show_check[i] = false;
      }
      for (i = 0; i < new_length; i++) {
         div[i] = Array(0);
         decode[i] = '?'
         if (i === 0 || i === 1 || i === 3 || i === 7) {
            new_code[i] = '?';
            for (k = 0; k < json_config.code.show_length; k++) {
               if (-1 !== D[k].indexOf(i)) {
                  if (k === 0)
                     div[i].push(k + 2)
                  else if (k <= 3)
                     div[i].push(k + 3)
                  else div[i].push(k + 4)
               }
            }
         }
         else {
            new_code[i] = json_config.code.show_code[j];
            div[i] = D[j++];
         }
         squares[i] = {//方块
            inf: new_code[i],//码的内容
            name: new_code[i] === '?' ? ('S' + (i - j)) : ('H' + (j - 1)),//方块渲染中的名字
            is_s: new_code[i] === '?' ? true : false,//是否是校验位
            init_pos: new_code[i] === '?' ? (i - j + json_config.code.show_length) : (j - 1),//最初的码位
            div: div[i],//与该码有关的位 从0开始
            div_mot: div[i].slice()//div的复制版本 用于检验位的运算动画
         };
      }
      this.state = {
         squares: squares,//方块
         i_len: json_config.code.show_length,//信息码长
         s_len: s_len,//校验码长
         len: new_length,//总海明码长度
         code: new_code.join(''),//海明码
         show_check: show_check,//当前计算的校验位数组
         check_mode: -1,//当前在计算的校验位0，1，3，7
         decode: decode,//待检错的码
         right_len: false,//待检错的码长度是否正确
         result: 0,//计算过程中的中间结果
         pos: 64,//计算过程中的当前计算行数
         index: -1
      };
   }
   //动画2信息码方块渲染
   renderSquare_inf(i) {
      if (i < this.state.i_len)
         return (
            <TweenOne className="code-box-shape" style={{ marginLeft: json_config.square.marginLeft }}>
               <div style={{ color: json_config.color.text }}>H{i}</div>
            </TweenOne>
         );
   }
   //动画2校验码方块渲染：动画={浮现}
   renderSquare_s(i) {
      if (i < this.state.len)
         return (
            <TweenOne
               animation={{
                  opacity: 0,
                  duration: json_config.animation.ani2.duration,//3000
                  delay: json_config.animation.ani2.delay,//1000
                  type: "from"
               }}
               style={{ background: json_config.color.square_s, marginLeft: json_config.square.marginLeft }}
               className="code-box-shape"
            >
               <div style={{ color: json_config.color.text }}>S{i}</div>
            </TweenOne>
         )
   }
   //动画3海明码方块渲染：动画={平移}
   renderSquare_cs(i) {
      var x = (i - this.state.squares[i].init_pos) * (json_config.square.marginLeft + json_config.square.width)
      if (i < this.state.i_len + this.state.s_len) {
         return (
            <TweenOne
               animation={{
                  x: x,
                  rotate: 360,
                  duration: json_config.animation.ani3.duration,//3000
                  delay: json_config.animation.ani3.delay,//1000
               }}
               style={{ background: this.state.squares[i].is_s === true ? json_config.color.square_s : null, marginLeft: json_config.square.marginLeft }}
               className="code-box-shape"
               key={"cs" + i}
            >
               <div style={{ color: json_config.color.text }}>{this.state.squares[i].name}</div>
            </TweenOne>
         )
      }
   }
   //动画4海明码方块渲染:k为行数，从0开始
   renderSquare_mot(k) {

      var init_pos = k === 0 ? -1 : this.state.squares[k].init_pos;
      const arr = [];
      const inf_mot = [];
      const marginTop = k === 0 ? (json_config.square.marginTop + "px") : ("-" + json_config.square.height + "px");
      var delay = (init_pos + 1) * json_config.animation.ani4.delay;
      var duration = json_config.animation.ani4.duration;
      var y = (init_pos + 1) * (json_config.square.marginTop + json_config.square.height);
      var i;
      if (this.state.check_mode > -1) {
         var div = this.state.squares[this.state.check_mode].div.slice();
         div.reverse();//div为当前计算的校验位所在列的所有
      }

      //设置第0列的算式=>info
      var info = "原始码字"
      var flag = 0;
      for (i = 0; i < this.state.i_len + this.state.s_len; i++) {
         if (k === 0) break;
         else if (i === 0) info = 'D' + (k + 1);
         if (this.state.squares[k].div.indexOf(i) !== -1) {
            info += (flag++ === 0 ? '=D' : '+D') + (i + 1);
         }
      }

      //设置init_pos行内各列的动画
      var mot = Array(this.state.len + 1);//共(this.state.len+1)*(this.state.i_len+1)个，每块为横纵坐标y*x_max+x
      for (i = 0; i <= this.state.len; i++) {//注意对于state的squares来讲i从1开始

         mot[i] = [];
         if (0 === i) {//第0列的算式动画
            mot[i].push({
               y: y,
               duration: duration,
               delay: this.state.check_mode !== -1 ? 0 : delay
            })
            arr.push(<TweenOne
               animation={mot[0]}
               style={{ zIndex: 40 - k, width: json_config.square.col_width + "px", marginLeft: json_config.square.marginLeft }}
               className="code-box-shape"
            >
               <TweenOne className="banner-user-elem" key={"first" + k} sytle={{ textAlign: "center" }} >
                  {info}
               </TweenOne>
            </TweenOne >)
         }
         else {//其他列
            var y_mov = (init_pos + 1) * (json_config.square.marginTop + json_config.square.height);
            var x_mov = 0;
            var pos;
            if (this.state.squares[k].div.indexOf(i - 1) === -1 && i - 1 !== k)//如果不是该行的信息码和与其对应的位纵向不移动
               y_mov = 0;
            //每一行，把该行对应的信息码和该信息码相关的校验码下移动
            mot[i].push({ x: x_mov, y: y_mov, duration: duration, delay: this.state.check_mode !== -1 ? 0 : delay })
            if (this.state.check_mode > -1) {
               if (i - 1 !== k || this.state.squares[k].div.indexOf(this.state.check_mode) === -1)
                  y_mov = 0;
               else x_mov = (this.state.squares[k].div[this.state.squares[k].div.indexOf(this.state.check_mode)] - i + 1) * (json_config.square.marginLeft + json_config.square.width)
               mot[i].push({ y: y_mov, duration: duration, delay: this.state.check_mode !== -1 ? 0 : delay })//每行无关列归到第0行
               mot[i].push({ x: x_mov, duration: duration, delay: this.state.check_mode !== -1 ? 0 : delay })//每行相关列移动到对应列
               for (pos in div) {
                  if (x_mov !== 0) {
                     var dis = this.state.squares[div[pos]].init_pos - init_pos;//当前列对应的信息码到计算位的距离
                     if (dis <= 0)
                        y_mov = (this.state.squares[div[pos]].init_pos + 1) * (json_config.square.marginTop + json_config.square.height);
                     mot[i].push({
                        y: y_mov, duration: duration, delay: this.state.check_mode !== -1 ? 0 : delay, onComplete: (e) => {
                           if (parseInt(e.target.id) % (this.state.len + 1) - 1 === this.state.squares[this.state.check_mode].div_mot[this.state.squares[this.state.check_mode].div_mot.length - 1]) {
                              this.state.squares[this.state.check_mode].div_mot.pop();
                              this.setState({
                                 pos: parseInt(e.target.id) % (this.state.len + 1) - 1,
                                 result: this.state.squares[parseInt(e.target.id) % (this.state.len + 1) - 1].inf ^ this.state.result
                              })
                           }
                        }
                     })
                     if (dis <= 0)
                        mot[i].push({
                           scale: json_config.animation.ani4.xor.scale,
                           duration: json_config.animation.ani4.xor.duration,
                           yoyo: true,
                           repeat: json_config.animation.ani4.xor.repeat
                        })
                     else
                        mot[i].push({
                           duration: json_config.animation.ani4.xor.duration,
                           yoyo: true,
                           repeat: json_config.animation.ani4.xor.repeat
                        })
                  }
               }
               if (x_mov !== 0)
                  mot[i].push({
                     y: 0, duration: duration, delay: this.state.check_mode !== -1 ? 0 : delay, onComplete: () => {
                        this.gen_cd_i(this.state.check_mode);
                        let squares = this.state.squares.slice();
                        for (var i = 0; i < this.state.len; i++) {
                           squares[i].div_mot = this.state.squares[i].div.slice()
                        }
                        this.setState({
                           squares: squares,
                           pos: 64,
                           result: 0,
                        })
                     }
                  })
            }
            arr.push(
               <TweenOne
                  animation={mot[i]}
                  paused={false}
                  style={{ background: this.state.squares[i - 1].is_s === true ? json_config.color.square_s : null, marginLeft: json_config.square.marginLeft, zIndex: 40 - k }
                  }
                  key={"first" + k * (this.state.len + 1) + i}
                  id={k * (this.state.len + 1) + i}
                  className="code-box-shape"
               >
                  <div style={{ color: json_config.color.text, whiteSpace: 'pre-wrap' }}>{i - 1 < this.state.pos || x_mov === 0 ? (this.state.squares[i - 1].name + '\n' + this.state.squares[i - 1].inf) : ('\n' + this.state.result)}</div>
               </TweenOne >

            )
         }
      }
      inf_mot.push(<div className="box-queue" style={{ margin: 'relative', marginTop: marginTop }}> {arr}</div >)
      return (inf_mot)
   }
   //边栏渲染
   renderSquare_col(i) {
      return (
         <TweenOne className="code-box-cul" style={{ marginLeft: json_config.square.marginLeft }} >
            <div style={{ color: json_config.color.text }}>D{i + 1}</div>
         </TweenOne>
      );
   }
   //动画5最终海明码方块渲染
   renderSquare_final(i) {
      var content = this.state.squares[i].name + '\n' + this.state.code[i]
      return (
         <TweenOne className="code-box-shape" style={{ background: this.state.squares[i].is_s === true ? json_config.color.square_s : null, marginLeft: json_config.square.marginLeft }}>
            <div style={{ color: json_config.color.text, whiteSpace: 'pre-wrap' }}>{content}</div>
         </TweenOne>
      );
   }
   //动画6纠错码的修改
   change_detect(i){
      
   }
   //动画6待纠错码方块渲染
   renderSquare_detect(i) {
      var content = this.state.squares[i].name + '\n' + this.state.decode[i]
      return (
         <TweenOne
            className="code-box-shape"
            style={{ background: this.state.squares[i].is_s === true ? json_config.color.square_s : null, marginLeft: json_config.square.marginLeft }}
            onClick={this.change_detect(i)}
         >
            <div style={{ color: json_config.color.text, whiteSpace: 'pre-wrap' }}>{content}</div>
         </TweenOne>
      );
   }
   //根据信息码长获取校验码位数
   get_huming_len(i) {
      if (i === 1)
         return 2;
      else if (i >= 2 && i <= 4)
         return 3;
      else if (i === 5)
         return 4;
      else {
         alert("code too long!");
         return -1;
      }
   }
   //设置当前计算的校验位数，i为初始位置
   show_check(i) {
      let show_check = this.state.show_check.slice();
      var k;
      for (k = 0; k < this.state.s_len; k++) {
         show_check[k] = (k === i && ((2 ** i - 1) !== this.state.check_mode)) ? true : false;
      }
      k = (2 ** i - 1) === this.state.check_mode ? -2 : 2 ** i - 1;//show_check的值为当前计算校验位的下标
      this.setState({
         show_check: show_check,
         check_mode: k,
      })
   }
   //动画4中按钮的渲染
   render_buttons(i) {
      const inf = '计算S' + i;
      return (
         <Button
            variant="contained"
            onClick={() => this.show_check(i)} //
         >
            {inf}
         </Button>
      )
   }
   //动画4的重置
   reset_mot() {
      let show_check = this.state.show_check.slice();
      var k;
      for (k = 0; k < this.state.s_len; k++) {
         show_check[k] = false;
      }
      var i;
      var new_code = Array(this.state.len);
      let squares = this.state.squares.slice();
      for (i = 0; i < this.state.len; i++) {
         if (this.state.squares[i].is_s) {
            squares[i].inf = '?';
         }
         new_code[i] = squares[i].inf;
      }
      this.setState({
         squares: squares,
         code: new_code.join(''),
         show_check: show_check,
         check_mode: -1
      })
   }
   //获取检验位的初始位数
   get_s_init(i) {
      if (i === 0) return 0
      if (i === 1) return 1
      if (i === 3) return 2
      if (i === 7) return 3
   }
   //获取decoding表中的值
   get_decode(e) {
      //e.preventDefault();
      var str = Array(this.state.len)
      var right_len = false
      var i;
      if (this.state.len === e.target.value.length)
         right_len = true
      for (i = 0; i < this.state.len; i++)
         if (i < e.target.value.length)
            str[i] = e.target.value[i]
         else
            str[i] = '?'
      this.setState({
         decode: str,
         right_len: right_len
      })
   }
   //检查纠错过程输入的码长是否准确
   check_decode() {
      for (var i = 0; i < this.state.len; i++)
         if (this.state.decode[i] !== '1' && this.state.decode[i] !== '0')
            return false;
      return true;
   }
   //返回两个等长字符串的差异字符个数
   getdifbit(str1, str2) {
      var num = 0;
      for (var i = 0; i < str1.toString().length; i++) {
         num += str1[i] !== str2[i] ? 1 : 0;
      }
      return num;
   }
   //根据信息码的原始位获得在最终海明码的位数
   get_cinfinal(i) {
      if (i >= 4) return 8
      else if (i >= 1) return i + 3
      else return i + 2
   }
   //纠错
   detect() {
      if (this.getdifbit(this.state.decode, this.state.code) > 1) {
         alert("不能检查两位及以上的错误")
         return;
      }
      var detect_code = Array(this.state.s_len);
      var j = 0;
      for (var i = 0; i < this.state.len; i++) {
         if (this.state.squares[i].is_s) {
            detect_code[j++] = this.detect_i(i);
         }
      }
      var num = this.bin2int(detect_code);
      alert(num === 0 ? "没有错误" : ("第" + num + "位D" + num + "错误"));
   }
   //二进制字符串转数字
   bin2int(str) {
      var num = 0;
      for (var j = 0; j < str.toString().length; j++) {
         num += str[j] === 1 ? (2 ** j) : 0;
      }
      return num;
   }
   //纠错码：计算码位k的值
   detect_i(k) {
      var inf = [];
      var i;
      for (i in this.state.squares[k].div)
         inf.push(this.state.decode[this.state.squares[k].div[i]])
      var result = this.state.decode[k];
      for (i = 0; i < inf.length; i++)
         result ^= inf[i];
      return result;
   }
   //生成海明码：计算码位k的值
   gen_cd_i(k) {
      var inf = [];
      var i;
      let squares = this.state.squares.slice();
      var new_code = Array(this.state.len);
      for (i = 0; i < this.state.len; i++)
         new_code[i] = this.state.code[i]
      for (i in this.state.squares[k].div)
         inf.push(this.state.squares[this.state.squares[k].div[i]].inf)
      var result = 0;
      for (i = 0; i < inf.length; i++) {
         result ^= inf[i];
      }
      squares[k].inf = result;
      new_code[k] = result;
      this.setState({
         squares: squares,
         code: new_code.join(''),
      })
      return result;
   }
   //生成海明码
   gen_cd() {
      var i;
      var new_code = Array(this.state.len);
      let squares = this.state.squares.slice();
      for (i = 0; i < this.state.len; i++) {
         if (this.state.squares[i].is_s) {
            squares[i].inf = this.gen_cd_i(i);
         }
         new_code[i] = squares[i].inf;
      }
      this.setState({
         squares: squares,
         code: new_code.join(''),
         decode: new_code.join('').slice()
      });
   }
   //页面渲染函数
   render() {
      var i;
      const inf_code = [];//动画1信息码
      const inf_s = [];//动画1校验码
      const inf_cs = [];//动画2
      const inf_mot = [];//动画3主模块
      const inf_col = [];//动画3边栏
      const buttons = [];//动画3按钮组
      const inf_final = [];//动画4最终汉明码
      const inf_detect = []//动画5待纠错码
      var j = 0;
      var detect_tip = "海明码的纠错过程与计算过程非常类似，只需要把待检查的码根据之前的方法生成r位纠错码，\nr位纠错码所代表的二进制数就是错误的位数。"
      var tip = "现在，我们需要通过已有的信息码来求解校验码。\n对于每一个信息位Hi，将i拆解成几个二的幂次减一的正整数，如3=1+2，7=1+2+4，等式左端为信息码的位数，而等式右端即为校验码的位数，如H2对应S0和S1。\n对于每一位的对应关系究竟是如何的可以通过右侧的动画观察：\n每一横行都对应一个信息位，对于你输入的"
      tip += json_config.code.show_code + '有' + json_config.code.show_length + '位,因而有' + json_config.code.show_length + '行，\n每一行左侧的算式向你展示了特定位信息码对应的校验码的位数。\n点击下方的按钮来计算校验码吧！';
      if (this.state.check_mode > -1) {
         tip = "现在你可以看到校验位S" + this.get_s_init(this.state.check_mode) + '对应的列下面排列了几个信息位小方块\nD'
         //console.log(this.state.squares)
         tip += this.state.squares[this.state.check_mode].div.map(function (n) { return n + 1 }).join(',D');
         tip += ' 或 H' + this.state.squares[this.state.check_mode].div.map(function (n) {
            if (n >= 7)
               n -= 4;
            else if (n >= 3)
               n -= 3;
            else n -= 2;
            return n
         }).join(',H');
         tip += "\n这表示S" + this.get_s_init(this.state.check_mode) + "与以上几个信息位有关\n"
         tip += "接下来我们只需要很简单的通过异或运算得到S" + this.get_s_init(this.state.check_mode) + "的值\n"
         tip += "S" + this.get_s_init(this.state.check_mode) + ' = H';
         tip += this.state.squares[this.state.check_mode].div.map(function (n) {
            if (n >= 7)
               n -= 4;
            else if (n >= 3)
               n -= 3;
            else n -= 2;
            return n
         }).join(' XOR H');
         tip += '\n = ';
         //console.log(this.state.squares[this.state.check_mode].div)
         var inf = [];
         for (i in this.state.squares[this.state.check_mode].div)
            inf.push(this.state.squares[this.state.squares[this.state.check_mode].div[i]].inf)
         tip += inf.join(' XOR ')

         tip += '\n = ' + this.state.code[this.state.check_mode];
      }
      for (i = 0; i < this.state.i_len; i++) {
         inf_code.push(
            this.renderSquare_inf(i)
         )
      }
      for (i = 0; i < this.state.s_len; i++) {
         inf_s.push(
            this.renderSquare_s(i)
         )
      }
      for (i = 0; i < this.state.s_len; i++) {
         buttons.push(
            this.render_buttons(i)
         )
      }
      for (i = 0; i < this.state.len; i++) {
         if (!this.state.squares[i].is_s)
            inf_cs.push(
               this.renderSquare_cs(i)
            )
      }
      for (i = 0; i < this.state.len; i++) {
         if (this.state.squares[i].is_s)
            inf_cs.push(
               this.renderSquare_cs(i)
            )
      }
      for (i = 0; i < this.state.len; i++) {
         if ((!this.state.squares[i].is_s) || j === 0) {
            inf_mot.push(
               this.renderSquare_mot(j === 0 ? j++ : i)
            )
         }
      }
      inf_col.push(<TweenOne className="code-box-cul" style={{ width: json_config.square.col_width + "px", opacity: 0, marginLeft: json_config.square.marginLeft }} />)
      for (i = 0; i < this.state.len; i++) {
         inf_col.push(
            this.renderSquare_col(i)
         )
      }
      inf_final.push(<TweenOne className="code-box-shape" style={{ width: json_config.square.col_width + "px", marginLeft: json_config.square.marginLeft }} >原始码</TweenOne>)
      for (i = 0; i < this.state.len; i++) {
         inf_final.push(
            this.renderSquare_final(i)
         )
      }
      inf_detect.push(<TweenOne className="code-box-shape" style={{ width: json_config.square.col_width + "px", marginLeft: json_config.square.marginLeft }} >待检查码</TweenOne>)
      for (i = 0; i < this.state.len; i++) {
         inf_detect.push(
            this.renderSquare_detect(i)
         )
      }
      return (
         <BannerAnim prefixCls="banner-user" type="across">
            <Element prefixCls="banner-user-elem" key="0" >
               <BgElement key="bg" className="bg" style={{ background: json_config.color.backgroud2 }} />
               <TweenOne
                  style={{ margin: 'relative', top: '20%' }}
                  className="banner-user-title"
                  animation={{ y: 30, opacity: 0, type: 'from' }}>
                  海明码简介
          </TweenOne>
               <TweenOne
                  style={{ margin: 'relative', top: '30%' }}
                  className="banner-user-text"
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
               >
                  海明码是一种多重奇偶检错系统，用于检错和纠错。用在海明码中的全部传输码字由原来的信息和附加的奇偶校验位组成。
                  每一个奇偶位被编在传输码字的特定位置上。
          </TweenOne>
               <TweenOne className="banner-user-text"
                  style={{ margin: 'relative', top: '30%' }}
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
               >
                  当传输出现单bit错误时，无论错误位置是信息位还是校验位，都能够被检测。
                     本质上是用多个奇偶校验来纠正单bit错。
          </TweenOne>
               <TweenOne className="banner-user-text"
                  style={{ margin: 'relative', top: '30%' }}
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
               >
                  通俗的讲，海明码就是对于本来m位的信息码增添r位校验码构成一个新的m+r位的码字，具有纠正一位错的功能。
          </TweenOne>
            </Element>
            <Element prefixCls="banner-user-elem" key="1" >
               <BgElement key="bg" className="bg" style={{ background: json_config.color.backgroud1 }} />
               <TweenOne className="banner-user-title" style={{ margin: 'relative', top: '10%' }} animation={{ y: 30, opacity: 0, type: 'from' }}>
                  海明码位数
          </TweenOne>
               <TweenOne className="banner-user-text" style={{ margin: 'relative', top: '17%' }}
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
               >
                  当有m个数据位，我们需要确定校验位r的值（传输总位数n=m+r）

          </TweenOne>
               <TweenOne className="banner-user-text"
                  style={{ margin: 'relative', top: '17%' }}
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
               >
                  m个数据位——共2<sup>m</sup>种合法编码，
          </TweenOne>
               <TweenOne className="banner-user-text"
                  style={{ margin: 'relative', top: '17%' }}
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
               >
                  r个校验位——共可以表示2<sup>r</sup>种情况
          </TweenOne>
               <TweenOne className="banner-user-text"
                  style={{ margin: 'relative', top: '17%' }}
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
               >
                  传输总位数n——共存在n+1种不同的情况（任意m个信息码元其中一个发生错误，任意r个检验位其中一个发生错误，无错）为了可以表示每种情况，以便正确的纠错，所以需满足
                  </TweenOne>
               <TweenOne className="banner-user-text"
                  style={{ margin: 'relative', top: '17%' }}
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
               >
                  2<sup>r</sup> >= n+1=m+r+1
                  </TweenOne>
               <div className="box-queue" style={{ top: '25%' }}>
                  {inf_code}
                  {inf_s}
               </div>
            </Element>
            <Element prefixCls="banner-user-elem" key="2" >
               <BgElement key="bg" className="bg" style={{ background: json_config.color.backgroud2 }} />
               <TweenOne className="banner-user-title" style={{ margin: 'relative', top: '20%' }} animation={{ y: 30, opacity: 0, type: 'from' }}>
                  生成新码字
          </TweenOne>
               <TweenOne
                  className="banner-user-text"
                  style={{ margin: 'relative', top: '28%' }}
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
               >
                  将原有m个数据位与r个校验位一起编为长n=m+r位的新码字（校验位理论上可以放置于任何位置，一般放在2<sup>k</sup>位置或者全部置于最后，这里为了更加清楚易懂，我们置于2<sup>k</sup>位置）
                  </TweenOne>
               <div className="box-queue" style={{ margin: 'relative', top: '40%' }}>
                  {inf_cs}
               </div>
            </Element>
            <Element prefixCls="banner-user-elem" key="4">
               <BgElement key="bg" className="bg" style={{ background: json_config.color.backgroud1 }} />
               <Grid key="GRID_CONT_4" container spacing={1} style={{ marginTop: '1%', marginLeft: '1%', marginRight: "1%" }}>
                  <Grid key="GRID_CONT_4_1" item xs={4}>
                     <TweenOne key="GRID_CONT_4_1_1" className="banner-user-title" style={{ margin: 'relative' }} animation={{ y: 30, opacity: 0, type: 'from' }}>
                        计算校验码
          </TweenOne>
                  </Grid>
                  <Grid key="GRID_CONT_4_2" item xs={8} >
                     <div className="box-queue">
                        {inf_col}
                     </div>
                     {inf_mot}
                  </Grid>
                  <Grid key="GRID_CONT_4_3" item xs={4}>
                     <Button color="primary" fullWidth variant="contained" style={{ fontSize: "11px", whiteSpace: 'pre-wrap' }}>
                        {tip}
                     </Button>
                  </Grid>
                  <Grid key="GRID_CONT_4_4" item xs={8} >
                  </Grid>
                  <Grid key="GRID_CONT_4_5" item xs={4}>
                     <ButtonGroup
                        color="primary"
                        size="large"
                        fullWidth aria-label="full width outlined button group">
                        {buttons}
                     </ButtonGroup>
                  </Grid>
                  <Grid item xs={8}>
                  </Grid>
                  <Grid item xs={4}>
                     <ButtonGroup
                        color="primary"
                        size="large"
                        fullWidth aria-label="full width outlined button group">
                        <Button
                           variant="contained"
                           onClick={() => this.reset_mot()} //
                        >
                           重置
                     </Button>
                        <Button
                           variant="contained"
                           onClick={() => this.gen_cd()} //
                        >
                           一键计算
                     </Button>
                     </ButtonGroup>

                  </Grid>
               </Grid>
            </Element>
            <Element prefixCls="banner-user-elem" key="5" >
               <BgElement key="bg" className="bg" style={{ background: json_config.color.backgroud2 }} />
               <TweenOne className="banner-user-title" style={{ margin: 'relative', top: '20%' }} animation={{ y: 30, opacity: 0, type: 'from' }}>
                  最终海明码
          </TweenOne>
               <div className="box-queue" style={{ margin: 'relative', top: '40%' }}>
                  {inf_final}
               </div>
            </Element>
            <Element prefixCls="banner-user-elem" key="6">
               <BgElement key="bg" className="bg" style={{ background: json_config.color.backgroud1 }} />
               <Grid container spacing={3} style={{ marginTop: '1%', marginLeft: '1%' }}>
                  <Grid item xs={4}>
                     <TweenOne className="banner-user-title" style={{ margin: 'relative' }} animation={{ y: 30, opacity: 0, type: 'from' }}>
                        海明码纠错
          </TweenOne>
                  </Grid>
                  <Grid item xs={7} >
                     <div className="box-queue" >
                        {inf_col}
                     </div>
                     <div className="box-queue" style={{ marginTop: json_config.square.marginTop }}>
                        {inf_final}
                     </div>
                  </Grid>
                  <Grid item xs={4}>
                     <Button color="primary" fullWidth variant="contained" style={{ fontSize: "11px", whiteSpace: 'pre-wrap' }}>
                        {detect_tip}
                     </Button>
                  </Grid>
                  <Grid item xs={7} >
                     <div className="box-queue" >
                        {inf_col}
                     </div>
                     <div className="box-queue" style={{ marginTop: json_config.square.marginTop }}>
                        {inf_detect}
                     </div>
                  </Grid>
                  <Grid item xs={4}>
                     <ButtonGroup
                        color="primary"
                        size="large"
                        fullWidth aria-label="full width outlined button group">
                        <Button
                           variant="contained"
                           onClick={() => this.gen_cd()} //
                        >
                           计算海明码
                     </Button>
                        <Button
                           variant="contained"
                           onClick={() => this.detect()} //
                        >
                           纠错
                     </Button>
                     </ButtonGroup>
                  </Grid>

               </Grid>
            </Element>
         </BannerAnim>);
   }
}
export default Introduction