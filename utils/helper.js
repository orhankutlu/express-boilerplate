const random = require('random-key');
const _ = require('lodash');
const crawlerDetector = require('spider-detector');
const mongoose = require('mongoose');
const ApplicationError = require('../ApplicationError');
const ErrorCodes = require('../ErrorCodes');
const dayjs = require('dayjs');


const ALL_STATES = {
  US: {
    Alabama: 'AL', Alaska: 'AK', Arizona: 'AZ', Arkansas: 'AR', California: 'CA', Colorado: 'CO', Connecticut: 'CT', Delaware: 'DE', 'District of Columbia': 'DC', Florida: 'FL', Georgia: 'GA', Hawaii: 'HI', Idaho: 'ID', Illinois: 'IL', Indiana: 'IN', Iowa: 'IA', Kansas: 'KS', Kentucky: 'KY', Louisiana: 'LA', Maine: 'ME', Maryland: 'MD', Massachusetts: 'MA', Michigan: 'MI', Minnesota: 'MN', Mississippi: 'MS', Missouri: 'MO', Montana: 'MT', Nebraska: 'NE', Nevada: 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', Ohio: 'OH', Oklahoma: 'OK', Oregon: 'OR', Pennsylvania: 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC', 'South Dakota': 'SD', Tennessee: 'TN', Texas: 'TX', Utah: 'UT', Vermont: 'VT', Virginia: 'VA', Washington: 'WA', 'West Virginia': 'WV', Wisconsin: 'WI', Wyoming: 'WY'
  },
  CA: {
    Manitoba: 'MB', 'New Brunswick': 'NB', 'Newfoundland and Labrador': 'NL', 'Northwest Territories': 'NT', 'Nova Scotia': 'NS', Nunavut: 'NU', Ontario: 'ON', 'Prince Edward Island': 'PE', Quebec: 'QC', Saskatchewan: 'SK', Yukon: 'YT', Alberta: 'AB', 'British Columbia': 'BC'
  }
};


const Helper = {
  parseSortQuery: (sortQuery) => {
    try {
      return sortQuery.split(',').reduce((acc, current) => {
        const [key, value] = current.split(':');
        acc[key] = value;
        return acc;
      }, {});
    } catch (error) {
      throw new ApplicationError({
        error: ErrorCodes.InternalServerError,
        message: `Cannot parse sortQuery ${error.message}`,
        meta: {
          sortQuery
        }
      });
    }
  },
  renderMessage: (messageTemplate, templateParams) => {
    return _.reduce(templateParams, (acc, value, key) => {
      return Helper.stringReplaceAll(acc, `{{${key}}}`, value);
    }, messageTemplate);
  },
  stringReplaceAll: (text, search, replace) => {
    return text.split(search).join(replace);
  },
  isCrawler: (userAgentString) => {
    if (crawlerDetector.isSpider()) {
      return true;
    }

    const commonCrawlerSubStrings = [
      'facebookexternalhit/',
      'Twitterbot',
      'Facebot',
      'Googlebot',
      'Bingbot',
      'Slurp',
      'DuckDuckBot',
      'Baiduspider',
      'YandexBot',
      'ia_archiver',
      'Slackbot',
      'Slack-ImgProxy'
    ];

    let i = 0;
    while (i < commonCrawlerSubStrings.length && userAgentString.indexOf(commonCrawlerSubStrings[i]) < 0) {
      i += 1;
    }

    return i < commonCrawlerSubStrings.length;
  },
  getStateAbbrv: (name, countryCode = 'US') => {
    if (countryCode === 'USA') {
      countryCode = 'US';
    }

    const states = ALL_STATES[countryCode];

    const countryStates = _.mapKeys(states, (value, key) => {
      return key.toLocaleLowerCase();
    });

    return _.get(countryStates, name.toLocaleLowerCase(), name);
  },
  convertToObjectId: (ids) => {
    if (Array.isArray(ids)) {
      return ids.map(mongoose.Types.ObjectId);
    }

    return mongoose.Types.ObjectId(ids);
  },
  addQueryParamsToUrl: (url, params) => {
    const newUrl = new URL(url);
    Object.keys(params).forEach((key) => {
      newUrl.searchParams.set(key, params[key]);
    });
    return newUrl;
  },
  generateRandomNumber: (numberOfDigits = 4) => {
    const number = random.generateDigits(numberOfDigits);
    return number;
  },
  date: {
    now: () => {
      return dayjs();
    },
    hasPassed: ({ date, duration, unit = 'minutes' }) => {
      return dayjs(date).add(duration, unit).isAfter(Helper.date.now());
    }
  }
};

module.exports = Helper;
