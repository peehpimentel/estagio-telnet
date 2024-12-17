from django.contrib import admin
from django.urls import path
from Estagio.views import *
from Estagio.services import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', lista_contratos, name='bd'),
    path('modal/', filial_view, name='modal'),
]
