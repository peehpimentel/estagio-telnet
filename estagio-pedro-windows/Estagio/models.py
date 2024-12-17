from django.db import models

# Create your models here.
def cliente():
    id = models.IntegerField(primary_key=True)
    razao = models.CharField(max_length=200)
