from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(max_length=255, null=True, blank=True)
    mobile = models.CharField(max_length=255, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    logo = models.CharField(max_length=255, null=True, blank=True)
    favicon = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name if self.name else 'Unnamed Profile'

    @staticmethod
    def saveData(data, logo_path=None, favicon_path=None, id=None):
        if id:
            profile = Profile.objects.get(id=id)
        else:
            profile = Profile()
        if logo_path is not None:
            profile.logo = logo_path
        if favicon_path is not None:
            profile.favicon = favicon_path
        profile.name = data.get('name')
        profile.email = data.get('email')
        profile.mobile = data.get('mobile')
        profile.address = data.get('address')
        profile.description = data.get('description')
        profile.save()
        return profile
