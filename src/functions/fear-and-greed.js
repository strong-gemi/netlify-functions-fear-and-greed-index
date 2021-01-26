//import querystring from "querystring";
import fetch from "node-fetch";

function getFearAndGreedIndex() {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-host": "fear-and-greed-index.p.rapidapi.com",
      "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
      useQueryString: true
    }
  };
  return fetch("https://fear-and-greed-index.p.rapidapi.com/v1/fgi", options);
}
function notificationSlack(json) {
  return fetch(process.env.SLACK_WEBHOOK_URL, {
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      text: `Fear & Greed Index: ${json.fgi.now.value}(${json.fgi.now.valueText})`
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
  //const params = querystring.parse(event.body);
  const response = await getFearAndGreedIndex();
  const json = await response.json();
  await notificationSlack(json);

  return {
    statusCode: 200,
    body: "done"
  };
};
