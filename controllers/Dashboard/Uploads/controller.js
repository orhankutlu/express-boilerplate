const random = require('random-key');
const configs = require('../../../configs');
const FileUploader = require('../../../utils/fileUploader');

const UploadController = {
  uploadAsset: async (request, { locals }) => {
    const { code } = locals.token;
    const { file } = request;
    const extension = file.originalname.split('.').pop();
    const fileName = `${random.generateBase30(16)}.${extension}`;
    const filePath = `users/${code}/uploads/${fileName}`;
    const { buffer } = file;
    await FileUploader.putObject({
      driver: configs.business.fileUploads.driver,
      bucket: configs.business.fileUploads.bucket,
      key: filePath,
      acl: 'public',
      body: buffer,
      contentType: file.mimetype
    });
    return {
      fileName,
      cdnUrl: `${configs.business.fileUploads.cdnBaseUrl}/${filePath}`
    };
  },
};

module.exports = UploadController;
