from django.db import models

# Create your models here.
class Food (models.Model):
    TYPES_OF_FOOD = {
        "VG" : "Vegetable",
        "FT" : "Fruit",
        "GR" : "Grain",
        "DA" : "Dairy"
    }