const CloudStorage = {
  _client: null,

  _getClient: () => {
    const { Storage } = require('@google-cloud/storage');
    if (!CloudStorage._client) {
      CloudStorage._client = new Storage();
    }
    return CloudStorage._client;
  },
  mapAcl: (acl) => {
    const aclMap = {
      authenticatedRead: 'authenticatedRead',
      public: 'publicRead'
    };
    return aclMap[acl] || acl;
  },
  putObject: async ({
    bucket,
    key,
    body,
    acl = 'authenticatedRead',
    contentType,
  }) => {
    const storage = await CloudStorage._getClient().bucket(bucket);
    const file = storage.file(key);
    const uploadOptions = {
      predefinedAcl: CloudStorage.mapAcl(acl),
      metadata: {},
    };
    if (contentType) {
      uploadOptions.metadata.contentType = contentType;
    }
    await file.save(body, uploadOptions);
    return file;
  },
};

module.exports = CloudStorage;
