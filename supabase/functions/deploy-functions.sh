#!/bin/bash

# Make script exit when a command fails
set -e

# Organization and project details
ORG_SLUG="zktemphfrbapwppjksow"
PROJECT_ID="oymlikmotraabukjqkkx"

# Deploy the subscription-emails function
echo "Deploying subscription-emails function..."
supabase functions deploy subscription-emails --project-ref $PROJECT_ID --no-verify-jwt

echo "Functions deployed successfully!"
