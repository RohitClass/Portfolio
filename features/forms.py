from django import forms
from .models import Feature

class FeatureForm(forms.ModelForm):
    class Meta:
        model = Feature
        fields = ['heading','title','icon', 'description']

    def clean(self):
        cleaned_data = super().clean()
        heading = cleaned_data.get('heading')
        title = cleaned_data.get('title')
        icon = cleaned_data.get('icon')
        description = cleaned_data.get('description')

        # Add custom validation logic here
        if not icon:
            self.add_error('icon', 'Icon cannot be empty.')
        if not heading:
            self.add_error('heading', 'Heading cannot be empty.')
        if not title:
            self.add_error('title', 'Title cannot be empty.')
        if not description:
            self.add_error('description', 'Description cannot be empty.')
        return cleaned_data
