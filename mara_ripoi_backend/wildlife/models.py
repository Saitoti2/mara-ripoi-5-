from django.db import models

class Wildlife(models.Model):
    name = models.CharField(max_length=100)
    species = models.CharField(max_length=100)
    habitat = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='wildlife_images/')
    conservation_status = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
