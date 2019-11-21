import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Introduction from './intro';
import PropTypes from 'prop-types';
import jsonData from "./config.json";
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
const theme = createMuiTheme({
   palette: {
      primary: {
         main: "#ffd5d5"
      },
      secondary: {
         main: "#fff1e9"
      },
      default: {
         main: "#f9f6f2"
      },
      disabled: {
         main: "#f9f6f2"
      }
   }
   
});
class Board extends React.Component {
   constructor(props) {
      super(props);
      const squares = [];
      const able = [1, 1, 0];
      var i;
      for (i = 0; i < jsonData[0].inf_length; i++) {
         squares[i] = {
            inf: jsonData[0].inf_code[i] === '1' ? 1 : 0,
            pos: 'H' + i,
            check_no: -1,
            selected: 0
         };
      }
      this.state = {
         squares: squares,
         length: jsonData[0].inf_length,
         code: jsonData[0].inf_code,
         able: able,
         select_no: -1,
         decode: null
      };
   }
   renderSquare_inf(i) {
      if (i < this.state.length)
         return (
            <Button
               key={'inf' + i}
               variant="contained"
               color={this.state.squares[i].selected === 0 ? "secondary" : "primary"}
               onClick={() => this.handleClick(i)}
            >
               {this.state.squares[i].inf}
            </Button>
         );
   }
   renderSquare_pos(i) {
      if (i < this.state.length)
         return (
            <Button
               key={'pos' + i}
               variant="contained"
               color={this.state.squares[i].selected === 0 ? "secondary" : "primary"}
               onClick={() => this.handleClick(i)}
            >
               {this.state.squares[i].pos}
            </Button>
         );
   }
   renderSquare_dpos(i) {
      var key;
      if (i < this.state.length)
         key = 'D' + i
      return (
         <Button
            key={'dpos' + i}
            variant="contained"
            color={this.state.squares[i].selected === 0 ? "secondary" : "primary"}
            onClick={() => this.handleClick(i)}
         >
            {key}
         </Button>
      );
   }
   handleClick(i) { //点击触发，取反
      var that = this;
      var j;
      let squares = that.state.squares.slice();
      var new_code = Array(that.state.length);
      if (i < that.state.length) {
         if (that.state.squares[i].check_no === -1) {
            for (j = 0; j < that.state.length; j++) {
               squares[j].selected = 0; //其他恢复颜色
               new_code[j] = squares[j].inf;
            }
            if (that.state.able[1]) {
               squares[i].inf = 1 - that.state.squares[i].inf;
               new_code[i] = squares[i].inf;
            }

         }
         else if (that.state.squares[i].check_no !== -1) {
            squares[i].selected = 1;//选取的校验位置红
            var no = that.state.squares[i].check_no + 1;
            for (j = 0; j < that.state.length; j++) {
               new_code[j] = squares[j].inf;
               if (i !== j)
                  squares[j].selected = 0; //其他恢复颜色
               if (j >= i && (((j - i) % (2 * no)) < no))
                  squares[j].selected = squares[i].selected;
            }
         }

      }
      this.setState({
         squares: squares,
         select_no: that.state.squares[i].check_no,
         code: new_code.join('')
      });
      // console.log(this.state.squares)
   }
   handleClickAway() {
      var that = this;
      var j;
      let squares = that.state.squares.slice();
      for (j = 0; j < that.state.length; j++) {
         squares[j].selected = 0; //其他恢复颜色
      }
      this.setState({
         squares: squares,
         select_no: -1
      });

   }
   init_Square() {
      const squares = [];
      var i;
      for (i = 0; i < jsonData[0].inf_length; i++) {
         squares[i] = {
            inf: jsonData[0].inf_code[i] === '1' ? 1 : 0,
            pos: 'H' + i,
            check_no: -1,
            selected: 0
         };
      }
      this.setState({
         squares: squares,
         length: jsonData[0].inf_length,
         code: jsonData[0].inf_code,
         able: [1, 1, 0],
         select_no: -1
      });
   }
   get_huming_len(i) {
      if (i === 1)
         return 2;
      else if (i >= 2 && i <= 4)
         return 3;
      else if (i >= 5 && i <= 11)
         return 4;
      else {
         alert("error code length");
         return -1;
      }

   }
   get_check_pos(i) {
      var j;
      for (j = 0; j < this.state.length; j++) {
         if (i === this.state.squares[j].check_no)
            return j;
      }
      return -1
   }
   //生成校验位
   gen_ch() {
      var that = this;
      var new_length = that.get_huming_len(that.state.length) + that.state.length;
      const squares = [];
      var new_code = Array(new_length);
      var i, j = 0;
      for (i = 0; i < new_length; i++) {
         if (i === 0 || i === 1 || i === 3 || i === 7) {
            new_code[i] = '?';
         }
         else new_code[i] = that.state.squares[j++].inf;
         squares[i] = {
            inf: new_code[i],
            pos: new_code[i] === '?' ? ('S' + (i - j)) : ('H' + (j - 1)),
            check_no: new_code[i] === '?' ? i : -1,
            selected: 0
         };
      }
      this.setState({
         squares: squares,
         length: new_length,
         code: new_code.join(''),
         able: [1, 0, 1]
      })
   }
   //对某一位运算
   gen_cd_i(i) {
      var that = this;
      var no = that.state.squares[i].check_no + 1;
      var j;
      var value = -1;
      for (j = i; j < that.state.length; j++) {
         if ((((j - i) % (2 * no)) < no)) {
            if (value === -1)
               value = that.state.squares[j].inf === '?' ? 0 : that.state.squares[j].inf;
            else value ^= that.state.squares[j].inf;
            //console.log(this.state.squares[j])
         }
      }
      return value;
   }
   //生成校验码
   gen_cd() {
      var that = this;
      let squares = that.state.squares.slice();
      var i;
      var new_code = Array(that.state.length);
      for (i = that.state.length - 1; i >= 0; i--) {
         if (that.state.squares[i].check_no !== -1) {
            squares[i].inf = this.gen_cd_i(i);
         }
         new_code[i] = squares[i].inf;
      }
      this.setState({
         squares: squares,
         code: new_code.join(''),
         able: [1, 0, 0]
      });
   }
   //获取decoding表中的值
   getdecode(e) {
      //e.preventDefault();
      this.setState({
         decode: e.target.value
      })

   }
   //检查同长度非空字符串的不同字符个数
   getdifbit(str1, str2) {
      var num = 0;
      for (var i = 0; i < str1.toString().length; i++) {
         num += str1[i] !== str2[i] ? 1 : 0;
      }
      return num;
   }
   //检纠错
   detect() {
      if (this.state.decode === null) {
         alert("输入为空")
         return;
      }
      if (this.state.decode.toString().length !== this.state.length) {
         alert("码长不符，应为" + this.state.length + "位")
         return;
      }
      if (this.getdifbit(this.state.decode, this.state.code) > 1) {
         alert("不能检查两位及以上的错误")
         return;
      }
      var that = this;
      var no = that.get_huming_len(jsonData[0].inf_length);
      var detect_code = Array(no);
      var j, i;
      var check_no
      for (j = 0; j < no; j++) {
         for (i = 0; i < that.state.length; i++) {
            if (that.state.squares[i].check_no + 1 === (2 ** j))
               break;
         }
         detect_code[j] = that.state.decode[i];
         check_no = that.state.squares[i].check_no + 1;
         for (var k = i + 1; k < that.state.length; k++) {
            if ((((k - i) % (2 * check_no)) < check_no)) {
               detect_code[j] ^= that.state.decode[k];
            }
         }
      }
      //detect_code.reverse()//生成的纠错码倒序
      var num = this.bin2int(detect_code);
      alert(num === 0 ? "没有错误" : ("第" + num + "位错误"));
   }
   bin2int(str) {
      var num = 0;
      for (var j = 0; j < str.toString().length; j++) {
         num += str[j] === 1 ? (2 ** j) : 0;
      }
      return num;
   }
   render() {
      const status = 'Hamming_Code'
      const gen_ch = '生成校验位'
      const gen_cd = '生成校验码'
      const init_h = '重置'
      const detect = '检纠错'
      const more = 'Learn More'
      const inf_code = [];
      const inf_pos = [];
      const inf_dpos = [];
      const tips = "Tips:" + (this.state.able[1] ? "点击信息码可以改变被点击位的值" : "点击校验位可以查看运算方式");
      var i;
      let cal = '';
      if (this.state.select_no !== -1) {
         var no = this.state.select_no + 1;
         i = this.get_check_pos(no - 1);
         cal = this.state.squares[i].pos + " = " + this.state.squares[i].pos;
         for (var j = i + 1; j < this.state.length; j++) {
            if (((j - i) % (2 * no)) < no) {
               cal += " XOR " + this.state.squares[j].pos;
            }
         }
      }
      for (i = 0; i < this.state.length; i++) {
         inf_code.push(
            this.renderSquare_inf(i)
         )
         inf_pos.push(
            this.renderSquare_pos(i)
         )
         inf_dpos.push(
            this.renderSquare_dpos(i)
         )
      }
      return (
         <Grid container spacing={3}>
            <Grid item xs={4}>
               <Typography variant="h4" gutterBottom>
                  {status}
               </Typography>
            </Grid>
            <Grid item xs={4}>
               <Button color="primary" fullWidth variant="contained">
                  {tips}
               </Button>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={1} >
               <VariableWidth name="冯惠" letter="F" id="1753495" />
            </Grid>
            <Grid item xs={1} >
               <VariableWidth name="李沿澎" letter="L" id="1754026" />
            </Grid>
            <Grid item xs={1} >
               <VariableWidth name="田庚轩" letter="T" id="1754080" />
            </Grid>
            <ClickAwayListener onClickAway={() => this.handleClickAway()}>
               <Grid item xs={12}>
                  <ButtonGroup
                     color="secondary"
                     size="large"
                     fullWidth aria-label="full width outlined button group">
                     {inf_code}
                  </ButtonGroup>
                  <ButtonGroup
                     color="secondary"
                     size="large"
                     fullWidth aria-label="full width outlined button group">
                     {inf_pos}
                  </ButtonGroup>
                  <ButtonGroup
                     color="secondary"
                     size="large"
                     fullWidth aria-label="full width outlined button group">
                     {inf_dpos}
                  </ButtonGroup>
               </Grid>
            </ClickAwayListener>
            <Grid item xs={6}>
               <UncontrolledTextField label="Encoding" readOnly={true} value={this.state.code} />
            </Grid>
            <Grid item xs={6}>
               <UncontrolledTextField label="Decoding" readOnly={false} Getvalue={(e) => this.getdecode(e)} />
            </Grid>
            <Grid item xs={12}>
               {this.state.select_no !== -1 ? <Typography variant="h6" gutterBottom>
                  {cal}
               </Typography> : null}
            </Grid>
            <Grid item xs={6}>
               <ButtonGroup
                  color="primary"
                  size="large"
                  fullWidth aria-label="full width outlined button group">
                  <Button
                     variant="contained"
                     disabled={!this.state.able[0]}
                     onClick={() => this.init_Square()}
                  >
                     {init_h}
                  </Button>
                  <Button
                     variant="contained"
                     disabled={!this.state.able[1]}
                     onClick={() => this.gen_ch()} //
                  >
                     {gen_ch}
                  </Button>
                  <Button
                     variant="contained"
                     disabled={!this.state.able[2]}
                     onClick={() => this.gen_cd()} //
                  >
                     {gen_cd}
                  </Button>
               </ButtonGroup>
            </Grid>
            <Grid item xs={6}>
               <ButtonGroup
                  color="primary"
                  size="large"
                  fullWidth aria-label="full width outlined button group">
                  <Button
                     variant="contained"
                     onClick={() => this.detect()}
                  >
                     {detect}
                  </Button>
                  <Button
                     variant="contained"
                  //onClick={() => this.gen_ch()} //
                  >
                     {more}
                  </Button>
               </ButtonGroup>
            </Grid>

         </Grid>

      );
   }
}
function VariableWidth(props) {
   const classes = useStyles();
   return (
      <div>
         <Tooltip title={props.id} classes={{ tooltip: classes.customWidth }}>
            <Chip
               variant="outlined"
               size="medium"
               avatar={<Avatar>{props.letter}</Avatar>}
               label={props.name}
            //onClick={handleClick}
            />
         </Tooltip>
      </div>
   );
}
function UncontrolledTextField(props) {
   return (
      <TextField
         id={props.label}
         label={props.label}
         value={props.value}
         className="textField"
         margin="normal"
         onChange={(e) => {
            props.Getvalue(e)
         }}
         InputProps={{
            readOnly: props.readOnly,
         }}
         variant="outlined"
      />
   );
}
function TabPanel(props) {
   const { children, value, index, ...other } = props;
   return (
      <Typography
         component="div"
         role="tabpanel"
         hidden={value !== index}
         id={`scrollable-auto-tabpanel-${index}`}
         aria-labelledby={`scrollable-auto-tab-${index}`}
         {...other}
      >
         <Box p={3}>{children}</Box>
      </Typography>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.any.isRequired,
   value: PropTypes.any.isRequired,
};

function a11yProps(index) {
   return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
   };
}

