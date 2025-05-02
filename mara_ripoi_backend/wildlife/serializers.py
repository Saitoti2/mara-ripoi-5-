from rest_framework import serializers
from .models import Wildlife

class WildlifeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wildlife
        fields = '__all__'
