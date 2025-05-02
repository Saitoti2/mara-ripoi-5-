from rest_framework import generics, permissions
from .models import ShareholderProfile
from .serializers import ShareholderSignupSerializer, ShareholderProfileSerializer

# Signup endpoint for shareholders
class ShareholderSignupView(generics.CreateAPIView):
    queryset = ShareholderProfile.objects.all()
    serializer_class = ShareholderSignupSerializer
    permission_classes = [permissions.AllowAny]


# Admin view to list all pending shareholders
class PendingShareholdersView(generics.ListAPIView):
    queryset = ShareholderProfile.objects.filter(user__is_verified=False)
    serializer_class = ShareholderProfileSerializer
    permission_classes = [permissions.IsAdminUser]


# Admin view to approve a shareholder
class ApproveShareholderView(generics.UpdateAPIView):
    queryset = ShareholderProfile.objects.all()
    serializer_class = ShareholderProfileSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = 'pk'

    def perform_update(self, serializer):
        profile = serializer.save()
        profile.user.is_verified = True
        profile.user.save()
