from rest_framework import generics, permissions
from .models import User
from .serializers import UserSerializer

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]  # Only admin can list users

class PendingAdminListView(generics.ListAPIView):
    queryset = User.objects.filter(role='admin', is_verified=False)
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

class VerifyUserView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = 'pk'

    def perform_update(self, serializer):
        serializer.save(is_verified=True)
