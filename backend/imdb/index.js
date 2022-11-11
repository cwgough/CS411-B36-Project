const { DataExchange } = require("aws-sdk");
require('dotenv').config()

module.exports = function () {

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

}