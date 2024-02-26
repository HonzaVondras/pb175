from django.db import models

# Create your models here.

class FoodItem(models.Model):
    name = models.CharField(max_length=255)
    image = models.CharField(max_length=1000, default="")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return self.name

class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    image = models.CharField(max_length=1000)

    food_items = models.ManyToManyField(FoodItem, related_name="restaurants")

    def __str__(self):
        return self.name
