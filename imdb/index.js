// const fetch = require('node-fetch');

// async function readTitle() {
//   const data = JSON.stringify({
//     query: `{
//       title(id: "tt6334354")
//     }`
//   });

//   const response = await fetch(
//     'https://api-fulfill.dataexchange.us-east-1.amazonaws.com/v1',
//     {
//       method: 'post',
//       body: data,
//       headers: {
//         authorization: 'AWS4-HMAC-SHA256 Credential=AKIA3HT3ADM7ZBI2SLOG/20221110/us-east-1/dataexchange/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date;x-amzn-dataexchange-asset-id;x-amzn-dataexchange-data-set-id;x-amzn-dataexchange-revision-id, Signature=863fbb61573dae7eb86559afc0b42263c42aee3538eafe9a53b96e40115ba788',

//       }
//     }
//   )

// }

const { DataExchange } = require("aws-sdk");

const assetId = "f05f6f7ca415c8be7341f95bf1db34c5";
const datasetId = "4b1f47d86b35356cf8fb6f15cc758c0e";
const revisionId = "4915c8e5e666a284124fc532ca8fbbe2";
const path = "/v1";
const method = "POST";

const body = JSON.stringify({
  query: `{
    title(id: "tt6334354") {
      ratingsSummary {
        aggregateRating
        voteCount
      }
    }
  }`
});

const dataExchangeClient = new DataExchange({ region: "us-east-1" });

async function readTitle() {
  try {
    const response = await dataExchangeClient
      .sendApiAsset({
        AssetId: assetId,
        Body: body,
        DataSetId: datasetId,
        Method: method,
        Path: path,
        RevisionId: revisionId,
      })
      .promise();
    console.log(JSON.stringify(JSON.parse(response.Body), null, 4));
  } catch (error) {
    console.error(`Request failed with error: ${error}`);
  }
};

readTitle();