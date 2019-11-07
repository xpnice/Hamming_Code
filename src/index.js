import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import jsonData from "./config.json";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
const theme = createMuiTheme({
   palette: {
      primary: {
         main: "#00e676"
      },
      secondary: {
         main: "#00e676"
      },
   },
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
         able: able
      };
   }
   renderSquare_inf(i) {
      if (i < this.state.length)
         return (
            <Button
               key={'inf' + i}
               variant="contained"
               color={this.state.squares[i].selected === 0 ? "default" : "secondary"}
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
               color={this.state.squares[i].selected === 0 ? "default" : "secondary"}
               onClick={() => this.handleClick(i)}
            >
               {this.state.squares[i].pos}
            </Button>
         );
   }
   handleClick(i) { //点击触发，取反
      var that = this;
      var j;
      let squares = that.state.squares.slice();
      if (i < that.state.length) {
         if (that.state.squares[i].check_no === -1) {
            if (that.state.able[1])
               squares[i].inf = 1 - that.state.squares[i].inf;
            for (j = 0; j < that.state.length; j++) {
               squares[j].selected = 0; //其他恢复颜色
            }
         }
         else if (that.state.squares[i].check_no !== -1) {
            squares[i].selected = 1;//选取的校验位置红
            var no = that.state.squares[i].check_no + 1;
            for (j = 0; j < that.state.length; j++) {
               if (i !== j)
                  squares[j].selected = 0; //其他恢复颜色
               if (i !== j && j > i && (((j - i - 1) % (2 * no)) < no))
                  squares[j].selected = squares[i].selected;
            }
         }

      }
      this.setState({ squares: squares });
      // console.log(this.state.squares)
   }
   handleClickAway() {
      var that = this;
      var j;
      let squares = that.state.squares.slice();
      for (j = 0; j < that.state.length; j++) {
         squares[j].selected = 0; //其他恢复颜色
      }
      this.setState({ squares: squares });

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
         able: [1, 1, 0]
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
            check_no: new_code[i] === '?' ? (i - j) : -1,
            selected: 0
         };
      }
      //console.log(squares);


      this.setState({
         squares: squares,
         length: new_length,
         code: new_code,
         able: [1, 0, 1]
      })
   }
   gen_cd_i(i) {
      var that = this;
      var no = that.state.squares[i].check_no + 1;
      var j;
      var value = -1;
      for (j = 0; j < that.state.length; j++) {
         if (i !== j && j > i && (((j - i - 1) % (2 * no)) < no)) {
            if (value === -1)
               value = that.state.squares[j].inf;
            else value ^= that.state.squares[j].inf;
         }
      }
      return value;
   }
   gen_cd() {
      var that = this;
      let squares = that.state.squares.slice();
      var i;
      for (i = that.state.length - 1; i >= 0; i--) {
         if (that.state.squares[i].check_no !== -1) {
            squares[i].inf = this.gen_cd_i(i);
         }
      }
      this.setState({
         squares: squares,
         able: [1, 0, 0]
      });
   }
   render() {
      const status = 'Hamming_Code'
      const gen_ch = '生成校验位'
      const gen_cd = '生成校验码'
      const init_h = '重置'
      const inf_code = [];
      const inf_pos = [];
      for (var i = 0; i < this.state.length; i++) {
         inf_code.push(
            this.renderSquare_inf(i)
         )
         inf_pos.push(
            this.renderSquare_pos(i)
         )
      }
      //console.log(inf_code);
      return (
         <Grid container spacing={3}>

            <Grid item xs={6}>
               <Typography variant="h4" gutterBottom>
                  {status}
               </Typography>
            </Grid>
            <Grid item xs={1} >
               <Chip
                  variant="outlined"
                  size="medium"
                  avatar={<Avatar>F</Avatar>}
                  label="冯惠"
               //onClick={handleClick}
               />
            </Grid>
            <Grid item xs={1} >
               <Chip
                  variant="outlined"
                  size="medium"
                  avatar={<Avatar>L</Avatar>}
                  label="李沿澎"
               //onClick={handleClick}
               />
            </Grid>
            <Grid item xs={1} >
               <Chip
                  variant="outlined"
                  size="medium"
                  avatar={<Avatar>T</Avatar>}
                  label="田庚轩"
               //onClick={handleClick}
               />
            </Grid>
            <ClickAwayListener onClickAway={() => this.handleClickAway()}>
               <Grid item xs={6}>
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
               </Grid>
            </ClickAwayListener>
            <Grid item xs={6}>
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
         </Grid>

      );
   }
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
                  <Tab label="Experiment" {...a11yProps(0)} />
                  <Tab label="Concepts" {...a11yProps(1)} />
               </Tabs>
            </AppBar>
         </MuiThemeProvider>
         <TabPanel value={value} index={0}>
            <MuiThemeProvider theme={theme}>
               <Board />
            </MuiThemeProvider>
         </TabPanel>
         <TabPanel value={value} index={1}>
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
