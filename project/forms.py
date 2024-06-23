from django import forms
from .models import Project as projectData

class ProjectForm(forms.ModelForm):
    class Meta:
        model = projectData
        fields = ['subTitle','title','button','buttonLink', 'description']

    def clean(self):
        cleaned_data = super().clean()
        title = cleaned_data.get('title')
        subTitle = cleaned_data.get('subTitle')
        button = cleaned_data.get('button')
        description = cleaned_data.get('description')
        buttonLink = cleaned_data.get('buttonLink')

        # Add custom validation logic here
        if not subTitle:
            self.add_error('subTitle', 'SubTitle cannot be empty.')
        if not button:
            self.add_error('button', 'Button cannot be empty.')
        if not title:
            self.add_error('title', 'Title cannot be empty.')

        if not buttonLink:
            self.add_error('buttonLink', 'Button Link cannot be empty.')

        if not description:
            self.add_error('description', 'Description cannot be empty.')

        return cleaned_data
