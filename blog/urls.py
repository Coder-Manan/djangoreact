from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('add/', views.addblog, name='addblog'),
    path('login/', views.test, name='login')
]