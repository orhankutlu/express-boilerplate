const Publisher = require('../utils/publisher');

module.exports = async (publisherConfig) => {
  const driverConfig = publisherConfig.drivers[publisherConfig.activeDriver];

  await Publisher.init({
    activeDriver: publisherConfig.activeDriver,
    config: driverConfig
  });
};
