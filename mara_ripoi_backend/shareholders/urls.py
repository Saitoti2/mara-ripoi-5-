from django.urls import path
from .views import ShareholderSignupView, PendingShareholdersView, ApproveShareholderView

urlpatterns = [
    path('signup/', ShareholderSignupView.as_view(), name='shareholder-signup'),
    path('pending/', PendingShareholdersView.as_view(), name='pending-shareholders'),
    path('approve/<int:pk>/', ApproveShareholderView.as_view(), name='approve-shareholder'),
]
