const logger = require('../logger');

const FileUploader = {
  adapters: {
    cloudStorage: require('../gcp/CloudStorage'),
    s3: require('../aws/s3'),
  },

  driver: null,

  acls: {
    authenticatedRead: 'authenticatedRead',
    public: 'public'
  },
  putObject: async ({
    driver = 's3',
    bucket,
    key,
    body,
    acl = 'authenticatedRead',
    contentType,
  }) => {
    logger.info(`Uploading a file to ${driver}`);
    if (!FileUploader.driver) {
      FileUploader.driver = await FileUploader.adapters[driver];
    }
    const resp = await FileUploader.driver.putObject({
      bucket,
      key,
      acl,
      contentType,
      body
    });
    return resp;
  }
};

module.exports = FileUploader;
