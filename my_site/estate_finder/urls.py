from django.urls import path
from . import views  # или from .views import ...

urlpatterns = [
    path('', views.index, name='index'),
]