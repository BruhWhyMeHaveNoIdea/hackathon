from django.contrib import admin
from .models import EstateObjects, EstateTypes, Photos
# Register your models here.

admin.site.register(EstateObjects)
admin.site.register(EstateTypes)
admin.site.register(Photos)