from django.urls import path
from . import views
from social import views as socialviews

urlpatterns = [
    path('profile/', views.profile, name='profile'),
    path('profile/store/', views.profile_store, name='profile_store'),
    path('profile/edit/<int:id>/', views.profile_edit, name='profile_edit'),
    path('change_password',views.change_password,name='change_password'),
    path('update_password',views.update_password,name='update_password'),
    path('social/', socialviews.social_media, name='social'),
    path('social/create', socialviews.social_media_create, name='social_media_create'),
    path('social-data/', socialviews.social_media_data, name='social_data'),
    path('social-delete/<int:id>/', socialviews.social_media_delete, name='social_delete'),
    path('social/store', socialviews.social_media_store, name='social_media_store'),
    path('social/edit/<int:id>/', socialviews.social_media_edit, name='social_media_edit'),


]
