const { DataExchange } = require("aws-sdk");
require('dotenv').config()

const assetId = process.env.AWS_ASSET_ID;
const datasetId = process.env.AWS_DATASET_ID;
const revisionId = process.env.AWS_REVISION_ID;
const path = process.env.AWS_PATH;
const method = "POST";

function gen_query(movieID, initial = false, cursor = null) {
  let query = ''
  if (initial == true) {
    query = `{
      title(id: "${movieID}") {
        id
        titleText {
          text
        }
        releaseDate {
          year
        }
        primaryImage {
          url
        }
        filmingLocations (first: 1) {
          edges {
            cursor
            node {
              text
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    }`
  } else {
    query = `{
      title(id: "${movieID}") {
        filmingLocations (first: 1, after: "${cursor}") {
          edges {
            cursor
            node {
              text
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    }`
  }
  return JSON.stringify({ query: query })
}

const dataExchangeClient = new DataExchange({ region: "us-east-1" });

async function readTitle(titleID) {
  try {
    const response = await dataExchangeClient
      .sendApiAsset({
        AssetId: assetId,
        Body: gen_query(titleID, initial = true),
        DataSetId: datasetId,
        Method: method,
        Path: path,
        RevisionId: revisionId,
      })
      .promise();
    let responseBody = JSON.parse(response.Body)
    let nextLocation = responseBody.data.title.filmingLocations.edges[0].node.text
    let filmedLocations = [nextLocation]
    let nextPageExists = responseBody.data.title.filmingLocations.pageInfo.hasNextPage
    while (nextPageExists) {
      let edgeCursor = responseBody.data.title.filmingLocations.edges[0].cursor
      const responseUpdate = await dataExchangeClient
        .sendApiAsset({
          AssetId: assetId,
          Body: gen_query(titleID, false, edgeCursor),
          DataSetId: datasetId,
          Method: method,
          Path: path,
          RevisionId: revisionId,
        })
        .promise();
      responseBody = JSON.parse(responseUpdate.Body)
      nextLocation = responseBody.data.title.filmingLocations.edges[0].node.text
      filmedLocations.push(nextLocation)
      nextPageExists = responseBody.data.title.filmingLocations.pageInfo.hasNextPage
    }
    return [response, filmedLocations];
  } catch (error) {
    console.error(`Request failed with error: ${error}`);
  }
};

module.exports = { readTitle }