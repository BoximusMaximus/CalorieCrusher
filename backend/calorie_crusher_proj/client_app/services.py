import os
from datetime import timedelta

import requests
from django.utils import timezone


TOKEN_URL = "https://oauth.fatsecret.com/connect/token"


class FatSecretTokenError(Exception):
    def __init__(self, message, status_code=502):
        super().__init__(message)
        self.status_code = status_code


def get_fatsecret_token(client, force_refresh=False):
    token_is_valid = (
        client.fat_secret_token
        and client.fat_secret_token_expiration
        # Refresh slightly early to avoid expiry during the API request.
        and client.fat_secret_token_expiration
        > timezone.now() + timedelta(seconds=30)
    )

    if token_is_valid and not force_refresh:
        return (
            client.fat_secret_token,
            client.fat_secret_token_expiration,
            False,
        )

    client_id = os.environ.get("FATSECRET_CLIENT_SECRET_API_ID")
    client_secret = os.environ.get("FATSECRET_CLIENT_SECRET_API_KEY")

    if not client_id or not client_secret:
        raise FatSecretTokenError(
            "FatSecret credentials are not configured",
            status_code=500,
        )

    try:
        response = requests.post(
            TOKEN_URL,
            auth=(client_id, client_secret),
            data={
                "grant_type": "client_credentials",
                "scope": "basic",
            },
            timeout=10,
        )
    except requests.RequestException as exc:
        raise FatSecretTokenError(
            "Could not connect to FatSecret authentication"
        ) from exc

    if not response.ok:
        raise FatSecretTokenError("FatSecret authentication failed")

    try:
        token_data = response.json()
        access_token = token_data["access_token"]
        expires_in = int(token_data.get("expires_in", 86400))
    except (ValueError, KeyError, TypeError) as exc:
        raise FatSecretTokenError(
            "FatSecret returned an invalid token response"
        ) from exc

    expires_at = timezone.now() + timedelta(seconds=expires_in)

    client.fat_secret_token = access_token
    client.fat_secret_token_expiration = expires_at
    client.save(
        update_fields=[
            "fat_secret_token",
            "fat_secret_token_expiration",
        ]
    )

    return access_token, expires_at, True