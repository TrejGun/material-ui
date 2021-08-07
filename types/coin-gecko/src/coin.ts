export interface ICoinGeckoCoin {
  id: string;
  symbol: string;
  name: string;
  asset_platform_id: null;
  platforms: {
    [key: string]: string;
  };
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: Array<string>;
  public_notice: null;
  additional_notices: Array<unknown>;
  localization: {
    [key: string]: string;
  };
  description: {
    [key: string]: string;
  };
  links: {
    homepage: Array<string>;
    blockchain_site: Array<string>;
    official_forum_url: Array<string>;
    chat_url: Array<string>;
    announcement_url: Array<string>;
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: null;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: {
      github: Array<string>;
      bitbucket: Array<string>;
    };
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
  market_data: {
    current_price: {
      [key: string]: number;
    };
    total_value_locked: null;
    mcap_to_tvl_ratio: null;
    fdv_to_tvl_ratio: null;
    roi: null;
    ath: {
      [key: string]: number;
    };
    ath_change_percentage: {
      [key: string]: number;
    };
    ath_date: {
      [key: string]: number;
    };
    atl: {
      [key: string]: number;
    };
    atl_change_percentage: {
      [key: string]: number;
    };
    atl_date: {
      [key: string]: string;
    };
    market_cap: {
      [key: string]: number;
    };
    market_cap_rank: 1;
    fully_diluted_valuation: {
      [key: string]: number;
    };
    total_volume: {
      [key: string]: number;
    };
    high_24h: {
      [key: string]: number;
    };
    low_24h: {
      [key: string]: number;
    };
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    price_change_24h_in_currency: {
      [key: string]: number;
    };
    price_change_percentage_1h_in_currency: {
      [key: string]: number;
    };
    price_change_percentage_24h_in_currency: {
      [key: string]: number;
    };
    price_change_percentage_7d_in_currency: {
      [key: string]: number;
    };
    price_change_percentage_14d_in_currency: {
      [key: string]: number;
    };
    price_change_percentage_30d_in_currency: {
      [key: string]: number;
    };
    price_change_percentage_60d_in_currency: {
      [key: string]: number;
    };
    price_change_percentage_200d_in_currency: {
      [key: string]: number;
    };
    price_change_percentage_1y_in_currency: {
      [key: string]: number;
    };
    market_cap_change_24h_in_currency: {
      [key: string]: number;
    };
    market_cap_change_percentage_24h_in_currency: {
      [key: string]: number;
    };
    total_supply: number;
    max_supply: number;
    circulating_supply: number;
    last_updated: string;
  };
  community_data: {
    facebook_likes: null;
    twitter_followers: number;
    reddit_average_posts_48h: number;
    reddit_average_comments_48h: number;
    reddit_subscribers: number;
    reddit_accounts_active_48h: number;
    telegram_channel_user_count: null;
  };
  developer_data: {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;
    code_additions_deletions_4_weeks: { additions: number; deletions: number };
    commit_count_4_weeks: 290;
    last_4_weeks_commit_activity_series: Array<number>;
  };
  public_interest_stats: { alexa_rank: number; bing_matches: null };
  status_updates: Array<unknown>;
  last_updated: string;
  tickers: Array<{
    base: string;
    target: string;
    market: { name: string; identifier: string; has_trading_incentive: boolean };
    last: number;
    volume: number;
    converted_last: { btc: number; eth: number; usd: number };
    converted_volume: { btc: number; eth: number; usd: number };
    trust_score: string;
    bid_ask_spread_percentage: number;
    timestamp: string;
    last_traded_at: string;
    last_fetch_at: string;
    is_anomaly: false;
    is_stale: boolean;
    trade_url: string;
    token_info_url: null;
    coin_id: string;
    target_coin_id: string;
  }>;
}
