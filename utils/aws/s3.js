const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const S3 = {

  _client: null,

  _getClient: () => {
    if (!S3.client) {
      S3._client = new S3Client();
    }
    return S3._client;
  },
  mapAcl: (acl) => {
    const aclMap = {
      authenticatedRead: 'authenticated-read',
      public: 'public-read'
    };
    return aclMap[acl] || acl;
  },
  putObject: async ({
    bucket,
    key,
    body,
    acl = 'authenticated-read',
    contentType
  }) => {
    const uploadParams = {
      Bucket: bucket,
      Key: key,
      Body: body,
      ACL: S3.mapAcl(acl),
    };
    if (contentType) {
      uploadParams.contentType = contentType;
    }
    const putObjectCommandInput = new PutObjectCommand(uploadParams);
    const s3Resp = await S3._getClient().send(putObjectCommandInput);
    return s3Resp;
  },

};

module.exports = S3;
