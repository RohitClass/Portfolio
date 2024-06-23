from django.db import models

class User(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('user', 'User'),
    ]

    name = models.CharField(max_length=25)
    email = models.EmailField(max_length=254, unique=True)
    password = models.CharField(max_length=250)
    role = models.CharField(max_length=5, choices=ROLE_CHOICES, default='user')
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)  
    def __str__(self):
        return self.name
