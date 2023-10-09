/**
 * @type {import("@types/aws-lambda").APIGatewayProxyHandler}
 */

const {DynamoDBClient} = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

const env = process.env.ENV;
const AppsyncID = process.env.API_INSTAGRAM_GRAPHQLAPIIDOUTPUT;
const TableName = `User-${AppsyncID}-${env}`; // TableName-AppsyncID-env

const userExists = async id => {
  const params = {
    TableName,
    Key: id,
  };

  try {
    const response = await docClient.send(new GetCommand(params));
    return !!response?.Item;
  } catch (e) {
    return false;
  }
};

const saveUser = async user => {
  const date = new Date();
  const dateStr = date.toISOString();
  const timestamp = date.getTime();

  const Item = {
    ...user,
    __typename: 'User',
    createdAt: dateStr,
    updatedAt: dateStr,
    _lastChangedAt: timestamp,
    _version: 1,
  };
  const params = {
    TableName,
    Item,
  };

  try {
    await docClient.send(new PutCommand(params));
  } catch (e) {
    console.log(e);
  }
};

exports.handler = async (event, context) => {
  console.log('Heyy, Lambda function is working and is updated');

  if (!event?.request?.userAttributes) {
    console.log('No user data available');
    return;
  }

  const {sub, name, email} = event.request.userAttributes; // {sub, email, name}

  const newUser = {
    id: sub,
    owner: sub,
    name,
    email,
    nofPosts: 0,
    nofFollowers: 0,
    nofFollowings: 0,
  };

  // check if the user already exists
  if (!(await userExists(newUser.id))) {
    // if not, save the user to database.
    await saveUser(newUser);
    console.log(`User ${newUser.id} has been saved to the database`);
  } else {
    console.log(`User ${newUser.id} already exists`);
  }

  return event;
};
