#!/bin/bash

# Exit script on any error
set -e

# Check if AWS credentials are set
if [[ -z "$AWS_ACCESS_KEY_ID" || -z "$AWS_SECRET_ACCESS_KEY" || -z "$AWS_REGION" ]]; then
  echo "Error: AWS credentials are not set."
  exit 1
fi

# Define source and destination
SOURCE_FILE="public/blog/index.html"  # Path to the file in the repository
BUCKET_NAME="user-landing-test"       # S3 bucket name
DEST_FILE="news.html"                 # New file name in S3

# Copy and rename the file
echo "Uploading $SOURCE_FILE to S3 as $DEST_FILE..."
aws s3 cp "$SOURCE_FILE" "s3://$BUCKET_NAME/$DEST_FILE" --region "$AWS_REGION"
echo "Upload complete!"
