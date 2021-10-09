const themeRules = {
  nav: {
    default: `
      --font-weight-bold: normal;
      --nav-bar-title-font-size: 28rpx;
      --nav-bar-title-text-color: #000;
      --nav-bar-background-color: #fafafa;
      --nav-bar-icon-color: #d6d6d6;
      --nav-bar-arrow-size: 45rpx
    `,
    theme1: `
      --font-weight-bold: normal;
      --nav-bar-title-font-size: 28rpx;
      --nav-bar-title-text-color: #fff;
      --nav-bar-background-color: #55aef2;
      --nav-bar-icon-color: #fff;
      --nav-bar-arrow-size: 45rpx
    `,
    theme2: `
      --font-weight-bold: normal;
      --nav-bar-title-font-size: 28rpx;
      --nav-bar-title-text-color: #fff;
      --nav-bar-background-color: #ee5c43;
      --nav-bar-icon-color: #fff;
      --nav-bar-arrow-size: 45rpx
    `,
    theme3: `
      --font-weight-bold: normal;
      --nav-bar-title-font-size: 28rpx;
      --nav-bar-title-text-color: #fff;
      --nav-bar-background-color: #f48435;
      --nav-bar-icon-color: #fff;
      --nav-bar-arrow-size: 45rpx
    `,
    theme4: `
      --font-weight-bold: normal;
      --nav-bar-title-font-size: 28rpx;
      --nav-bar-title-text-color: #fff;
      --nav-bar-background-color: #3ca068;
      --nav-bar-icon-color: #fff;
      --nav-bar-arrow-size: 45rpx
    `,
  },
  card: {
    main: {
      default: `
        background: #fafafa;
        border-color: #d6d6d6;
        color: #000;
      `,
      theme1: `
        background: #55aef2;
        color: #fff;
      `,
      theme2: `
        background: #ee5c43;
        color: #fff;
      `,
      theme3: `
        background: #f48435;
        color: #fff;
      `,
      theme4: `
        background: #3ca068;
        color: #fff;
      `,
    },
    other: {
      // color: #d6d6d6;
      default: `
        color:#c8c9cc
      `,
      // color: #76ccfb;
      theme1: `
        color: #fff
      `,
      // color: #ff8b7e;
      theme2: `
        color: #fff;
      `,
      // color: #ffaa69;
      theme3: `
        color: #fff;
      `,
      // color: #6dcc9d;
      theme4: `
        color: #fff;
      `
    },
    bottomLine: {
      default: 'bottom-line-default',
      theme1: 'bottom-line-theme1',
      theme2: 'bottom-line-theme2',
      theme3: 'bottom-line-theme3',
      theme4: 'bottom-line-theme4'
    }
    
  },
  natBtn: {
    default: `color: #d6d6d6`,
    theme1: `color: #76ccfb`,
    theme2: `color: #ff8b7e`,
    theme3: `color: #ffaa69`,
    theme4: `color: #6dcc9d`,
  },
  tabbar: {
    default: `#d6d6d6`,
    theme1: `#76ccfb`,
    theme2: `#ff8b7e`,
    theme3: `#ffaa69`,
    theme4: `#6dcc9d`,
  },
  resumeHeader: {
    // color: #d6d6d6;
    default: `
      background: #fafafa;
      color: #000;
    `,
    // color: #76ccfb;
    theme1: `
      background: #55aef2;
      color: #fff;
    `,
    // color: #ff8b7e;
    theme2: `
      background: #ee5c43;
      color: #fff;
    `,
    // color: #ffaa69;
    theme3: `
      background: #f48435;
      color: #fff;
    `,
    // color: #6dcc9d;
    theme4: `
      background: #3ca068;
      color: #fff;
    `,
    text: {
      default: `
        color: #000;
      `,
      theme1: `
        color: #fff;
      `,
      theme2: `
        color: #fff;
      `,
      theme3: `
        color: #fff;
      `,
      theme4: `
        color: #fff;
      `
    }
  },
  button: {
    default: `
      --button-default-border-color: #fafafa;
      --button-default-background-color: #fafafa;
      --button-default-color: #d6d6d6;
    `,
    theme1: `
      --button-default-border-color: #55aef2;
      --button-default-background-color: #55aef2;
      --button-default-color: #fff;
    `,
    theme2: `
      --button-default-border-color: #ee5c43;
      --button-default-background-color: #ee5c43;
      --button-default-color: #fff;
    `,
    theme3: `
      --button-default-border-color: #f48435;
      --button-default-background-color: #f48435;
      --button-default-color: #fff;
    `,
    theme4: `
      --button-default-border-color: #3ca068;
      --button-default-background-color: #3ca068;
      --button-default-color: #fff;
    `
  },
  simpleBtn: {
    default: `
      border-color: #fafafa;
      background-color: #fafafa;
      color: #d6d6d6;
    `,
    theme1: `
      border-color: #55aef2;
      background-color: #55aef2;
      color: #fff;
    `,
    theme2: `
      border-color: #ee5c43;
      background-color: #ee5c43;
      color: #fff;
    `,
    theme3: `
      border-color: #f48435;
      background-color: #f48435;
      color: #fff;
    `,
    theme4: `
      border-color: #3ca068;
      background-color: #3ca068;
      color: #fff;
    `
  },
  canvasBg: {
    default: '#fafafa',
    theme1: '#55aef2',
    theme2: '#ee5c43',
    theme3: '#f48435',
    theme4: '#3ca068'
  }
}

module.exports = {
  themeRules
}