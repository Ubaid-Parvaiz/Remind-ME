from django.db import models

# Create your models here.

class SessionUser(models.Model):
	session_user = models.CharField(max_length=200)
	email        = models.EmailField(max_length=20)