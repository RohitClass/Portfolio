from django.db import models

class SocialMedia(models.Model):
    icon = models.CharField(max_length=255)
    link = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.icon

    @staticmethod
    def saveData(data, id=None):
        if id:
            socialMedia = SocialMedia.objects.get(id=id)
        else:
            socialMedia = SocialMedia()

        socialMedia.icon = data.get('icon')
        socialMedia.link = data.get('link')
        socialMedia.save()
        return socialMedia
