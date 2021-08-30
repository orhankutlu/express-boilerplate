const { SQSClient, SendMessageCommand, SendMessageBatchCommand } = require('@aws-sdk/client-sqs');
const { Consumer } = require('sqs-consumer');

const _ = require('lodash');

const SQS = {

  getQueueConsumer: ({
    queueUrl,
    handleQueueInteractionError,
    handleMessageProcessingError,
    messageHandler,
    queueConfigs = {}, // in case we want to pass other params
  }) => {
    const consumer = Consumer.create({

      queueUrl,

      handleMessage: messageHandler,

      ...queueConfigs
    });

    if (handleQueueInteractionError && typeof handleQueueInteractionError === 'function') {
      consumer.on('error', handleQueueInteractionError);
    }

    if (handleMessageProcessingError && typeof handleMessageProcessingError === 'function') {
      consumer.on('processing_error', handleMessageProcessingError);
    }

    return consumer;
  },

  _client: null,

  _getClient: () => {
    if (!SQS.client) {
      SQS._client = new SQSClient();
    }
    return SQS._client;
  },

  sendMessage: async ({
    queueUrl, messageBody, messageAttributes, Id, delayInSec = 0
  }) => {
    const client = SQS._getClient();
    const params = SQS._prepareSQSMessage({
      messageAttributes, queueUrl, messageBody, delayInSec
    });

    const queueResp = await client.send(new SendMessageCommand(params));
    return {
      queueResp,
      Id,
    };
  },

  sendMessagesInBatch: async ({ messages, queueUrl }) => {
    messages = messages.map((message) => SQS._prepareSQSMessage(message));

    const chunks = _.chunk(messages, 10);
    const client = SQS._getClient();
    const results = {
      successful: [],
      failed: []
    };
    while (chunks.length) {
      const messagesToSend = chunks.pop();
      try {
        const messageResults = await client.send(new SendMessageBatchCommand({
          QueueUrl: queueUrl,
          Entries: messagesToSend,
        }));
        if (messageResults.Successful) {
          results.successful = results.successful.concat(messageResults.Successful);
        }
        if (messageResults.Failed) {
          results.failed = results.failed.concat(messageResults.Failed);
        }
      } catch (error) {
        results.failed = results.failed.concat(messagesToSend.map((messageToSend) => {
          return {
            Id: messageToSend.Id,
            error,
          };
        }));
      }
    }
    return results;
  },

  _prepareSQSMessage: ({
    messageBody, delayInSec, messageAttributes, queueUrl, Id
  }) => {
    const params = {
      DelaySeconds: delayInSec,
      MessageBody: JSON.stringify(messageBody),
      MessageAttributes: {}
    };

    if (queueUrl) { // it can be null for the batch messages
      params.QueueUrl = queueUrl;
    }

    if (Id) {
      params.Id = Id;
      params.MessageAttributes = {
        _identifier: {
          DataType: 'String',
          StringValue: Id
        }
      };
    }

    if (messageAttributes) {
      Object.keys(messageAttributes).forEach((key) => {
        params.MessageAttributes[key] = {
          DataType: 'String',
          StringValue: messageAttributes[key]
        };
      });
    }

    return params;
  }
};

module.exports = SQS;
