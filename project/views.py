from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import Project as projectData
from django.views.decorators.http import require_GET
from .forms import ProjectForm
from django.contrib import messages
from portfolio.functions import handle_uploaded_file,handle_remove_file


# Create your views here.
@login_required
def project(request):
    return render(request, 'admin/project/index.html')

@login_required
def project_data(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
       projects = projectData.objects.all()
       print(projects)
    data = [
         {
            "image": project.image,
            "title": project.title,
            "subTitle": project.subTitle,
            "button": project.button,
            "buttonLink": project.buttonLink,
            "description": project.description,
            "action": f'<div class="d-flex"><a href="/admin/project/edit/{project.id}/" class="edit btn btn-success btn-sm mr-2">Edit</a> <a href="javascript:void(0);"onclick="mediaDelete({project.id}, \'/admin/project-delete/\')" class="delete btn btn-danger btn-sm">Delete</a></div>'
            }
        for project in projects
    ]
    return JsonResponse({"data": data})


@login_required
@require_GET
def project_delete(request, id):
    try:
        project = projectData.objects.get(id=id)
        handle_remove_file(project.image)
        project.delete()
        return JsonResponse({'sts': True})
    except projectData.DoesNotExist:
        return JsonResponse({'sts': False, 'error': 'Object does not exist'})
    except Exception as e:
        return JsonResponse({'sts': False, 'error': str(e)})

@login_required
def project_create(request):
    return render(request, 'admin/project/create.html')

@login_required
def project_store(request):
    if request.method == "POST":
        data = {
            'title': request.POST.get('title'),
            'subTitle': request.POST.get('subTitle'),
            'button': request.POST.get('button'),
            'buttonLink': request.POST.get('buttonLink'),
            'description': request.POST.get('description'),
            'image': request.FILES.get('image'),
        }
        form = ProjectForm(request.POST, request.FILES)

        if form.is_valid():
            project_id = request.POST.get('id')
            if project_id and project_id.isdigit():
                project_id = int(project_id)
                project = projectData.objects.get(id=project_id)
                image_path = project.image

                if 'image' in request.FILES and request.FILES['image'] != project.image:
                    handle_remove_file(project.image)
                    image_path = handle_uploaded_file(request.FILES['image'], 'project')

                projectData.saveData(data, image_path, project_id)
                messages.success(request, 'Data saved successfully')
                return redirect('project')
            else:
                image_path = handle_uploaded_file(request.FILES['image'], 'project')
                projectData.saveData(data, image_path)
                messages.success(request, 'Data saved successfully')
                return redirect('project')
        else:
            messages.error(request, 'There was an error saving the data')
            return render(request, 'admin/project/create.html', {'form': form})

    form = ProjectForm()
    return render(request, 'admin/project/index.html', {'form': form})

@login_required
def project_edit(request,id):
    project = projectData.objects.get(id=id)
    context = {
        'id':id,
        'project': project
     }
    return render(request, 'admin/project/create.html',context)
