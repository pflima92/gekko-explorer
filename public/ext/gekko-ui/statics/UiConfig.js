// This config is used in both the
// frontend as well as the web server.

// see https://github.com/askmike/gekko/blob/stable/docs/installing_gekko_on_a_server.md

function getConfig() {
  let configAsString = top.window.localStorage.getItem('config') || '{}';
  let config = JSON.parse(configAsString);
  return config;
}

const CONFIG = {
  headless: true,
  baseUrl: getConfig().baseUrl || 'http://127.0.0.1:3000',
  websocket: getConfig().websocket || 'ws://127.0.0.1:3000',

  /**
   * Gordon UI - configure your additional Indicator names here
   * (standard TA-Lib and Tulip ones are already defined)
   * patterns: for Pattern-Recognizing indicators
   * indicators: for RSI and so on - should not be displayed as Overlay
   * overlays: all Indicators that can be put into the main-chart as overlay, for Example SMA, EMA, Bollinger-Bands etc.
   * Example-Configuration done for tulip-macd - strat
   * If name on chart contains an '_', add the name after the '_' to this array.
   */
  userChartConfig: {
    //patterns:['hasInvertedHammer']
    indicators: [
      "macd",
      "macdSignal",
      "macdHistogram",
      "mystdev",
      "dmPlus",
      "dmLow",
      "momentum"
    ]
    //overlays: []
  }
};

if (typeof window === "undefined") module.exports = CONFIG;
else window.CONFIG = CONFIG;
