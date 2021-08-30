const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

const SNS = {

  _client: null,

  _getClient: () => {
    if (!SNS.client) {
      SNS._client = new SNSClient();
    }
    return SNS._client;
  },

  sendMessage: async ({
    topicArn, messageBody
  }) => {
    const client = SNS._getClient();
    const params = {
      Message: messageBody,
      TopicArn: topicArn,
    };

    const snsResp = await client.send(new PublishCommand(params));
    return {
      snsResp
    };
  },

};

module.exports = SNS;
