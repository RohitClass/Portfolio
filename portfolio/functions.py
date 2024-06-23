import os
from django.conf import settings

def handle_uploaded_file(f, subdirectory):
    directory_path = os.path.join(settings.BASE_DIR, 'static/images', subdirectory)

    if not os.path.exists(directory_path):
        os.makedirs(directory_path)

    file_path = os.path.join(directory_path, f.name)

    with open(file_path, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

    return f'{subdirectory}/{f.name}'

def handle_remove_file(file_path):
    full_path = os.path.join(settings.BASE_DIR, 'static/images', file_path)
    if os.path.exists(full_path):
        os.remove(full_path)
