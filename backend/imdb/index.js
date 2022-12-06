const { DataExchange } = require("aws-sdk");
require('dotenv').config()

const assetId = "f05f6f7ca415c8be7341f95bf1db34c5";
const datasetId = "4b1f47d86b35356cf8fb6f15cc758c0e";
const revisionId = "4915c8e5e666a284124fc532ca8fbbe2";
const path = "/v1";
const method = "POST";

// const body = JSON.stringify({
//   query: `{
//     title(id: "tt0372784") {
//       titleText {
//         text
//       }
//       releaseDate {
//         year
//       }
//       primaryImage {
//         url
//       }
//       filmingLocations (first: 1) {
//         edges {
//           cursor
//           node {
//             text
//           }
//         }
//         pageInfo {
//           hasNextPage
//         }
//       }
//     }
//   }`
// });

function gen_query(movieID, initial = false, cursor = null) {
  let query = ''
  if (initial == true) {
    query = `{
      title(id: "${movieID}") {
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

async function readTitle() {
  const movieID = "tt0372784"
  try {
    const response = await dataExchangeClient
      .sendApiAsset({
        AssetId: assetId,
        Body: gen_query(movieID, initial = true),
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
          Body: gen_query(movieID, false, edgeCursor),
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