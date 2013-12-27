from django.contrib import admin

# Register your models here.
from rx.models import Drug_Detail, PostGEO, TopDrugGPs, Drug_Stat, Fatal_Stat

admin.site.register(Drug_Detail)
admin.site.register(PostGEO)
admin.site.register(TopDrugGPs)
admin.site.register(Drug_Stat)
admin.site.register(Fatal_Stat)