const useStyles = makeStyles(theme => ({
   root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      //padding: theme.spacing(3, 2),
   },
   pad: {
      padding: theme.spacing(3, 2)
   },
   button: {
      margin: theme.spacing(1),
   },
   customWidth: {
      maxWidth: 500,
   },
   noMaxWidth: {
      maxWidth: 'none',
   }
   
}));

export default function ScrollableTabsButtonAuto() {
   const classes = useStyles();
   const [value, setValue] = React.useState(0)
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   return (
      <div className={classes.root}>
         <MuiThemeProvider theme={theme}>
            <AppBar position="static" color="default">
               <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
               >
                  <Tab label="Try it" {...a11yProps(0)} />
                  <Tab label="Introduction" {...a11yProps(1)} />
                  <Tab label="Concepts" {...a11yProps(2)} />
               </Tabs>
            </AppBar>
         </MuiThemeProvider>
         <TabPanel value={value} index={0}>
            <MuiThemeProvider theme={theme}>
               <Board />
            </MuiThemeProvider>
         </TabPanel>
         <TabPanel value={value} index={1}>
            <MuiThemeProvider theme={theme}>
               <Introduction />
            </MuiThemeProvider>
         </TabPanel>
         <TabPanel value={value} index={2}>
            <Paper className={classes.pad}>
               <Typography variant="h5" component="h3">
                  What is Hamming Code?
       </Typography>
               <Typography component="p">
                  I have fucking no idea.
       </Typography>
            </Paper>
         </TabPanel>
      </div>
   );
}
ReactDOM.render(
   <ScrollableTabsButtonAuto />,

   document.getElementById('root')
);