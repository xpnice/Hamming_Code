(this.webpackJsonptest_1=this.webpackJsonptest_1||[]).push([[0],{116:function(e,t,a){e.exports=a(168)},168:function(e,t,a){"use strict";a.r(t);var n=a(103),r=a(104),s=a(58),l=a(59),i=a(66),c=a(60),o=a(67),u=(a(87),a(0)),m=a.n(u),h=a(10),d=a.n(h),f=a(9),p=a(49),y=(a(165),a(19)),b=p.a.BgElement,g=function(e){function t(e){var a;Object(s.a)(this,t);var n,r=[],l=0,o=(a=Object(i.a)(this,Object(c.a)(t).call(this,e))).get_huming_len(y[0].inf_length),u=y[0].inf_length+o,m=Array(u);for(n=0;n<u;n++)m[n]=0===n||1===n||3===n||7===n?"?":y[0].inf_code[l++],r[n]={inf:m[n],name:"?"===m[n]?"S"+(n-l):"H"+(l-1),is_s:"?"===m[n],init_pos:"?"===m[n]?n-l+y[0].inf_length:l-1};return a.state={squares:r,i_len:y[0].inf_length,s_len:o,len:u,code:m},a}return Object(o.a)(t,e),Object(l.a)(t,[{key:"renderSquare_inf",value:function(e){if(e<this.state.i_len)return m.a.createElement(f.b,{className:"code-box-shape"},m.a.createElement("div",{style:{color:"#45454d",marginLeft:"10px"}},"H",e))}},{key:"renderSquare_s",value:function(e){if(e<this.state.len)return m.a.createElement(f.b,{animation:{x:0,scale:1,rotate:0,opacity:0,duration:1e3,delay:3e3,type:"from"},paused:!1,style:{background:"#fc7fb2",marginLeft:"10px"},className:"code-box-shape"},m.a.createElement("div",{style:{color:"#45454d"}},"S",e))}},{key:"renderSquare_cs",value:function(e){var t=60*(e-this.state.squares[e].init_pos);if(e<this.state.i_len+this.state.s_len)return m.a.createElement(f.b,{animation:{x:t,scale:1,rotate:360,duration:1e3,delay:3e3},paused:!1,style:{background:!0===this.state.squares[e].is_s?"#fc7fb2":null},className:"code-box-shape"},m.a.createElement("div",{style:{color:"#45454d",marginLeft:"10px"}},this.state.squares[e].name))}},{key:"get_huming_len",value:function(e){return 1===e?2:e>=2&&e<=4?3:e>=5&&e<=11?4:(alert("error code i_len"),-1)}},{key:"render",value:function(){var e,t=[],a=[],n=[];for(e=0;e<this.state.i_len;e++)t.push(this.renderSquare_inf(e));for(e=0;e<this.state.s_len;e++)a.push(this.renderSquare_s(e));for(e=0;e<this.state.i_len+this.state.s_len;e++)this.state.squares[e].is_s||n.push(this.renderSquare_cs(e));for(e=0;e<this.state.i_len+this.state.s_len;e++)this.state.squares[e].is_s&&n.push(this.renderSquare_cs(e));return m.a.createElement(p.b,{prefixCls:"banner-user",type:"across"},m.a.createElement(p.a,{prefixCls:"banner-user-elem",key:"0"},m.a.createElement(b,{key:"bg",className:"bg",style:{background:"#fff1e9"}}),m.a.createElement(f.b,{style:{margin:"relative",top:"20%"},className:"banner-user-title",animation:{y:30,opacity:0,type:"from"}},"\u6d77\u660e\u7801\u7b80\u4ecb"),m.a.createElement(f.b,{style:{margin:"relative",top:"30%"},className:"banner-user-text",animation:{y:30,opacity:0,type:"from",delay:100}},"\u6d77\u660e\u7801\u662f\u4e00\u79cd\u591a\u91cd\u5947\u5076\u68c0\u9519\u7cfb\u7edf\uff0c\u7528\u4e8e\u68c0\u9519\u548c\u7ea0\u9519\u3002\u7528\u5728\u6d77\u660e\u7801\u4e2d\u7684\u5168\u90e8\u4f20\u8f93\u7801\u5b57\u7531\u539f\u6765\u7684\u4fe1\u606f\u548c\u9644\u52a0\u7684\u5947\u5076\u6821\u9a8c\u4f4d\u7ec4\u6210\u3002 \u6bcf\u4e00\u4e2a\u5947\u5076\u4f4d\u88ab\u7f16\u5728\u4f20\u8f93\u7801\u5b57\u7684\u7279\u5b9a\u4f4d\u7f6e\u4e0a\u3002"),m.a.createElement(f.b,{className:"banner-user-text",style:{margin:"relative",top:"30%"},animation:{y:30,opacity:0,type:"from",delay:100}},"\u5f53\u4f20\u8f93\u51fa\u73b0\u5355bit\u9519\u8bef\u65f6\uff0c\u65e0\u8bba\u9519\u8bef\u4f4d\u7f6e\u662f\u4fe1\u606f\u4f4d\u8fd8\u662f\u6821\u9a8c\u4f4d\uff0c\u90fd\u80fd\u591f\u88ab\u68c0\u6d4b\u3002 \u672c\u8d28\u4e0a\u662f\u7528\u591a\u4e2a\u5947\u5076\u6821\u9a8c\u6765\u7ea0\u6b63\u5355bit\u9519\u3002")),m.a.createElement(p.a,{prefixCls:"banner-user-elem",key:"1"},m.a.createElement(b,{key:"bg",className:"bg",style:{background:"#f9f6f2"}}),m.a.createElement(f.b,{className:"banner-user-title",style:{margin:"relative",top:"10%"},animation:{y:30,opacity:0,type:"from"}},"\u6d77\u660e\u7801\u4f4d\u6570"),m.a.createElement(f.b,{className:"banner-user-text",style:{margin:"relative",top:"17%"},animation:{y:30,opacity:0,type:"from",delay:100}},"\u5f53\u6709m\u4e2a\u6570\u636e\u4f4d\uff0c\u6211\u4eec\u9700\u8981\u786e\u5b9a\u6821\u9a8c\u4f4dr\u7684\u503c\uff08\u4f20\u8f93\u603b\u4f4d\u6570n=m+r\uff09"),m.a.createElement(f.b,{className:"banner-user-text",style:{margin:"relative",top:"15%"},animation:{y:30,opacity:0,type:"from",delay:100}},"m\u4e2a\u6570\u636e\u4f4d\u2014\u2014\u51712",m.a.createElement("sup",null,"m"),"\u79cd\u5408\u6cd5\u7f16\u7801\uff0c"),m.a.createElement(f.b,{className:"banner-user-text",style:{margin:"relative",top:"15%"},animation:{y:30,opacity:0,type:"from",delay:100}},"r\u4e2a\u6821\u9a8c\u4f4d\u2014\u2014\u5171\u53ef\u4ee5\u8868\u793a2",m.a.createElement("sup",null,"r"),"\u79cd\u60c5\u51b5"),m.a.createElement(f.b,{className:"banner-user-text",style:{margin:"relative",top:"15%"},animation:{y:30,opacity:0,type:"from",delay:100}},"\u4f20\u8f93\u603b\u4f4d\u6570n\u2014\u2014\u5171\u5b58\u5728n+1\u79cd\u4e0d\u540c\u7684\u60c5\u51b5\uff08\u4efb\u610fm\u4e2a\u4fe1\u606f\u7801\u5143\u5176\u4e2d\u4e00\u4e2a\u53d1\u751f\u9519\u8bef\uff0c\u4efb\u610fr\u4e2a\u68c0\u9a8c\u4f4d\u5176\u4e2d\u4e00\u4e2a\u53d1\u751f\u9519\u8bef\uff0c\u65e0\u9519\uff09\u4e3a\u4e86\u53ef\u4ee5\u8868\u793a\u6bcf\u79cd\u60c5\u51b5\uff0c\u4ee5\u4fbf\u6b63\u786e\u7684\u7ea0\u9519\uff0c\u6240\u4ee5\u9700\u6ee1\u8db32",m.a.createElement("sup",null,"r")," >= n+1=m+r+1"),m.a.createElement("div",{className:"box-queue",style:{top:"25%"}},t,a)),m.a.createElement(p.a,{prefixCls:"banner-user-elem",key:"2"},m.a.createElement(b,{key:"bg",className:"bg",style:{background:"#fff1e9"}}),m.a.createElement(f.b,{className:"banner-user-title",style:{margin:"relative",top:"20%"},animation:{y:30,opacity:0,type:"from"}},"\u751f\u6210\u65b0\u7801\u5b57"),m.a.createElement(f.b,{className:"banner-user-text",style:{margin:"relative",top:"28%"},animation:{y:30,opacity:0,type:"from",delay:100}},"\u5c06\u539f\u6709m\u4e2a\u6570\u636e\u4f4d\u4e0er\u4e2a\u6821\u9a8c\u4f4d\u4e00\u8d77\u7f16\u4e3a\u957fn=m+r\u4f4d\u7684\u65b0\u7801\u5b57\uff08\u6821\u9a8c\u4f4d\u7406\u8bba\u4e0a\u53ef\u4ee5\u653e\u7f6e\u4e8e\u4efb\u4f55\u4f4d\u7f6e\uff0c\u4e00\u822c\u653e\u57282",m.a.createElement("sup",null,"k"),"\u4f4d\u7f6e\u6216\u8005\u5168\u90e8\u7f6e\u4e8e\u6700\u540e\uff0c\u8fd9\u91cc\u4e3a\u4e86\u66f4\u52a0\u6e05\u695a\u6613\u61c2\uff0c\u6211\u4eec\u7f6e\u4e8e2",m.a.createElement("sup",null,"k"),"\u4f4d\u7f6e\uff09"),m.a.createElement("div",{className:"box-queue",style:{margin:"relative",top:"40%"}},n)))}}]),t}(m.a.Component),v=a(219),E=a(221),_=a(210),k=a(224),q=a(222),x=a(170),S=a(169),C=a(218),O=a(215),N=a(225),j=a(220),w=a(211),W=a(213),A=a(212),H=a(102),z=a(216),B=a(217);a.d(t,"default",(function(){return F}));var L=Object(H.a)({palette:{primary:{main:"#ffd5d5"},secondary:{main:"#fff1e9"},default:{main:"#f9f6f2"},disabled:{main:"#f9f6f2"}}}),I=function(e){function t(e){var a;Object(s.a)(this,t),a=Object(i.a)(this,Object(c.a)(t).call(this,e));var n,r=[];for(n=0;n<y[0].inf_length;n++)r[n]={inf:"1"===y[0].inf_code[n]?1:0,pos:"H"+n,check_no:-1,selected:0};return a.state={squares:r,length:y[0].inf_length,code:y[0].inf_code,able:[1,1,0],select_no:-1,decode:null},a}return Object(o.a)(t,e),Object(l.a)(t,[{key:"renderSquare_inf",value:function(e){var t=this;if(e<this.state.length)return m.a.createElement(S.a,{key:"inf"+e,variant:"contained",color:0===this.state.squares[e].selected?"secondary":"primary",onClick:function(){return t.handleClick(e)}},this.state.squares[e].inf)}},{key:"renderSquare_pos",value:function(e){var t=this;if(e<this.state.length)return m.a.createElement(S.a,{key:"pos"+e,variant:"contained",color:0===this.state.squares[e].selected?"secondary":"primary",onClick:function(){return t.handleClick(e)}},this.state.squares[e].pos)}},{key:"renderSquare_dpos",value:function(e){var t,a=this;return e<this.state.length&&(t="D"+e),m.a.createElement(S.a,{key:"dpos"+e,variant:"contained",color:0===this.state.squares[e].selected?"secondary":"primary",onClick:function(){return a.handleClick(e)}},t)}},{key:"handleClick",value:function(e){var t,a=this.state.squares.slice(),n=Array(this.state.length);if(e<this.state.length)if(-1===this.state.squares[e].check_no){for(t=0;t<this.state.length;t++)a[t].selected=0,n[t]=a[t].inf;this.state.able[1]&&(a[e].inf=1-this.state.squares[e].inf,n[e]=a[e].inf)}else if(-1!==this.state.squares[e].check_no){a[e].selected=1;var r=this.state.squares[e].check_no+1;for(t=0;t<this.state.length;t++)n[t]=a[t].inf,e!==t&&(a[t].selected=0),t>=e&&(t-e)%(2*r)<r&&(a[t].selected=a[e].selected)}this.setState({squares:a,select_no:this.state.squares[e].check_no,code:n.join("")})}},{key:"handleClickAway",value:function(){var e,t=this.state.squares.slice();for(e=0;e<this.state.length;e++)t[e].selected=0;this.setState({squares:t,select_no:-1})}},{key:"init_Square",value:function(){var e,t=[];for(e=0;e<y[0].inf_length;e++)t[e]={inf:"1"===y[0].inf_code[e]?1:0,pos:"H"+e,check_no:-1,selected:0};this.setState({squares:t,length:y[0].inf_length,code:y[0].inf_code,able:[1,1,0],select_no:-1})}},{key:"get_huming_len",value:function(e){return 1===e?2:e>=2&&e<=4?3:e>=5&&e<=11?4:(alert("error code length"),-1)}},{key:"get_check_pos",value:function(e){var t;for(t=0;t<this.state.length;t++)if(e===this.state.squares[t].check_no)return t;return-1}},{key:"gen_ch",value:function(){var e,t=this.get_huming_len(this.state.length)+this.state.length,a=[],n=Array(t),r=0;for(e=0;e<t;e++)n[e]=0===e||1===e||3===e||7===e?"?":this.state.squares[r++].inf,a[e]={inf:n[e],pos:"?"===n[e]?"S"+(e-r):"H"+(r-1),check_no:"?"===n[e]?e:-1,selected:0};this.setState({squares:a,length:t,code:n.join(""),able:[1,0,1]})}},{key:"gen_cd_i",value:function(e){var t,a=this.state.squares[e].check_no+1,n=-1;for(t=e;t<this.state.length;t++)(t-e)%(2*a)<a&&(-1===n?n="?"===this.state.squares[t].inf?0:this.state.squares[t].inf:n^=this.state.squares[t].inf);return n}},{key:"gen_cd",value:function(){var e,t=this.state.squares.slice(),a=Array(this.state.length);for(e=this.state.length-1;e>=0;e--)-1!==this.state.squares[e].check_no&&(t[e].inf=this.gen_cd_i(e)),a[e]=t[e].inf;this.setState({squares:t,code:a.join(""),able:[1,0,0]})}},{key:"getdecode",value:function(e){this.setState({decode:e.target.value})}},{key:"getdifbit",value:function(e,t){for(var a=0,n=0;n<e.toString().length;n++)a+=e[n]!==t[n]?1:0;return a}},{key:"detect",value:function(){if(null!==this.state.decode)if(this.state.decode.toString().length===this.state.length)if(this.getdifbit(this.state.decode,this.state.code)>1)alert("\u4e0d\u80fd\u68c0\u67e5\u4e24\u4f4d\u53ca\u4ee5\u4e0a\u7684\u9519\u8bef");else{var e,t,a,n=this.get_huming_len(y[0].inf_length),r=Array(n);for(e=0;e<n;e++){for(t=0;t<this.state.length&&this.state.squares[t].check_no+1!==Math.pow(2,e);t++);r[e]=this.state.decode[t],a=this.state.squares[t].check_no+1;for(var s=t+1;s<this.state.length;s++)(s-t)%(2*a)<a&&(r[e]^=this.state.decode[s])}var l=this.bin2int(r);alert(0===l?"\u6ca1\u6709\u9519\u8bef":"\u7b2c"+l+"\u4f4d\u9519\u8bef")}else alert("\u7801\u957f\u4e0d\u7b26\uff0c\u5e94\u4e3a"+this.state.length+"\u4f4d");else alert("\u8f93\u5165\u4e3a\u7a7a")}},{key:"bin2int",value:function(e){for(var t=0,a=0;a<e.toString().length;a++)t+=1===e[a]?Math.pow(2,a):0;return t}},{key:"render",value:function(){var e,t=this,a=[],n=[],r=[],s="Tips:"+(this.state.able[1]?"\u70b9\u51fb\u4fe1\u606f\u7801\u53ef\u4ee5\u6539\u53d8\u88ab\u70b9\u51fb\u4f4d\u7684\u503c":"\u70b9\u51fb\u6821\u9a8c\u4f4d\u53ef\u4ee5\u67e5\u770b\u8fd0\u7b97\u65b9\u5f0f"),l="";if(-1!==this.state.select_no){var i=this.state.select_no+1;e=this.get_check_pos(i-1),l=this.state.squares[e].pos+" = "+this.state.squares[e].pos;for(var c=e+1;c<this.state.length;c++)(c-e)%(2*i)<i&&(l+=" XOR "+this.state.squares[c].pos)}for(e=0;e<this.state.length;e++)a.push(this.renderSquare_inf(e)),n.push(this.renderSquare_pos(e)),r.push(this.renderSquare_dpos(e));return m.a.createElement(_.a,{container:!0,spacing:3},m.a.createElement(_.a,{item:!0,xs:4},m.a.createElement(w.a,{variant:"h4",gutterBottom:!0},"Hamming_Code")),m.a.createElement(_.a,{item:!0,xs:4},m.a.createElement(S.a,{color:"primary",fullWidth:!0,variant:"contained"},s)),m.a.createElement(_.a,{item:!0,xs:1}),m.a.createElement(_.a,{item:!0,xs:1},m.a.createElement(M,{name:"\u51af\u60e0",letter:"F",id:"1753495"})),m.a.createElement(_.a,{item:!0,xs:1},m.a.createElement(M,{name:"\u674e\u6cbf\u6f8e",letter:"L",id:"1754026"})),m.a.createElement(_.a,{item:!0,xs:1},m.a.createElement(M,{name:"\u7530\u5e9a\u8f69",letter:"T",id:"1754080"})),m.a.createElement(A.a,{onClickAway:function(){return t.handleClickAway()}},m.a.createElement(_.a,{item:!0,xs:12},m.a.createElement(W.a,{color:"secondary",size:"large",fullWidth:!0,"aria-label":"full width outlined button group"},a),m.a.createElement(W.a,{color:"secondary",size:"large",fullWidth:!0,"aria-label":"full width outlined button group"},n),m.a.createElement(W.a,{color:"secondary",size:"large",fullWidth:!0,"aria-label":"full width outlined button group"},r))),m.a.createElement(_.a,{item:!0,xs:6},m.a.createElement(G,{label:"Encoding",readOnly:!0,value:this.state.code})),m.a.createElement(_.a,{item:!0,xs:6},m.a.createElement(G,{label:"Decoding",readOnly:!1,Getvalue:function(e){return t.getdecode(e)}})),m.a.createElement(_.a,{item:!0,xs:12},-1!==this.state.select_no?m.a.createElement(w.a,{variant:"h6",gutterBottom:!0},l):null),m.a.createElement(_.a,{item:!0,xs:6},m.a.createElement(W.a,{color:"primary",size:"large",fullWidth:!0,"aria-label":"full width outlined button group"},m.a.createElement(S.a,{variant:"contained",disabled:!this.state.able[0],onClick:function(){return t.init_Square()}},"\u91cd\u7f6e"),m.a.createElement(S.a,{variant:"contained",disabled:!this.state.able[1],onClick:function(){return t.gen_ch()}},"\u751f\u6210\u6821\u9a8c\u4f4d"),m.a.createElement(S.a,{variant:"contained",disabled:!this.state.able[2],onClick:function(){return t.gen_cd()}},"\u751f\u6210\u6821\u9a8c\u7801"))),m.a.createElement(_.a,{item:!0,xs:6},m.a.createElement(W.a,{color:"primary",size:"large",fullWidth:!0,"aria-label":"full width outlined button group"},m.a.createElement(S.a,{variant:"contained",onClick:function(){return t.detect()}},"\u68c0\u7ea0\u9519"),m.a.createElement(S.a,{variant:"contained"},"Learn More"))))}}]),t}(m.a.Component);function M(e){var t=D();return m.a.createElement("div",null,m.a.createElement(N.a,{title:e.id,classes:{tooltip:t.customWidth}},m.a.createElement(k.a,{variant:"outlined",size:"medium",avatar:m.a.createElement(O.a,null,e.letter),label:e.name})))}function G(e){return m.a.createElement(j.a,{id:e.label,label:e.label,value:e.value,className:"textField",margin:"normal",onChange:function(t){e.Getvalue(t)},InputProps:{readOnly:e.readOnly},variant:"outlined"})}function J(e){var t=e.children,a=e.value,n=e.index,s=Object(r.a)(e,["children","value","index"]);return m.a.createElement(w.a,Object.assign({component:"div",role:"tabpanel",hidden:a!==n,id:"scrollable-auto-tabpanel-".concat(n),"aria-labelledby":"scrollable-auto-tab-".concat(n)},s),m.a.createElement(E.a,{p:3},t))}function T(e){return{id:"scrollable-auto-tab-".concat(e),"aria-controls":"scrollable-auto-tabpanel-".concat(e)}}var D=Object(z.a)((function(e){return{root:{flexGrow:1,width:"100%",backgroundColor:e.palette.background.paper},pad:{padding:e.spacing(3,2)},button:{margin:e.spacing(1)},customWidth:{maxWidth:500},noMaxWidth:{maxWidth:"none"}}}));function F(){var e=D(),t=m.a.useState(0),a=Object(n.a)(t,2),r=a[0],s=a[1];return m.a.createElement("div",{className:e.root},m.a.createElement(B.a,{theme:L},m.a.createElement(C.a,{position:"static",color:"default"},m.a.createElement(q.a,{value:r,onChange:function(e,t){s(t)},indicatorColor:"primary",textColor:"primary",variant:"scrollable",scrollButtons:"auto","aria-label":"scrollable auto tabs example"},m.a.createElement(v.a,Object.assign({label:"Try it"},T(0))),m.a.createElement(v.a,Object.assign({label:"Introduction"},T(1))),m.a.createElement(v.a,Object.assign({label:"Concepts"},T(2)))))),m.a.createElement(J,{value:r,index:0},m.a.createElement(B.a,{theme:L},m.a.createElement(I,null))),m.a.createElement(J,{value:r,index:1},m.a.createElement(B.a,{theme:L},m.a.createElement(g,null))),m.a.createElement(J,{value:r,index:2},m.a.createElement(x.a,{className:e.pad},m.a.createElement(w.a,{variant:"h5",component:"h3"},"What is Hamming Code?"),m.a.createElement(w.a,{component:"p"},"I have fucking no idea."))))}d.a.render(m.a.createElement(F,null),document.getElementById("root"))},19:function(e){e.exports=JSON.parse('[{"inf_length":9,"inf_code":"111011001"}]')},87:function(e,t,a){}},[[116,1,2]]]);
//# sourceMappingURL=main.92257562.chunk.js.map