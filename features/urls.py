from django.urls import path
from . import views

urlpatterns = [
    path('feature/', views.feature, name='feature'),
    path('feature-data/', views.feature_data, name='feature_data'),
    path('feature/create', views.feature_create, name='feature_create'),
    path('feature-delete/<int:id>/', views.feature_delete, name='feature_delete'),
    path('feature/store', views.feature_store, name='feature_store'),
    path('feature/edit/<int:id>/', views.feature_edit, name='feature_edit'),
]
