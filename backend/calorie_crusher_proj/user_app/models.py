from django.db import models

# Create your models here.
class User (models.Model):
    username:str = models.CharField(
        max_length=30,
        null=False,
        blank=False
    )
    email:str = models.CharField(
        max_length=30,
        null=False,
        blank=False
    )
    height_in:int = models.IntegerField(
        default=70,
        null=True,
        blank=True
    )
    weight_ib:float = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True
    )
    goal_weight:int = models.IntegerField(
        null=True,
        blank=True
    )