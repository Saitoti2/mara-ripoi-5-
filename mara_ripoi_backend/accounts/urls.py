from django.urls import path
from .views import UserListView, PendingAdminListView, VerifyUserView

urlpatterns = [
    path('all/', UserListView.as_view(), name='user-list'),
    path('pending-admins/', PendingAdminListView.as_view(), name='pending-admins'),
    path('verify/<int:pk>/', VerifyUserView.as_view(), name='verify-user'),
]
