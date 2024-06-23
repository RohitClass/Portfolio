from django.urls import path
from . import views

urlpatterns = [
    path('project/', views.project, name='project'),
    path('project-data/', views.project_data, name='project_data'),
    path('project/create', views.project_create, name='project_create'),
    path('project-delete/<int:id>/', views.project_delete, name='project_delete'),
    path('project/store', views.project_store, name='project_store'),
    path('project/edit/<int:id>/', views.project_edit, name='project_edit'),
]
