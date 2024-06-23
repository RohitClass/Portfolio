from django.db import models

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=255)
    subTitle = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    image = models.CharField(max_length=255)
    button = models.CharField(max_length=255)
    buttonLink = models.CharField(max_length=255)

    def __str__(self):
        return self.title

    @staticmethod
    def saveData(data,image_path, id=None):
        if id:
            project = Project.objects.get(id=id)
        else:
            project = Project()

        if image_path is not None:
            project.image = image_path

        project.title = data.get('title')
        project.subTitle = data.get('subTitle')
        project.button = data.get('button')
        project.buttonLink = data.get('buttonLink')
        project.description = data.get('description')
        project.save()
        return project
