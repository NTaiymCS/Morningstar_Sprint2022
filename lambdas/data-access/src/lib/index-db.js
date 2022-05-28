import AWS from "aws-sdk";
import {
    invoke
} from "../utils";
import config from "../../config/settings";

AWS.config.update({
    region: "us-east-1"
});

const docClient = new AWS.DynamoDB.DocumentClient();

/**
 * Create the table name from the root in the config + app name and objName.
 * This is exported for unit testing purposes.
 * @param {string} appName The name of the app, [Mage, IPT, etc].
 * @param {object} objName The name of the object.  Derived fromm the path of the url.
 *     For instance, /rtq becomes rtq.
 * @returns {string}
 */
export function getTableName (appName = "", objName = "") {
    if (typeof objName !== "string" || objName === "") {
        throw new Error("No objName supplied");
    }

    const appNameExtended = (typeof appName === "string" && appName !== "") ? appName.toLowerCase() + "-app-" : "";

    return config.dynamodb.TableRoot + appNameExtended + objName;
}

// the default export is a function that accepts the Lambda invocation details
export function createObj (appName = "", objName = "", objData = {}) {
    if (typeof objData !== "object" || Object.keys(objData).length === 0) {
        throw new Error("Not a valid object");
    }

    const tableName = getTableName(appName, objName);
    const params = {
        client: docClient,
        method: "put",
        params: {
            TableName: tableName,
            Item: objData
        }
    };

    return invoke(params);
}

// the default export is a function that accepts the Lambda invocation details
export function getObj (appName = "", objName = "", key = "") {
    if (typeof key !== "string" || key === "") {
        throw new Error("Not a valid key");
    }

    const tableName = getTableName(appName, objName);
    const params = {
        client: docClient,
        method: "get",
        params: {
            TableName: tableName,
            Key: {
                "id": key
            }
        }
    };

    return invoke(params);
}

// the default export is a function that accepts the Lambda invocation details
export function updateObj (appName = "", objName = "", objData = {}) {
    if (typeof objData !== "object" || Object.keys(objData).length === 0) {
        throw new Error("Not a valid object");
    }
    if (!objData.id) {
        throw new Error("No id supplied to update");
    }

    const attributeUpdates = {};
    for (let key in objData) {
        if (key !== "id") {
            attributeUpdates[key] = {
                Action: "PUT",
                Value: objData[key]
            };
        }
    }

    const tableName = getTableName(appName, objName, objData);
    const params = {
        client: docClient,
        method: "update",
        params: {
            TableName: tableName,
            Key: {
                id: objData.id
            },
            AttributeUpdates: attributeUpdates
        }
    };

    return invoke(params);
}

// the default export is a function that accepts the Lambda invocation details
export function deleteObj (appName = "", objName = "", key = "") {
    if (typeof key !== "string" || key === "") {
        throw new Error("Not a valid key");
    }

    const tableName = getTableName(appName, objName);
    const params = {
        client: docClient,
        method: "delete",
        params: {
            TableName: tableName,
            Key: {
                "id": key
            }
        }
    };

    return invoke(params);
}
