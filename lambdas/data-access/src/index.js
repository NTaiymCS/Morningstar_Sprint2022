// payload - the essential information in a data block that you send to or receive from the server when making API requests
// DDB Table Name = mstar-sprintern2022-fp
'use strict'
const AWS = require('aws-sdk');
AWS.config.update({region: "us-east-1"}); // setting region

// exports.handler = async function(event, context) {
//   return {statusCode: 200, body: "OK"};
// };
exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({apiVersion: "2012-10-08"}); // new dynamo object
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"}); // makeit a regular json file
    
    console.log('The event method is:', event);
    // Invoking via API Gateway
    if(event.httpMethod == 'GET') {
       //retrieving from DynamoDB database
       const params = {
            TableName: "mstar-sprintern2022-fp",
            Key:{ 
                ID: event.pathParameters.ID // gets ID 
            }
         }
        //  try {
            // const data = await documentClient.get(params).promise();
             return new Promise((resolve, reject) => {
              documentClient.get(params, (err, data) => {
             console.log("DATA>>", data);
             console.log("ERR>>", err);
            if (err) {
                reject(err);
            }
            //   return {statusCode: 200, body: "OK"};
            if (!Object.keys(data).length) {
                data["Item"] = "Not found";
            }
             const response = {
                    isBase64Encoded: false,
                    statusCode: "200",
                    headers: {
                        "content-type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify(data)
             };
            //  console.log(data);
            resolve(response);
        }
        )});
      
        //  } catch(err){
        //     console.log(err);
        //     }
             
    }
    else if (event.httpMethod == 'PUT') {
        console.log("BODY>>", event.body);
        //saving to DynamoDB database
        const params = {
            TableName: "mstar-sprintern2022-fp",
            Item: JSON.parse(event.body)
         }
         return new Promise((resolve, reject) => {
              documentClient.put(params, (err, data) => {
             console.log("DATA>>", data);
             console.log("ERR>>", err);
            if (err) {
                reject(err);
            }
            //   return {statusCode: 200, body: "OK"};
             const response = {
                    isBase64Encoded: false,
                    statusCode: "200",
                    headers: {
                        "content-type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: "OK"
             };
            //  console.log(data);
            resolve(response);
        }
    )});
    }
    else { 
        throw 'Error in Event Method';
    }
    
    
    
    // export function invoke ({client, method, params}) {
    // return new Promise((resolve, reject) => {
    //     client[method](params, (err, data) => {
    //         if (err) {
    //             reject(err);
    //         }
    //         resolve(data);
    //     });
    // });




    // get format:X/y/z/getUserData/210014
    // put format: X/y/z/putUserData
    
    // add the event body and read the items (most likely event.body)
    
    // if(event.body == event.DynamoDBTableName) {
    //     // event.parameter.DDBTableName == event.DDBTableName // parameter to pass into operation
    //     if(event.body == 'create') { // puts the item
    //         ddb.put(event.payload);
    //     }
    //     else if(event.body == 'read') { // gets the item
    //         ddb.get(event.payload);
    //     }
    //     else {
    //         throw 'Error in event body';
    //     }
    // }
}

// 'use strict'
// const AWS = require('aws-sdk');
// AWS.config.update({region: "us-east-1"}); // setting region

// exports.handler = async (event, context) => {
//     const ddb = new AWS.DynamoDB({apiVersion: "2012-10-08"}); // new dynamo object
//     const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"}); // makeit a regular json file
    
//     console.log('The event method is:', event);
//     // Invoking via API Gateway
//     if(event.httpMethod == 'GET') {
//        //retrieving from DynamoDB database
//        const params = {
//             TableName: "mstar-sprintern2022-fp",
//             Key:{ 
//                 ID: event.pathParameters.ID // gets ID 
//             }
//          }

//             // const data = await documentClient.get(params).promise();
//              return new Promise((resolve, reject) => {
//               documentClient.get(params, (err, data) => {
//              console.log("DATA>>", data);
//              console.log("ERR>>", err);
//             if (err) {
//                 reject(err);
//             }
//             //   return {statusCode: 200, body: "OK"};
//             if (!Object.keys(data).length) {
//                 data["Item"] = "Not found";
//             }
//              const response = {
//                     isBase64Encoded: false,
//                     statusCode: "200",
//                     headers: {
//                         "content-type": "application/json"
//                     },
//                     body: JSON.stringify(data)
//              };
//             //  console.log(data);
//             resolve(response);
//         }
//         )});
//     }
//     else if (event.httpMethod == 'PUT') {
//         //saving to DynamoDB database
//         const params = {
//             TableName: "mstar-sprintern2022-fp",
//             Item: event.body
//          }
//          try {
//              const data = await documentClient.put(params).promise();
    
//             }
//         catch(err){
//             console.log(err);
//         }
//     }
//     else { 
//         throw 'Error in Event Method';
//     }
        
// }