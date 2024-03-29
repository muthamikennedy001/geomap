from django.urls import path
from .views import get_fertilizer_recommendation

urlpatterns = [
    path('fertilizer/', get_fertilizer_recommendation, name='fertilizer-recommendation'),
]
