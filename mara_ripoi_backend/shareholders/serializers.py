from rest_framework import serializers
from accounts.models import User
from .models import ShareholderProfile

class ShareholderSignupSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source="user.username")
    email = serializers.EmailField(source="user.email")
    password = serializers.CharField(write_only=True, source="user.password")

    class Meta:
        model = ShareholderProfile
        fields = ['full_name', 'email', 'password', 'parcel_number', 'profile_picture']

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = User.objects.create_user(
            username=user_data["username"],
            email=user_data["email"],
            password=user_data["password"],
            role="shareholder",
            is_verified=False  # must be approved by admin
        )
        profile = ShareholderProfile.objects.create(user=user, **validated_data)
        return profile


class ShareholderProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = ShareholderProfile
        fields = '__all__'
