from django.db import models
# from .models import User

# Create your models here.
class Food (models.Model):
    name:str = models.CharField(
        max_length=50
    )
    TYPES_OF_FOOD = {
        "VE" : "Vegetable",
        "FR" : "Fruit",
        "GR" : "Grain",
        "DA" : "Dairy",
        "OT" : "Other",
    }
    type:str = models.CharField(
        max_length=2,
        choices=TYPES_OF_FOOD,
        default="OT",
        null=False,
        blank=False
    )
    kcal:int = models.IntegerField(
        null=False,
        blank=False,
        default=0
    )
    saturatedfat:int = models.IntegerField(
        null=False,
        blank=False,
        default=0
    )
    transfat:int = models.IntegerField(
        null=False,
        blank=False,
        default=0
    )
    cholesterol:int = models.IntegerField(
        null=False,
        blank=False,
        default=0
    )
    fiber:int = models.IntegerField(
        null=False,
        blank=False,
        default=0
    )
    sugar:int = models.IntegerField(
        null=False,
        blank=False,
        default=0
    )
    protein:int = models.IntegerField(
        null=False,
        blank=False,
        default=0
    )
    def __str__(self):
        return self.name

class Meal (models.Model):
    name:str = models.CharField(
        max_length=100
    )
    food = models.ManyToManyField(
        Food,
    )

class Day (models.Model):
    date = models.DateField(
        auto_now=False,
        auto_now_add=True
    )
    meal = models.ManyToManyField(Meal)
    def __str__(self):
        return self.date
    user = models.ForeignKey(
        "user_app.User",
        on_delete=models.CASCADE,
        related_name="days",
        related_query_name="day"
    )
    