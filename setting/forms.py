from django import forms
from .models import Profile

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['name', 'email', 'mobile', 'address', 'logo', 'favicon', 'description']

    def clean(self):
        cleaned_data = super().clean()
        name = cleaned_data.get('name')
        email = cleaned_data.get('email')
        mobile = cleaned_data.get('mobile')
        address = cleaned_data.get('address')
        description = cleaned_data.get('description')
        favicon = cleaned_data.get('favicon')
        logo = cleaned_data.get('logo')

        # Add custom validation logic here
        if not name:
            self.add_error('name', 'Name cannot be empty.')
        if not email:
            self.add_error('email', 'Email cannot be empty.')
        if not mobile:
            self.add_error('mobile', 'Mobile number cannot be empty.')
        if not address:
            self.add_error('address', 'Address cannot be empty.')
        if not description:
            self.add_error('description', 'Description cannot be empty.')
        # if not favicon:
        #     self.add_error('favicon', 'Icon cannot be empty.')
        # if not logo:
        #     self.add_error('logo', 'Logo cannot be empty.')

        return cleaned_data

class PasswordChangeCustomForm(forms.Form):
    current_password = forms.CharField(widget=forms.PasswordInput, label="Current Password")
    new_password = forms.CharField(widget=forms.PasswordInput, label="New Password")
    new_confirm_password = forms.CharField(widget=forms.PasswordInput, label="Confirm New Password")

    def __init__(self, user, *args, **kwargs):
        self.user = user
        super().__init__(*args, **kwargs)

    def clean_current_password(self):
        current_password = self.cleaned_data.get('current_password')
        if not self.user.check_password(current_password):
            raise forms.ValidationError("Current password is incorrect")
        return current_password

    def clean(self):
        cleaned_data = super().clean()
        new_password = cleaned_data.get('new_password')
        new_confirm_password = cleaned_data.get('new_confirm_password')

        if new_password != new_confirm_password:
            self.add_error('new_confirm_password', 'New password and confirm password do not match.')
        return cleaned_data
