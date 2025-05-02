from django.contrib.auth.models import AbstractUser
from django.db import models
from .views import User

class ShareholderProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='shareholder_profile')
    parcel_number = models.CharField(max_length=100)
    profile_picture = models.ImageField(upload_to='shareholders/')
    lease_history = models.JSONField(default=list)  # Optional, can expand later
    payment_history = models.JSONField(default=list)

    def __str__(self):
        return f"ShareholderProfile of {self.user.username}"

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
        related_name='shareholders_user_set',  # Custom related name
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='shareholders_user_permissions_set',  # Custom related name
        blank=True
    )

    def __str__(self):
        return self.username
