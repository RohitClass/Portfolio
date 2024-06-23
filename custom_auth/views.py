from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout
from django.urls import reverse

def login(request):
    if request.user.is_authenticated:
        return redirect('show')

    if request.method == "POST":
        username = request.POST.get('USERNAME')
        password = request.POST.get('PASSWORD')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            return redirect('show')
        else:
            return render(request, 'admin/auth/login.html', {'error': 'Invalid username or password'})

    return render(request, 'admin/auth/login.html')

def index(request):
    if request.user.is_authenticated:
        return redirect('show')

    return render(request, 'admin/auth/login.html')

def logout_view(request):
    logout(request)
    return redirect('login')
