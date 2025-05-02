from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    role_choices = (
        ('admin', 'Admin'),
        ('shareholder', 'Shareholder'),
        ('client', 'Client'),
        ('guide', 'Guide'),
    )
    role = models.CharField(max_length=20, choices=role_choices, default='client')
    is_verified = models.BooleanField(default=False)

    # Add related_name to groups and user_permissions to avoid clashes
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='accounts_user_set',  # Custom related name
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='accounts_user_permissions_set',  # Custom related name
        blank=True
    )

    def __str__(self):
        return self.username
