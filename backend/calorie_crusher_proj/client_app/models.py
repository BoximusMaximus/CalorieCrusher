from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import MaxValueValidator, MinValueValidator
from .validators import  username_format_validate

class ClientManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(
            email = email,
            username = username,
            **extra_fields,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields["is_staff"]=True
        extra_fields["is_superuser"]=True
        return self.create_user(username=username, password=password, **extra_fields)

# Create your models here.
class Client (AbstractUser):
    username:str = models.CharField(
        max_length=30,
        unique=True,
        null=False,
        blank=False,
        default=None,
        validators=[username_format_validate],
    )
    email:str = models.EmailField(
        max_length=30,
        unique=True,
        null=False,
        blank=False,
        default=None,
    )
    weight:int = models.IntegerField(
        validators=[MinValueValidator(100), MaxValueValidator(999)],
        null=True,
        blank=True,
        default=None,
    ) 
    target_weight:int = models.IntegerField(
        validators=[MinValueValidator(100), MaxValueValidator(999)],
        null=True,
        blank=True,
        default=None,
    )
    height:int = models.IntegerField(
        validators=[MinValueValidator(48), MaxValueValidator(90)],
        null=True,
        blank=True,
        default=None,
    )
    fat_secret_token = models.CharField(
        max_length=255,
        null=True,
        blank=True
    ) 

    USERNAME_FIELD="username"
    REQUIRED_FIELDS=[]
    objects = ClientManager()

    def __str__(self):
        return self.username