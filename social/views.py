from django.shortcuts import render,redirect,get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.contrib.auth.decorators import login_required
from .models import SocialMedia
from django.contrib import messages
from .forms import SocialMediaForm

# Create your views here.
@login_required
def social_media(request):
    return render(request, 'admin/setting/social-media/index.html')

@login_required
def social_media_data(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
       social_media = SocialMedia.objects.all()
    data = [
         {
            "icon": social.icon,
            "link": social.link,
            "action": f'<div class="d-flex"><a href="/admin/social/edit/{social.id}/" class="edit btn btn-success btn-sm mr-2">Edit</a> <a href="javascript:void(0);" onclick="mediaDelete({social.id}, \'/admin/social-delete/\')" class="delete btn btn-danger btn-sm">Delete</a></div>'
            }
        for social in social_media
    ]
    return JsonResponse({"data": data})

@login_required
def social_media_create(request):
    return render(request, 'admin/setting/social-media/create.html')

@login_required
@require_GET
def social_media_delete(request, id):
    try:
        social_media = SocialMedia.objects.get(id=id)
        social_media.delete()
        return JsonResponse({'sts': True})
    except SocialMedia.DoesNotExist:
        return JsonResponse({'sts': False, 'error': 'Object does not exist'})
    except Exception as e:
        return JsonResponse({'sts': False, 'error': str(e)})

@login_required
def social_media_store(request):
    if request.method == "POST":
        data = {
            'icon': request.POST.get('icon'),
            'link': request.POST.get('link'),
        }
        form = SocialMediaForm(request.POST, request.FILES)

        if form.is_valid():
            SocialMedia.saveData(data, request.POST.get('id'))
            messages.success(request, 'Data saved successfully')
            return redirect('social')
        else:
            messages.error(request, 'There was an error saving the data')
            return render(request, 'admin/setting/social-media/create.html', {'form': form})

    form = SocialMediaForm()
    return render(request, 'admin/setting/social-media/index.html', {'form': form})


@login_required
def social_media_edit(request,id):
    socialMedia = SocialMedia.objects.get(id=id)
    context = {
        'id':id,
        'socialMedia': socialMedia
     }
    return render(request, 'admin/setting/social-media/create.html',context)
