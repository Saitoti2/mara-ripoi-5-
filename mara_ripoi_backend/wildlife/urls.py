from django.urls import path
from .views import WildlifeListView, WildlifeCreateView

urlpatterns = [
    path('list/', WildlifeListView.as_view(), name='wildlife-list'),
    path('create/', WildlifeCreateView.as_view(), name='wildlife-create'),
]
