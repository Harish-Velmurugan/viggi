from django.contrib import admin
from .models import Contract,Description,SolverDescription,SolverContract

# Register your models here.

admin.site.register(Contract)
admin.site.register(Description)

admin.site.register(SolverContract)
admin.site.register(SolverDescription)
