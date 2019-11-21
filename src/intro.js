import React from 'react'
import TweenOne from 'rc-tween-one';
//import PropTypes from 'prop-types';
//import './index.css';
//import Button from '@material-ui/core/Button';
import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
const BgElement = Element.BgElement;
class Introduction extends React.Component {
   constructor() {
      super(...arguments);
      this.state = {
         show: true,
      };
      [
         'onClick',
      ].forEach((method) => this[method] = this[method].bind(this));
   }

   onClick() {
      this.setState({
         show: !this.state.show,
      });
   }

   render() {
      const dura = 1000;
      const repdelay = 1500;
      const delay = 3000;
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
               <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                  海明码位数
          </TweenOne>
               <TweenOne className="banner-user-text"
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
               >
                  当有m个数据位，我们需要确定校验位r的值（传输总位数n=m+r）

          </TweenOne>
               <TweenOne className="banner-user-text"
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
               >
                  m个数据位——共2<sup>m</sup>种合法编码，
          </TweenOne>
               <TweenOne className="banner-user-text"
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
               >
                  r个校验位——共可以表示2<sup>r</sup>种情况
          </TweenOne>
               <TweenOne className="banner-user-text"
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
               >
                  传输总位数n——共存在n+1种不同的情况（任意m个信息码元其中一个发生错误，任意r个检验位其中一个发生错误，无错）为了可以表示每种情况，以便正确的纠错，所以需满足2<sup>r</sup> >= n+1=m+r+1
            <div style={{ top: '50px' }} className="box-queue">
                     <TweenOne className="code-box-shape">
                        <div style={{ color: '#364D79' }}>H0</div>
                     </TweenOne>
                     <TweenOne className="code-box-shape">
                        <div style={{ color: '#364D79' }}>H1</div>
                     </TweenOne>
                     <TweenOne className="code-box-shape">
                        <div style={{ color: '#364D79' }}>H2</div>
                     </TweenOne>
                     <TweenOne className="code-box-shape">
                        <div style={{ color: '#364D79' }}>H3</div>
                     </TweenOne>

                     <TweenOne
                        animation={{
                           x: 0,
                           scale: 1,
                           rotate: 0,
                           opacity: 0,
                           yoyo: true, // demo 演示需要
                           repeat: -1, // demo 演示需要
                           repeatDelay: repdelay,
                           duration: dura,
                           delay: delay,
                           type: "from"
                        }}
                        paused={false}
                        style={{ background: '#fc7fb2' }}
                        className="code-box-shape"
                     >
                        <div style={{ color: '#364D79' }}>S0</div>
                     </TweenOne>
                     <TweenOne
                        animation={{
                           x: 0,
                           scale: 1,
                           rotate: 0,
                           opacity: 0,
                           yoyo: true, // demo 演示需要
                           repeat: -1, // demo 演示需要
                           repeatDelay: repdelay,
                           duration: dura,
                           delay: delay,
                           type: "from"


                        }}

                        paused={false}
                        style={{ background: '#fc7fb2' }}

                        className="code-box-shape"
                     >
                        <div style={{ color: '#364D79' }}>S1</div>
                     </TweenOne>
                     <TweenOne
                        animation={{
                           x: 0,
                           scale: 1,
                           rotate: 0,
                           opacity: 0,
                           yoyo: true, // demo 演示需要
                           repeat: -1, // demo 演示需要
                           repeatDelay: repdelay,
                           duration: dura,
                           delay: delay,
                           type: "from"
                        }}
                        paused={false}
                        style={{ background: '#fc7fb2' }}
                        className="code-box-shape"
                     >
                        <div style={{ color: '#364D79' }}>S2</div>
                     </TweenOne>
                  </div>
               </TweenOne>
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
               <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                  生成新码字
          </TweenOne>
               <TweenOne
                  className="banner-user-text"
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
               >
                  将原有m个数据位与r个校验位一起编为长n=m+r位的新码字（校验位理论上可以放置于任何位置，一般放在2<sup>k</sup>位置或者全部置于最后，这里为了更加清楚易懂，我们置于2<sup>k</sup>位置）
                  <div className="box-queue">
                     <TweenOne
                        animation={{
                           x: 120,
                           scale: 1,
                           rotate: 360,
                           yoyo: true, // demo 演示需要
                           repeat: -1, // demo 演示需要
                           repeatDelay: repdelay,
                           duration: dura,
                           delay: delay
                        }}
                        paused={false}
                        style={{}}
                        className="code-box-shape"
                     >
                        <div style={{ color: '#364D79' }}>H0</div>
                     </TweenOne>
                     <TweenOne

                        animation={{
                           x: 180,
                           scale: 1,
                           rotate: 360,
                           yoyo: true, // demo 演示需要
                           repeat: -1, // demo 演示需要
                           repeatDelay: repdelay,
                           duration: dura,
                           delay: delay

                        }}
                        paused={false}
                        style={{}}
                        className="code-box-shape"
                     >
                        <div style={{ color: '#364D79' }}>H1</div>
                     </TweenOne>
                     <TweenOne
                        animation={{
                           x: 180,
                           scale: 1,
                           rotate: 360,
                           yoyo: true, // demo 演示需要
                           repeat: -1, // demo 演示需要
                           repeatDelay: repdelay,
                           duration: dura,
                           delay: delay
                        }}
                        paused={false}
                        style={{}}
                        className="code-box-shape"
                     >
                        <div style={{ color: '#364D79' }}>H2</div>
                     </TweenOne>
                     <TweenOne
                        animation={{
                           x: 180,
                           scale: 1,
                           rotate: 360,
                           yoyo: true, // demo 演示需要
                           repeat: -1, // demo 演示需要
                           repeatDelay: repdelay,
                           duration: dura,
                           delay: delay
                        }}
                        paused={false}
                        style={{}}
                        className="code-box-shape"
                     >
                        <div style={{ color: '#364D79' }}>H3</div>
                     </TweenOne>

                     <TweenOne
                        animation={{
                           x: -240,
                           scale: 1,
                           rotate: 360,
                           yoyo: true, // demo 演示需要
                           repeat: -1, // demo 演示需要
                           repeatDelay: repdelay,
                           duration: dura,
                           delay: delay
                        }}
                        paused={false}
                        style={{ background: '#fc7fb2' }}
                        className="code-box-shape"
                     >
                        <div style={{ color: '#364D79' }}>S0</div>
                     </TweenOne>
                     <TweenOne

                        animation={{
                           x: -240,
                           scale: 1,
                           rotate: 360,
                           yoyo: true, // demo 演示需要
                           repeat: -1, // demo 演示需要
                           repeatDelay: repdelay,
                           duration: dura,
                           delay: delay

                        }}
                        paused={false}
                        style={{ background: '#fc7fb2' }}
                        className="code-box-shape"
                     >
                        <div style={{ color: '#364D79' }}>S1</div>
                     </TweenOne>
                     <TweenOne
                        animation={{
                           x: -180,
                           scale: 1,
                           rotate: 360,
                           yoyo: true, // demo 演示需要
                           repeat: -1, // demo 演示需要
                           repeatDelay: repdelay,
                           duration: dura,
                           delay: delay
                        }}
                        paused={false}
                        style={{ background: '#fc7fb2' }}
                        className="code-box-shape"
                     >
                        <div style={{ color: '#364D79' }}>S2</div>
                     </TweenOne>
                  </div>

               </TweenOne>
            </Element>
         </BannerAnim>);
   }
}
export default Introduction