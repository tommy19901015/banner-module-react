import React from "react";
import "./css/banner.css";
import imgUrl from "./img/1200x380.png";

// css會替換的變數名稱
const openedStatus = "opened";
const openingStatus = "opening";
const closedStatus = "closed";
const closingStatus = "closing";

class Banner extends React.Component {
  state = {
    isOpen: true, // [boolean] true | false
    nowState: "opened", // [String] closed | closing | opened | opening
    autoToggleTime: "", //[number] 3000,
    nowBtnText:"收合", //[String] 收合 | 展開
    //-------------------------------------------------------------
    openAtStart: true, // [boolean] true | false
    // 設定啟動後是否要自動開或合，若設為false，就不要自勳開合；若為true是馬上自動開合；若為數字是幾毫秒之後開合
    autoToggle: true, // [boolean|number] true | false | 3000
    // 設定收合展開按鈕
    button: {
      closeText: "收合", // [string]
      openText: "展開", // [string]
      class: "btn" // [string]
    },
    // buttonName: "btn",
    // 設定模組在各狀態時的class
    bannerClass: {
      closed: "closed", // [string]
      closing: "closing", // [string]
      opened: "opened", // [string]
      opening: "opening" // [string]
    },
    // 是否要有transition效果
    transition: true,
    transitionClass: "",
    // 當有transition時，要執行的callback function
    whenTransition: function() {
      console.log("whenTransition");
    }
  };
  componentWillMount = () => {
    const { openAtStart, autoToggle, transition } = this.props;    
    this.checkTypeof(openAtStart, autoToggle, transition);
  };

  // 判斷Props型別是否正確
  checkTypeof = (openAtStart, autoToggle, transition) =>{
    // 判斷this.props.openAtStart 是否為 boolean 
    if( typeof openAtStart === "boolean"){
      if(openAtStart){
        this.transitionStart(openedStatus)
        this.setState({nowBtnText:this.state.button.closeText})
      }else{
        this.transitionStart(closedStatus);
        this.setState({nowBtnText:this.state.button.openText})
      }
    }

    // 判斷this.props.transition 是否為 boolean 

    if( typeof transition === "boolean"){
      if(transition){
        this.setState({ transitionClass: "transition" })
      }else{
        this.setState({ transitionClass: "" });
      }
    }

    // 判斷this.props.autoToggle 是否為 number 或 boolean

    if (typeof autoToggle === "number") {
      this.autoToggle(autoToggle);
    } else if (typeof autoToggle === "boolean") {
      if (autoToggle) {
        this.autoToggle();
      }
    }
  }

  handleClick = () => {
    const {isOpen,button,nowState} = this.state;
    nowState === openedStatus ||
    nowState === openingStatus
      ? this.transitionStart(closingStatus)
      : this.transitionStart(openingStatus);
    this.setInterval();
    this.setState({
      isOpen: !isOpen,
      nowBtnText:isOpen ? this.state.nowBtnText = button.closeText :
      this.state.nowBtnText = button.openText  
    });
  };

  transitionStart = classStatus => {
    this.setState({
      nowState: classStatus
    });
  };

  setInterval = () => {
    this.time = setInterval(() => {
      this.state.whenTransition();
    }, 100);
  };

  autoToggle(number) {
    if (typeof number === "number") {
      setTimeout(() => {
        this.state.nowState === openingStatus
          ? this.transitionStart(closedStatus)
          : this.transitionStart(openedStatus);
      }, number);
    } else {
      this.state.nowState === openingStatus
        ? this.transitionStart(closedStatus)
        : this.transitionStart(openedStatus);
    }
  }
  
  transitionEnd = () => {
    this.state.nowState === openingStatus
      ? this.transitionStart(openedStatus)
      : this.transitionStart(closedStatus);
    clearInterval(this.time);
    console.log("transitionEnd");
  };
  render() {
    const {
      isOpen,
      button,
      nowState,
      nowBtnText,
      bannerClass,
      transitionClass,
    } = this.state;
    return (
      <div
        className={`banner ${nowState} ${transitionClass} `}
        onTransitionEnd={this.transitionEnd}
      >
        <a className="wrap" href="#">
          <img className="img" src={imgUrl} />
        </a>
        <button className="btn" onClick={this.handleClick}>
          {nowBtnText}
        </button>
      </div>
    );
  }
}

export default Banner;
