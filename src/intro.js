import './index.css';
import React from 'react'
import TweenOne from 'rc-tween-one';
import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
import jsonData from "./config.json";
import { Array } from 'core-js';
import 'rc-texty/assets/index.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
const BgElement = Element.BgElement;
class Introduction extends React.Component {
   constructor(props) {
      super(props);
      const squares = [];
      const div = [];
      const D = [[0, 1], [0, 3], [1, 3], [0, 1, 3], [0, 7]];
      var i, j = 0;
      var k;
      var s_len = this.get_huming_len(jsonData[0].show_length);
      var new_length = jsonData[0].show_length + s_len;
      var new_code = Array(new_length);
      //var div=Array(new_length);
      var show_check = Array(s_len);
      for (i = 0; i < s_len; i++) {
         show_check[i] = false;
      }
      for (i = 0; i < new_length; i++) {
         div[i] = Array(0);
         if (i === 0 || i === 1 || i === 3 || i === 7) {
            new_code[i] = '?';
            for (k = 0; k < jsonData[0].show_length; k++) {
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
            new_code[i] = jsonData[0].show_code[j];
            div[i] = D[j++];
         }
         squares[i] = {
            inf: new_code[i],
            name: new_code[i] === '?' ? ('S' + (i - j)) : ('H' + (j - 1)),
            is_s: new_code[i] === '?' ? true : false,
            init_pos: new_code[i] === '?' ? (i - j + jsonData[0].show_length) : (j - 1),
            div: div[i]
         };
      }
      this.state = {
         squares: squares,
         i_len: jsonData[0].show_length,
         s_len: s_len,
         len: new_length,
         code: new_code.join(''),
         show_check: show_check,
         check_mode: -1
      };
   }
   renderSquare_inf(i) {
      if (i < this.state.i_len)
         return (
            <TweenOne className="code-box-shape" style={{ marginLeft: '10px' }} onClick={() => console.log("hi")}>
               <div style={{ color: '#45454d' }}>H{i}</div>
            </TweenOne>
         );
   }
   renderSquare_s(i) {
      if (i < this.state.len)
         return (
            <TweenOne
               animation={{
                  x: 0,
                  scale: 1,
                  rotate: 0,
                  opacity: 0,
                  //yoyo: true, // demo 演示需要
                  //repeat: -1, // demo 演示需要
                  //repeatDelay: 1500,
                  duration: 1000,
                  delay: 3000,
                  type: "from"
               }}
               paused={false}
               style={{ background: '#fc7fb2', marginLeft: '10px' }}
               className="code-box-shape"
            >
               <div style={{ color: '#45454d' }}>S{i}</div>
            </TweenOne>
         )
   }
   renderSquare_cs(i) {
      var x = (i - this.state.squares[i].init_pos) * 60
      if (i < this.state.i_len + this.state.s_len) {
         return (
            <TweenOne
               animation={{
                  x: x,
                  scale: 1,
                  rotate: 360,
                  //yoyo: true, // demo 演示需要
                  //repeat: -1, // demo 演示需要
                  //repeatDelay: repdelay,
                  duration: 1000,
                  delay: 3000,
               }}
               paused={false}
               style={{ background: this.state.squares[i].is_s === true ? '#fc7fb2' : null, marginLeft: '10px' }}
               className="code-box-shape"
            >
               <div style={{ color: '#45454d' }}>{this.state.squares[i].name}</div>
            </TweenOne>
         )
      }
   }
   renderSquare_mot(k) {
      var init_pos = k === 0 ? -1 : this.state.squares[k].init_pos;
      const arr = [];
      const inf_mot = [];
      const marginTop = k === 0 ? "10px" : "-50px";
      var delay = (init_pos + 1) * 1000;
      //var delay = 0;
      var duration = 700;
      var y = (init_pos + 1) * 60;
      var i;

      var info = "原始码字"
      var flag = 0;
      for (i = 0; i < this.state.i_len + this.state.s_len; i++) {
         if (k === 0) break;
         else if (i === 0) info = k + 1;
         if (this.state.squares[k].div.indexOf(i) !== -1) {
            info += (flag++ === 0 ? '=' : '+') + (i + 1);
         }
      }
      arr.push(<TweenOne
         animation={
            [{
               x: 0,
               y: y,
               scale: 1,
               rotate: 0,
               //yoyo: true, // demo 演示需要
               //repeat: -1, // demo 演示需要
               //repeatDelay: repdelay,
               duration: duration,
               delay: delay,
            }, { x: 0 }]}
         paused={false}
         style={{ width: '100px', marginLeft: '10px' }}
         className="code-box-shape"
      >
         <TweenOne className="banner-user-elem" sytle={{ textAlign: "center" }} animation={{ delay: k === 0 ? (this.state.i_len + 1) * 1000 : delay, y: 30, opacity: 0, type: 'from' }}>
            {info}
         </TweenOne>
      </TweenOne >)
      for (i = 0; i < this.state.i_len + this.state.s_len; i++) {
         var content = this.state.squares[i].name + '\n' + this.state.squares[i].inf
         arr.push(
            <TweenOne
               animation={[
                  {//第一步把对应位和校验位移下来
                     x: 0,
                     y: k === 0 ? y : ((this.state.squares[k].div.indexOf(i) !== -1 || i === k) ? y : 0),
                     scale: 1,
                     rotate: 0,
                     //yoyo: true, // demo 演示需要
                     //repeat: -1, // demo 演示需要
                     //repeatDelay: repdelay,
                     //opacity:0,
                     duration: duration,
                     delay: this.state.check_mode !== -1 ? 0 : delay
                     //onStart: motcomplete(this)
                  },
                  {//第二步把校验位都移上去
                     x: 0,
                     y: this.state.check_mode !== -1 ? ((i === k && this.state.squares[k].div.indexOf(this.state.check_mode) !== -1) ? y : 0) : (k === 0 ? y : ((this.state.squares[k].div.indexOf(i) !== -1 || i === k) ? y : 0)),
                     duration: duration,
                     delay: 0,
                  },
                  {
                     x: this.state.check_mode !== -1 ? (this.state.squares[k].div.indexOf(this.state.check_mode) !== -1 && i === k ? (this.state.squares[k].div[this.state.squares[k].div.indexOf(this.state.check_mode)] - i) * 60 : 0) : 0
                  }]}
               paused={false}
               style={{ background: this.state.squares[i].is_s === true ? '#fc7fb2' : null, marginLeft: '10px' }
               }
               className="code-box-shape"
            >
               <div style={{ color: '#45454d', whiteSpace: 'pre-wrap' }}>{content}</div>
            </TweenOne>

         )
      }

      inf_mot.push(<div className="box-queue" style={{ margin: 'relative', marginTop: marginTop }}>{arr}</div>)
      return (inf_mot)
   }
   renderSquare_col(i) {
      return (
         <TweenOne className="code-box-cul" style={{ marginLeft: '10px' }} >
            <div style={{ color: '#45454d' }}>D{i + 1}</div>
         </TweenOne>
      );
   }
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
   show_check(i) {
      let show_check = this.state.show_check.slice();
      var k;
      for (k = 0; k < this.state.s_len; k++) {
         show_check[k] = (k === i && ((2 ** i - 1) !== this.state.check_mode)) ? true : false;
      }
      k = (2 ** i - 1) === this.state.check_mode ? -1 : 2 ** i - 1;
      this.gen_cd_i(2**i-1);
      this.setState({
         show_check: show_check,
         check_mode: k
      })
      console.log(this.state.show_check)
   }
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
   get_s_init(i) {
      if (i === 0) return 0
      if (i === 1) return 1
      if (i === 3) return 2
      if (i === 7) return 3
   }
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
      });
   }
   render() {
      var i;
      const inf_code = [];
      const inf_s = [];
      const inf_cs = [];
      const inf_mot = [];
      const inf_col = [];
      const buttons = [];
      var j = 0;
      var tip = "现在，我们需要通过已有的信息码来求解校验码。\n对于每一个信息位Hi，将i拆解成几个二的幂次减一的正整数，如3=1+2，7=1+2+4，等式左端为信息码的位数，而等式右端即为校验码的位数，如H2对应S0和S1。\n对于每一位的对应关系究竟是如何的可以通过右侧的动画观察：\n每一横行都对应一个信息位，对于你输入的"
      tip += jsonData[0].show_code + '有' + jsonData[0].show_length + '位,因而有' + jsonData[0].show_length + '行，\n每一行左侧的算式向你展示了特定位信息码对应的校验码的位数。\n点击下方的按钮来计算校验码吧！';
      if (this.state.check_mode !== -1) {
         tip = "现在你可以看到校验位S" + this.get_s_init(this.state.check_mode) + '对应的列下面排列了几个信息位小方块\nD'
         console.log(this.state.squares)
         tip += this.state.squares[this.state.check_mode].div.join(',D');
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
         console.log(this.state.squares[this.state.check_mode].div)
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
      for (i = 0; i < this.state.i_len + this.state.s_len; i++) {
         if (!this.state.squares[i].is_s)
            inf_cs.push(
               this.renderSquare_cs(i)
            )
      }
      for (i = 0; i < this.state.i_len + this.state.s_len; i++) {
         if (this.state.squares[i].is_s)
            inf_cs.push(
               this.renderSquare_cs(i)
            )
      }
      for (i = 0; i < this.state.i_len + this.state.s_len; i++) {
         if ((!this.state.squares[i].is_s) || j === 0) {
            inf_mot.push(
               this.renderSquare_mot(j === 0 ? j++ : i)
            )
         }
      }
      inf_col.push(<TweenOne className="code-box-cul" style={{ width: '100px', opacity: 0, marginLeft: '10px' }} />)
      for (i = 0; i < this.state.i_len + this.state.s_len; i++) {
         inf_col.push(
            this.renderSquare_col(i)
         )
      }
      return (
         <BannerAnim prefixCls="banner-user" type="across">
            <Element prefixCls="banner-user-elem" key="0" >
               <BgElement key="bg" className="bg" style={{ background: '#fff1e9' }} />
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
            </Element>
            <Element prefixCls="banner-user-elem" key="1" >
               <BgElement key="bg" className="bg" style={{ background: '#f9f6f2' }} />
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
               <BgElement key="bg" className="bg" style={{ background: '#fff1e9' }} />
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
            <Element prefixCls="banner-user-elem" key="3">
               <BgElement key="bg" className="bg" style={{ background: '#f9f6f2' }} />
               <Grid container spacing={1} style={{ marginTop: '1%', marginLeft: '1%', marginRight: "1%" }}>
                  <Grid item xs={4}>
                     <TweenOne className="banner-user-title" style={{ margin: 'relative' }} animation={{ y: 30, opacity: 0, type: 'from' }}>
                        计算校验码
          </TweenOne>
                  </Grid>
                  <Grid item xs={8} >
                     <div className="box-queue">
                        {inf_col}
                     </div>
                     {inf_mot}
                  </Grid>
                  <Grid item xs={4}>
                     <Button color="primary" fullWidth variant="contained" style={{ whiteSpace: 'pre-wrap' }}>
                        {tip}
                     </Button>
                  </Grid>
                  <Grid item xs={8} >

                  </Grid>
                  <Grid item xs={4}>
                     <ButtonGroup
                        color="primary"
                        size="large"
                        fullWidth aria-label="full width outlined button group">
                        {buttons}
                     </ButtonGroup>
                  </Grid>




               </Grid>


            </Element>
         </BannerAnim>);
   }
}
export default Introduction