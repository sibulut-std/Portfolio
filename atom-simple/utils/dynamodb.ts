import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({
  region: 'YOUR_AWS_REGION',
  credentials: {
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  },
})

const docClient = DynamoDBDocumentClient.from(client)

const TABLE_NAME = 'YOUR_DYNAMODB_TABLE_NAME'

export async function getUserMetadata(userId: string) {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: { userId },
  })

  try {
    const response = await docClient.send(command)
    return response.Item || { userId, videosWatched: [], totalVideosWatched: 0, videoRatings: {} }
  } catch (error) {
    console.error('Error getting user metadata:', error)
    throw error
  }
}

export async function updateUserMetadata(userId: string, metadata: any) {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: {
      userId,
      ...metadata,
    },
  })

  try {
    await docClient.send(command)
  } catch (error) {
    console.error('Error updating user metadata:', error)
    throw error
  }
}