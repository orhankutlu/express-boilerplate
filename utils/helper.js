const _ = require('lodash');
const xml2js = require('xml2js');
const libphonenumber = require('libphonenumber-js');
const crawlerDetector = require('spider-detector');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const ApplicationError = require('./errors/ApplicationError');
const ErrorCodes = require('./errors/ErrorCodes');


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
  parseXML: async (payload) => {
    const data = await xml2js.parseStringPromise(payload, {
      strict: false
    });

    return data;
  },
  formatPhoneNumber: (phone, countryIso = 'US') => {
    try {
      const phoneNumber = libphonenumber.parsePhoneNumber(phone, countryIso);
      if (!phoneNumber) {
        return {};
      }

      const countryCode = `+${phoneNumber.countryCallingCode}`;

      return {
        fullNumber: phoneNumber.number,
        national: phoneNumber.number.replace(countryCode, ''),
        countryCode,
      };
    } catch (err) {
      logger.error('phoneFormatter:: formatting error', err);
      return {
        fullNumber: phone,
        national: phone
      };
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
  }
};

module.exports = Helper;
