export const slackGetPrice = (price, open, low, high) => {
  return {
    type: "section",
    fields: [
      {
        type: "mrkdwn",
        text: `*종전주가:*\n${price}`
      },
      {
        type: "mrkdwn",
        text: `*종전 시작가:*\n${open}`
      },
      {
        type: "mrkdwn",
        text: `*종전 최저가:*\n${low}`
      },
      {
        type: "mrkdwn",
        text: `*종전 최고가:*\n${high}`
      }
    ]
  };
};

export const getDivider = () => {
  return {
    type: "divider"
  };
};

export const getLinkTitle = () => {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: ":link: |   *관련 링크*  | :link: "
    }
  };
};

export const slackGetFundamental = (
  sector,
  industry,
  marketCapitalization,
  latestQuarter,
  EBITDA,
  PERatio,
  PEGRatio
) => {
  return {
    type: "section",
    fields: [
      {
        type: "mrkdwn",
        text: `*Sector:*\n${sector}(${industry})`
      },
      {
        type: "mrkdwn",
        text: `*MarketCapitalization(시가총액):*\ ${marketCapitalization}`
      },
      {
        type: "mrkdwn",
        text: `*LatestQuarter(최근 결산일):*\n${latestQuarter}`
      },
      {
        type: "mrkdwn",
        text: `*EBITDA:*\n${EBITDA}`
      },
      {
        type: "mrkdwn",
        text: `*PER:*\n${PERatio}`
      },
      {
        type: "mrkdwn",
        text: `*PEG ratio(Price Earnings to Growth ratio, 주가 수익 성장 비율):*\n${PEGRatio}%`
      }
    ]
  };
};

export const slackGetShortRatio = (
  ShortRatio,
  ShortPercentFloat,
  ShortPercentOutstanding
) => {
  return {
    type: "section",
    fields: [
      {
        type: "mrkdwn",
        text: `*Short Ratio:*\n${ShortRatio}`
      },
      {
        type: "mrkdwn",
        text: `*Short % of Float:*\n${ShortPercentFloat}`
      },
      {
        type: "mrkdwn",
        text: `*Short % Outstanding*\n${ShortPercentOutstanding}%`
      }
    ]
  };
};

export const getLinkShortInterest = sym => {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "Nasdaq `공매도 잔량`정보(Nasdaq short interest):"
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        text: "클릭",
        emoji: true
      },
      url: `https://www.nasdaq.com/market-activity/stocks/${sym}/short-interest`,
      action_id: "button"
    }
  };
};

export const getLinkShortVolume = sym => {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "`short volume`:"
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        text: "클릭",
        emoji: true
      },
      url: `http://shortvolumes.com/?t=${sym}`,
      action_id: "button"
    }
  };
};

export const getLinkInsiderbuyingselling = sym => {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "`내부자거래`"
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        text: "insiderbuyingselling",
        emoji: true
      },
      url: `http://insiderbuyingselling.com/?t=${sym}`,
      action_id: "button"
    }
  };
};

export const getLinkNews = sym => {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "`관련뉴스`"
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        text: "fintel",
        emoji: true
      },
      url: `https://fintel.io/s/us/${sym}`,
      action_id: "button"
    }
  };
};

export const getLinkRedditWallstreetbets = () => {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "`reddit wallstreetbets`:"
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        text: "클릭",
        emoji: true
      },
      url: `https://www.reddit.com/r/wallstreetbets`,
      action_id: "button"
    }
  };
};
