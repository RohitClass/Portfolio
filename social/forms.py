from django import forms
from .models import SocialMedia

class SocialMediaForm(forms.ModelForm):
    class Meta:
        model = SocialMedia
        fields = ['icon', 'link']

    def clean(self):
        cleaned_data = super().clean()
        icon = cleaned_data.get('icon')
        link = cleaned_data.get('link')

        # Add custom validation logic here
        if not icon:
            self.add_error('icon', 'Icon cannot be empty.')
        if not link:
            self.add_error('link', 'Link cannot be empty.')

        return cleaned_data
