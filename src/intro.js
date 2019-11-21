import React from 'react'
import TweenOne from 'rc-tween-one';
import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
import jsonData from "./config.json";
const BgElement = Element.BgElement;
class Introduction extends React.Component {
   constructor(props) {
      super(props);
      const squares = [];
      var i, j = 0;
      var s_len = this.get_huming_len(jsonData[0].inf_length);
      var new_length = jsonData[0].inf_length + s_len;
      var new_code = Array(new_length);
      for (i = 0; i < new_length; i++) {
         if (i === 0 || i === 1 || i === 3 || i === 7) {
            new_code[i] = '?';
         }
         else new_code[i] = jsonData[0].inf_code[j++];
         squares[i] = {
            inf: new_code[i],
            name: new_code[i] === '?' ? ('S' + (i - j)) : ('H' + (j - 1)),
            is_s: new_code[i] === '?' ? true : false,
            init_pos: new_code[i] === '?' ? (i - j + jsonData[0].inf_length) : (j - 1)
         };
      }
      this.state = {
         squares: squares,
         i_len: jsonData[0].inf_length,
         s_len: s_len,
         len: new_length,
         code: new_code,
      };
   }
   renderSquare_inf(i) {
      if (i < this.state.i_len)
         return (
            <TweenOne className="code-box-shape">
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
               style={{ background: '#fc7fb2' }}
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
               style={{ background: this.state.squares[i].is_s===true ? '#fc7fb2' : null }}
               className="code-box-shape"
            >
               <div style={{ color: '#45454d' }}>{this.state.squares[i].name}</div>
            </TweenOne>
         )
      }
   }
   get_huming_len(i) {
      if (i === 1)
         return 2;
      else if (i >= 2 && i <= 4)
         return 3;
      else if (i >= 5 && i <= 11)
         return 4;
      else {
         alert("error code i_len");
         return -1;
      }
   }
   render() {
      var i;
      const inf_code = [];
      const inf_s = [];
      const inf_cs = [];
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
      return (
         <BannerAnim prefixCls="banner-user" type="across">
            <Element
               prefixCls="banner-user-elem"
               key="0"
            >
               <BgElement
                  key="bg"
                  className="bg"
                  style={{
                     background: '#fff1e9',
                  }}
               />
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
            <Element
               prefixCls="banner-user-elem"
               key="1"
            >
               <BgElement
                  key="bg"
                  className="bg"
                  style={{
                     background: '#f9f6f2',
                  }}
               />
               <TweenOne className="banner-user-title"style={{ margin: 'relative', top: '10%' }} animation={{ y: 30, opacity: 0, type: 'from' }}>
                  海明码位数
          </TweenOne>
               <TweenOne className="banner-user-text"style={{ margin: 'relative', top: '17%' }}
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
               >
                  当有m个数据位，我们需要确定校验位r的值（传输总位数n=m+r）

          </TweenOne>
               <TweenOne className="banner-user-text"
               style={{ margin: 'relative', top: '15%' }}
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
               >
                  m个数据位——共2<sup>m</sup>种合法编码，
          </TweenOne>
               <TweenOne className="banner-user-text"
               style={{ margin: 'relative', top: '15%' }}
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
               >
                  r个校验位——共可以表示2<sup>r</sup>种情况
          </TweenOne>
               <TweenOne className="banner-user-text"
               style={{ margin: 'relative', top: '15%' }}
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
               >
                  传输总位数n——共存在n+1种不同的情况（任意m个信息码元其中一个发生错误，任意r个检验位其中一个发生错误，无错）为了可以表示每种情况，以便正确的纠错，所以需满足2<sup>r</sup> >= n+1=m+r+1
                  </TweenOne>
               <div className="box-queue"style={{ margin: 'relative', top: '25%' }}>
                  {inf_code}
                  {inf_s}
               </div>

            </Element>
            <Element
               prefixCls="banner-user-elem"
               key="2"
            >
               <BgElement
                  key="bg"
                  className="bg"
                  style={{
                     background: '#fff1e9',
                  }}
               />
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
         </BannerAnim>);
   }
}
export default Introduction