//import querystring from "querystring";
import fetch from "node-fetch";
//const fs = require("fs");
//const yaml = require("js-yaml");

//import settings from "@/common/settings.yml";
import { marketCapitalization } from "@/view-decorators/globalquote";
function getAlphaVantageApi(func, symbol) {
  const options = {
    method: "GET"
  };
  const params = new URLSearchParams({
    function: func,
    symbol: symbol,
    apikey: process.env.ALPHAVANTAGE_API_KEY
  });
  const url = "https://www.alphavantage.co/query?";
  return fetch(url + params, options);
}

function notificationSlack(overview, globalQuote, symbol) {
  const marketCapitalization2 = marketCapitalization(
    overview["MarketCapitalization"]
  );
  //const payload = {
  //  username: "webhook",
  //  channel: "@arkf",
  //  text:
  //    "see more detail about `webhook` in http://qiita.com/rubytomato@github/items/6558bfdb37d982891c09#incoming-webhooks \n this message is sent via `curl`",
  //  icon_emoji: ":ghost:"
  //};

  const sym = symbol.toLowerCase();
  return fetch(process.env.SLACK_WEBHOOK_URL, {
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      username: `${overview["Name"]} 펀더멘탈 정보`,
      channel: `#${sym}`,
      //text: "Fear & Greed Index",
      blocks: [
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                emoji: true,
                text: "기본정보"
              },
              style: "primary",
              value: "click_me_123"
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                emoji: true,
                text: "주가동향"
              },
              style: "danger",
              value: "click_me_123"
            }
          ]
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*종전주가:*\n${globalQuote["Global Quote"]["05. price"]}`
            },
            {
              type: "mrkdwn",
              text: `*종전 시작가:*\n${globalQuote["Global Quote"]["02. open"]}`
            },
            {
              type: "mrkdwn",
              text: `*종전 최저가:*\n${globalQuote["Global Quote"]["04. low"]}`
            },
            {
              type: "mrkdwn",
              text: `*종전 최고가:*\n${globalQuote["Global Quote"]["03. high"]}`
            }
          ]
        },
        {
          type: "divider"
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Sector:*\n${overview["Sector"]}(${overview["Industry"]})`
            },
            {
              type: "mrkdwn",
              text: `*MarketCapitalization(시가총액):*\ ${marketCapitalization2}`
            },
            {
              type: "mrkdwn",
              text: `*LatestQuarter(최근 결산일):*\n${
                overview["LatestQuarter"]
              }`
            },
            {
              type: "mrkdwn",
              text: `*EBITDA:*\n${overview["EBITDA"]}`
            },
            {
              type: "mrkdwn",
              text: `*PER:*\n${overview["PERatio"]}`
            },
            {
              type: "mrkdwn",
              text: `*PEG ratio(Price Earnings to Growth ratio, 주가 수익 성장 비율):*\n${
                overview["PEGRatio"]
              }%`
            }
          ]
        },
        {
          type: "divider"
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Short Ratio:*\n${overview["ShortRatio"]}`
            },
            {
              type: "mrkdwn",
              text: `*Short % of Float:*\n${overview["ShortPercentFloat"]}`
            },
            {
              type: "mrkdwn",
              text: `*Short % Outstanding*\n${
                overview["ShortPercentOutstanding"]
              }%`
            }
          ]
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: ":link: |   *관련 링크*  | :link: "
          }
        },
        {
          type: "divider"
        },
        /* {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "각종지표:"
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "미국 달러 지수",
              emoji: true
            },
            url: `https://kr.investing.com/currencies/us-dollar-index`,
            action_id: "button"
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "달러->엔",
              emoji: true
            },
            url: `https://kr.investing.com/currencies/usd-jpy`,
            action_id: "button"
          },
          accessory: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "달러->원22",
                emoji: true
              }
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "달러->원",
                emoji: true
              },
              url: `https://kr.investing.com/currencies/usd-krw`,
              action_id: "button"
            }
          ]
        }, */
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
        }
        /*
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text:
                ":pushpin: Do you have something to include in the newsletter? Here's *how to submit content*."
            }
          ]
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: ":calendar: |   *PAST EVENTS*  | :calendar: "
          }
        },
        {
          type: "divider"
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text:
              "`11/13` :pretzel: *Pretzel Day* :pretzel: at _Scranton Office_"
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "RSVP",
              emoji: true
            }
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "`12/01` *Toby's Going Away Party* at _Benihana_"
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "Learn More",
              emoji: true
            }
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text:
              "`11/20-11/22` *Beet the Competition* _ annual retreat at Schrute Farms_"
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "RSVP",
              emoji: true
            }
          }
        } */
      ]
    })
  })
    .then(() => ({
      statusCode: 200,
      body: `Your greeting has been sent to Slack 👋`
    }))
    .catch(error => ({
      statusCode: 422,
      body: `Oops! Something went wrong. ${error}`
    }));
}

exports.handler = async (event, context, callback) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  //GLOBAL_QUOTE
  const body = event["body"];
  const text = body.split("&text=")[1];
  const symbol = text.split("&")[0];
  console.log("body:", body);

  //const symbol = event["queryStringParameters"]["symbol"];
  //console.log("symbol", symbol);
  if (!symbol) {
    console.log("Symbol Params is missing:", body);
    return { statusCode: 405, body: "Symbol Params is missing" };
  }

  //const fileContents = fs.readFileSync("@/common/settings.yml", "utf8");
  //const settings = yaml.safeLoad(fileContents);
  //console.log("settings:", settings);
  //const contents = require("@/common/settings.yml");
  //console.log("yaml", yaml);
  //console.log("settings:", settings);
  //const params = querystring.parse(event.body);
  let res;
  let overview;
  let res2;
  let globalQuote;
  try {
    res = await getAlphaVantageApi("OVERVIEW", symbol);
    overview = await res.json();
    console.log("overview:", overview);
  } catch (e) {
    console.log("getAlphaVantageApi OVERVIEW failed:", e);
  }

  try {
    res2 = await getAlphaVantageApi("GLOBAL_QUOTE", symbol);
    globalQuote = await res2.json();
    console.log("globalQuote:", globalQuote["Global Quote"]);
  } catch (e) {
    console.log("getAlphaVantageApi GLOBAL_QUOTE failed:", e);
  }

  //const json = await overview.json();

  //console.log("overview:", overview);
  //console.log("globalQuote:", globalQuote);

  //const json = await globalQuote.json();
  //console.log(
  //  "queryStringParameters:",
  //  event["queryStringParameters"]["symbol"]
  //);

  try {
    await notificationSlack(overview, globalQuote, symbol);
  } catch (e) {
    console.log("notification Slack failed:", e);
    return {
      statusCode: 500,
      body: e
    };
  }

  console.log("success");
  return {
    statusCode: 200,
    body: "done"
  };
};
