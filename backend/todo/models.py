from django.db import models

# Create your models here.


class Todo(models.Model):
    body = models.CharField(max_length=300)
    content = models.TextField(max_length=1000,default=" ")
    completed = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)