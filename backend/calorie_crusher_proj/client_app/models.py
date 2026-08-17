from django.db import models
from django.contrib.auth.models import AbstractUser
from .validators import email_format_validate, username_format_validate

# Create your models here.
class Client (AbstractUser):
    username:str = models.CharField(
        max_length=30,
        null=False,
        blank=False,
        default="defaultusername",
        validators=[username_format_validate],
        unique=True
    )
    email:str = models.CharField(
        max_length=30,
        null=False,
        blank=False,
        default="defaultusername",
        validators=[email_format_validate]
    )