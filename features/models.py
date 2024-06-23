from django.db import models

# Create your models here.
class Feature(models.Model):
    icon = models.CharField(max_length=255)
    heading = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.icon

    @staticmethod
    def saveData(data, id=None):
        if id:
            feature = Feature.objects.get(id=id)
        else:
            feature = Feature()

        feature.icon = data.get('icon')
        feature.heading = data.get('heading')
        feature.title = data.get('title')
        feature.description = data.get('description')
        feature.save()
        return feature
        
