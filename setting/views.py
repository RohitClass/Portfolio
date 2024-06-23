from django.shortcuts import render, redirect , get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth import update_session_auth_hash
from .models import Profile
from .forms import ProfileForm
from .forms import PasswordChangeCustomForm
from portfolio.functions import handle_uploaded_file,handle_remove_file


@login_required
def show(request):
    return render(request, 'admin/dashboard.html')

@login_required
def profile(request):
    readonly = 'readonly'
    profile = get_object_or_404(Profile, id=1)
    context = {
        'readonly': readonly,
        'profile': profile
     }
    print(context)
    return render(request, 'admin/setting/profile/index.html',context)


@login_required
def profile_edit(request,id):
    readonly = None
    profile = get_object_or_404(Profile, id=id)
    context = {
        'readonly': readonly,
        'id':id,
        'profile': profile
     }
    return render(request, 'admin/setting/profile/index.html',context)

@login_required
def profile_store(request):
    if request.method == "POST":
        data = {
            'name': request.POST.get('name'),
            'email': request.POST.get('email'),
            'mobile': request.POST.get('mobile'),
            'address': request.POST.get('address'),
            'logo': request.FILES.get('logo'),
            'favicon': request.FILES.get('favicon'),
            'description': request.POST.get('description'),
        }
        form = ProfileForm(request.POST, request.FILES)
        if form.is_valid():
            profile_id = request.POST.get('id')
            profile = Profile.objects.get(id=profile_id)

            logo_path = profile.logo
            favicon_path = profile.favicon

            if 'logo' in request.FILES and request.FILES['logo'] != profile.logo:
                handle_remove_file(profile.logo)
                logo_path = handle_uploaded_file(request.FILES['logo'], 'setting/profile')

            if 'favicon' in request.FILES and request.FILES['favicon'] != profile.favicon:
                handle_remove_file(profile.favicon)
                favicon_path = handle_uploaded_file(request.FILES['favicon'], 'setting/profile')

            Profile.saveData(data, logo_path, favicon_path, profile_id)
            messages.success(request, 'Data saved successfully')
            return redirect('profile')
        else:
            messages.error(request, 'There was an error saving the data')
            return render(request, 'admin/setting/profile/index.html', {'form': form})

    return render(request, 'admin/setting/profile/index.html')

@login_required
def change_password(request):
    return render(request, 'admin/setting/change_password.html')

@login_required
def update_password(request):
    if request.method == 'POST':
        form = PasswordChangeCustomForm(user=request.user, data=request.POST)
        if form.is_valid():
            user = request.user
            user.set_password(form.cleaned_data.get('new_password'))
            user.save()
            update_session_auth_hash(request, user)
            messages.success(request, 'Password updated successfully')
            return redirect('change_password')
        else:
            return render(request, 'admin/setting/change_password.html', {'form': form})
    else:
        form = PasswordChangeCustomForm(user=request.user)

    return render(request, 'admin/setting/change_password.html', {'form': form})


