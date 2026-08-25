from django.db import models
# from .models import User

# Create your models here.


class Day (models.Model):
    date = models.DateField(
        auto_now=False,
        auto_now_add=True
    )
    owner = models.ForeignKey(
        "client_app.Client",
        on_delete=models.CASCADE,
        related_name="days",
        related_query_name="day"
    )

class Meal (models.Model):
    name:str = models.CharField(
        max_length=100
    )


class ExternalFood (models.Model):
    owner = models.ForeignKey(
            "client_app.Client",
            on_delete=models.CASCADE,
            related_name="external_foods",
            related_query_name="external_food"
        )
    food_id:int = models.BigIntegerField(
        null=False,
        blank=False
    )

class Food (models.Model):
    owner = models.ForeignKey(
        "client_app.Client",
        on_delete=models.CASCADE,
        related_name="created_foods",
        related_query_name="created_food"
    )
    name:str = models.CharField(
        max_length=50
    )
    TYPES_OF_FOOD = {
        "VE" : "Vegetable",
        "FR" : "Fruit",
        "GR" : "Grain",
        "DA" : "Dairy",
        "PR" : "Protein",
        "OT" : "Other",
    }
    food_type:str = models.CharField(
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
    saturated_fat:int = models.IntegerField(
        null=False,
        blank=False,
        default=0
    )
    trans_fat:int = models.IntegerField(
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

class FoodItem (models.Model):
    quantity:int = models.IntegerField(
        default=1,
        null=False,
        blank=False
    )
    food = models.OneToOneField(
        Food,
        on_delete=models.CASCADE
    )
    meal = models.ForeignKey(
        Meal,
        on_delete=models.CASCADE
    )


class MealItem (models.Model):
    quantity:int = models.IntegerField(
        default=1,
        null=False,
        blank=False
    )
    meal = models.OneToOneField(
        Meal,
        on_delete=models.CASCADE
    )
    day = models.ForeignKey(
        Day,
        on_delete=models.CASCADE,
        related_name="meals",
        related_query_name="meal"
    )