from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from .models import Feature
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from .forms import FeatureForm
from django.contrib import messages

# Create your views here.
@login_required
def feature(request):
    return render(request, 'admin/feature/index.html')

@login_required
def feature_data(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
       features = Feature.objects.all()
    data = [
         {
            "heading": feature.heading,
            "title": feature.title,
            "icon": feature.icon,
            "description": feature.description,
            "action": f'<div class="d-flex"><a href="/admin/feature/edit/{feature.id}/" class="edit btn btn-success btn-sm mr-2">Edit</a> <a href="javascript:void(0);"onclick="mediaDelete({feature.id}, \'/admin/feature-delete/\')" class="delete btn btn-danger btn-sm">Delete</a></div>'
            }
        for feature in features
    ]
    return JsonResponse({"data": data})


@login_required
@require_GET
def feature_delete(request, id):
    try:
        social_media = Feature.objects.get(id=id)
        social_media.delete()
        return JsonResponse({'sts': True})
    except Feature.DoesNotExist:
        return JsonResponse({'sts': False, 'error': 'Object does not exist'})
    except Exception as e:
        return JsonResponse({'sts': False, 'error': str(e)})

@login_required
def feature_create(request):
    return render(request, 'admin/feature/create.html')

@login_required
def feature_store(request):
    if request.method == "POST":
        data = {
            'icon': request.POST.get('icon'),
            'heading': request.POST.get('heading'),
            'title': request.POST.get('title'),
            'description': request.POST.get('description'),

        }
        form = FeatureForm(request.POST, request.FILES)

        if form.is_valid():
            Feature.saveData(data, request.POST.get('id'))
            messages.success(request, 'Data saved successfully')
            return redirect('feature')
        else:
            messages.error(request, 'There was an error saving the data')
            return render(request, 'admin/feature/create.html', {'form': form})

    form = FeatureForm()
    return render(request, 'admin/feature/index.html', {'form': form})

@login_required
def feature_edit(request,id):
    feature = Feature.objects.get(id=id)
    context = {
        'id':id,
        'feature': feature
     }
    return render(request, 'admin/feature/create.html',context)
