from django.urls import path
from . import views
from setting import views as view

urlpatterns = [
    path('login/', views.login, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('show/', view.show, name='show'),  # This should not be required, show is part of adminprofile
    path('', views.index, name='index_view'),
]
